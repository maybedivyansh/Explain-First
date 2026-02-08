import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { generateSpeech } from '@/lib/tts';
// GoogleGenerativeAI SDK removed - using direct REST API instead
// @ts-ignore
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const PDFParser = require('pdf2json');

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    const supabase = await createClient();
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is not defined");
        }



        const { documentId, filePath, language } = await req.json();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 1. Download file from Supabase Storage
        console.log(`Downloading file: ${filePath}`);
        const { data: fileData, error: downloadError } = await supabase.storage
            .from('user-documents')
            .download(filePath);

        if (downloadError) {
            console.error('Storage Download Error:', downloadError);
            return NextResponse.json({ error: `Storage Download Error: ${downloadError.message}` }, { status: 500 });
        }

        // 2. Extract text from PDF using pdf2json
        console.log('Extracting text from PDF...');
        let pdfText = '';
        try {
            const arrayBuffer = await fileData.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // Use pdf2json with Promise wrapper
            pdfText = await new Promise((resolve, reject) => {
                const pdfParser = new PDFParser();

                pdfParser.on('pdfParser_dataError', (errData: any) => {
                    reject(new Error(errData.parserError));
                });

                pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
                    try {
                        // Extract text from all pages with safe URI decoding
                        const text = pdfData.Pages.map((page: any) => {
                            return page.Texts.map((textItem: any) => {
                                return textItem.R.map((r: any) => {
                                    try {
                                        return decodeURIComponent(r.T);
                                    } catch (e) {
                                        // If decoding fails, return the raw text
                                        return r.T;
                                    }
                                }).join('');
                            }).join(' ');
                        }).join('\n');
                        resolve(text);
                    } catch (err) {
                        reject(err);
                    }
                });

                pdfParser.parseBuffer(buffer);
            });

        } catch (pdfError: any) {
            console.error('PDF Parse Error:', pdfError);
            return NextResponse.json({ error: `PDF Parse Error: ${pdfError.message}` }, { status: 500 });
        }

        if (!pdfText.trim()) {
            return NextResponse.json({ error: 'PDF content is empty or could not be extracted.' }, { status: 400 });
        }

        console.log(`Extracted ${pdfText.length} characters.`);

        // 3. Send to Gemini for analysis
        console.log(`Sending ${pdfText.length} characters to Gemini...`);
        const prompt = `You are an AI assistant helping people with low literacy understand legal documents. Analyze the document and provide the output in JSON format.
        
        Document Content:
        ${pdfText.substring(0, 30000)}

        Requirements:
        1. Document type (e.g., "Personal Loan Agreement", "Insurance Policy")
        2. A simple 3-4 sentence summary in ${language}. Use conversational tone, short sentences, simple words.
        3. 4-5 key points the person MUST know. For each point:
           - Main point
           - Brief explanation
           - Tag as: "info", "warning", or "danger"
        4. Any critical warnings or red flags. Return as an array of strings.

        Use simple language. Avoid jargon. If technical terms needed, explain in parentheses.
        Example: "ब्याज दर (interest rate) 12% है"

        Output Schema:
        {
            "documentType": "string",
            "summary": "string",
            "keyPoints": [
                { "text": "string", "type": "info" | "warning" | "danger", "explanation": "string" }
            ],
            "warnings": ["string"]
        }`;

        // Use direct REST API call to v1 endpoint (SDK uses v1beta which doesn't support Flash)
        const geminiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }]
                })
            }
        );

        if (!geminiResponse.ok) {
            const errorData = await geminiResponse.json();
            console.error('Gemini API Error:', errorData);
            throw new Error(`Gemini API Error: ${errorData.error?.message || 'Unknown error'}`);
        }

        const geminiData = await geminiResponse.json();
        const responseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!responseText) {
            console.error('Gemini Error: No response text');
            throw new Error("No response from Gemini");
        }

        let analysis;
        try {
            // Clean code blocks if present
            const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            analysis = JSON.parse(cleanJson);
        } catch (jsonError) {
            console.error('JSON Parse Error:', jsonError, 'Response:', responseText);
            return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
        }

        // 4. Generate TTS audio
        console.log('Generating TTS audio using shared library...');
        let audioPath = null;
        let audioSignedUrl = null;

        try {
            // Use shared function - no HTTP call
            audioPath = await generateSpeech(analysis.summary, user.id);

            if (audioPath) {
                console.log('TTS audio generated at path:', audioPath);

                // Generat signed URL for immediate playback
                const { data } = await supabase.storage
                    .from('user-documents')
                    .createSignedUrl(audioPath, 3600); // 1 hour expiry

                if (data?.signedUrl) {
                    audioSignedUrl = data.signedUrl;
                }
            } else {
                console.warn('TTS generation returned null path');
            }
        } catch (ttsError) {
            console.error('TTS execution failed:', ttsError);
        }

        // 5. Update database with analysis and audio path
        console.log('Updating database...');
        const { error: updateError } = await supabase
            .from('documents')
            .update({
                document_type: analysis.documentType,
                summary: analysis.summary,
                key_points: analysis.keyPoints,
                warnings: analysis.warnings,
                audio_url: audioPath, // Store the storage path, NOT the signed URL
                status: 'complete'
            })
            .eq('id', documentId);

        if (updateError) {
            console.error('Database Update Error:', updateError);
            throw updateError;
        }

        // Return signed URL to client so it can play immediately
        return NextResponse.json({ ...analysis, audioUrl: audioSignedUrl });

    } catch (error: any) {
        console.error('Analysis Route Exception:', error);
        return NextResponse.json({ error: `Server Exception: ${error.message}` }, { status: 500 });
    }
}

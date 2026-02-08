import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const supabase = await createClient();
    try {
        const { text, language } = await req.json();

        const apiKey = process.env.ELEVENLABS_API_KEY;
        if (!apiKey) {
            throw new Error("ELEVENLABS_API_KEY is not defined");
        }

        // Voice ID for "Rachel" (American, clear) - safe default
        // Could map languages to specific voices if needed, but keeping it simple for now.
        // Multilingual model handles accents well.
        const voiceId = "21m00Tcm4TlvDq8ikWAM";

        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': apiKey,
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_multilingual_v2", // Best for Hindi, Tamil, etc.
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75,
                }
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`ElevenLabs API Error: ${error.detail?.message || 'Unknown error'}`);
        }

        const audioBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(audioBuffer);

        // Upload to Supabase Storage
        const fileName = `audio/${Date.now()}_tts.mp3`;
        const { error: uploadError } = await supabase.storage
            .from('user-documents')
            .upload(fileName, buffer, {
                contentType: 'audio/mpeg',
                upsert: false
            });

        if (uploadError) throw uploadError;

        // Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from('user-documents')
            .getPublicUrl(fileName);

        return NextResponse.json({ audioUrl: publicUrl });

    } catch (error: any) {
        console.error('TTS Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

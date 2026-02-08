import { createClient } from '@/lib/supabase/server';

export async function generateSpeech(text: string, userId: string): Promise<string | null> {
    try {
        const apiKey = process.env.ELEVENLABS_API_KEY;
        if (!apiKey) {
            throw new Error("ELEVENLABS_API_KEY is not defined");
        }

        // Voice ID for "Rachel" (American, clear)
        const voiceId = "21m00Tcm4TlvDq8ikWAM";

        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': apiKey,
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_multilingual_v2",
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
        const supabase = await createClient();
        const fileName = `${userId}/audio/${Date.now()}_tts.mp3`;

        const { error: uploadError } = await supabase.storage
            .from('user-documents')
            .upload(fileName, buffer, {
                contentType: 'audio/mpeg',
                upsert: false
            });

        if (uploadError) throw uploadError;

        return fileName; // Return the storage path
    } catch (error) {
        console.error('TTS Generation Error:', error);
        return null;
    }
}

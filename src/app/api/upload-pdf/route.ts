import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const supabase = await createClient();
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const language = formData.get('language') as string;

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const fileName = `${user.id}/${Date.now()}_${file.name}`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
            .from('user-documents')
            .upload(fileName, file);

        if (uploadError) {
            console.error('Storage Upload Error:', uploadError);
            return NextResponse.json({ error: `Storage Error: ${uploadError.message}` }, { status: 500 });
        }

        // Save metadata to database
        const { data: document, error: dbError } = await supabase
            .from('documents')
            .insert({
                user_id: user.id,
                filename: file.name,
                file_path: fileName,
                language: language,
                file_size: file.size,
                status: 'uploading'
            })
            .select()
            .single();

        if (dbError) {
            console.error('Database Insert Error:', dbError);
            return NextResponse.json({ error: `Database Error: ${dbError.message}` }, { status: 500 });
        }

        return NextResponse.json({ documentId: document.id, filePath: fileName });

    } catch (error: any) {
        console.error('Upload Route Exception:', error);
        return NextResponse.json({ error: `Server Exception: ${error.message}` }, { status: 500 });
    }
}

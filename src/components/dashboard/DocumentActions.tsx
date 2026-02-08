'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Eye, Download, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface DocumentActionsProps {
    document: {
        id: string;
        filename: string;
        file_path: string;
        status: string;
    };
}

export function DocumentActions({ document }: DocumentActionsProps) {
    const router = useRouter();
    const supabase = createClient();
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleView = async () => {
        try {
            // Get signed URL for the PDF (valid for 1 hour)
            const { data, error } = await supabase.storage
                .from('user-documents')
                .createSignedUrl(document.file_path, 3600);

            if (error) throw error;

            if (data?.signedUrl) {
                // Open PDF in new tab
                window.open(data.signedUrl, '_blank');
            }
        } catch (error) {
            console.error('View error:', error);
            alert('Failed to open PDF preview');
        }
    };

    const handleDownload = async () => {
        try {
            const { data, error } = await supabase.storage
                .from('user-documents')
                .download(document.file_path);

            if (error) throw error;

            // Create a download link
            const url = URL.createObjectURL(data);
            const a = window.document.createElement('a');
            a.href = url;
            a.download = document.filename;
            window.document.body.appendChild(a);
            a.click();
            window.document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download error:', error);
            alert('Failed to download file');
        }
    };

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${document.filename}"?`)) {
            return;
        }

        setIsDeleting(true);
        try {
            // Delete from storage
            const { error: storageError } = await supabase.storage
                .from('user-documents')
                .remove([document.file_path]);

            if (storageError) throw storageError;

            // Delete from database
            const { error: dbError } = await supabase
                .from('documents')
                .delete()
                .eq('id', document.id);

            if (dbError) throw dbError;

            // Refresh the page to show updated list
            router.refresh();
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete document');
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex items-center justify-end gap-2">
            <button
                onClick={handleView}
                className="p-2 text-text-secondary hover:text-accent hover:bg-indigo-50 rounded-lg transition-colors"
                title="View PDF"
            >
                <Eye size={18} />
            </button>
            <button
                onClick={handleDownload}
                className="p-2 text-text-secondary hover:text-primary-navy hover:bg-slate-100 rounded-lg transition-colors"
                title="Download Original"
            >
                <Download size={18} />
            </button>
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2 text-text-secondary hover:text-error hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                title="Delete"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
}

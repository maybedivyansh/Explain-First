import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ArrowLeft, FileText, AlertTriangle, Info } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { VoicePlayer } from '@/components/analyze/VoicePlayer';

export default async function DocumentPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Fetch document
    const { data: document } = await supabase
        .from('documents')
        .select('*')
        .eq('id', params.id)
        .eq('user_id', user.id)
        .single();

    if (!document) {
        redirect('/dashboard');
    }

    // Generate signed URL for audio if it exists
    let audioSignedUrl = null;
    if (document.audio_url) {
        try {
            const { data } = await supabase.storage
                .from('user-documents')
                .createSignedUrl(document.audio_url, 3600); // 1 hour expiry

            if (data?.signedUrl) {
                audioSignedUrl = data.signedUrl;
            }
        } catch (error) {
            console.error('Error signing audio URL:', error);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-6">
                    <Link href="/dashboard">
                        <Button variant="ghost" leftIcon={<ArrowLeft size={20} />}>
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>

                {/* Document Info */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-accent flex-shrink-0">
                            <FileText size={24} />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-primary-navy mb-2">{document.filename}</h1>
                            <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                                <span>Type: {document.document_type || 'Unknown'}</span>
                                <span>Language: {document.language}</span>
                                <span>Uploaded: {new Date(document.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                {document.summary && (
                    <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                        <h2 className="text-lg font-semibold text-primary-navy mb-4">Summary</h2>
                        <p className="text-text-primary leading-relaxed">{document.summary}</p>

                        {/* Voice Explanation */}
                        {audioSignedUrl && (
                            <div className="mt-6 bg-slate-50 rounded-xl p-4 border border-slate-200">
                                <h4 className="text-sm font-bold text-text-secondary mb-3 uppercase tracking-wider">Voice Explanation</h4>
                                <VoicePlayer audioUrl={audioSignedUrl} />
                            </div>
                        )}
                    </div>
                )}

                {/* Key Points */}
                {document.key_points && document.key_points.length > 0 && (
                    <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                        <h2 className="text-lg font-semibold text-primary-navy mb-4">Key Points</h2>
                        <div className="space-y-4">
                            {document.key_points.map((point: any, index: number) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-lg border ${point.type === 'danger'
                                        ? 'bg-red-50 border-red-200'
                                        : point.type === 'warning'
                                            ? 'bg-amber-50 border-amber-200'
                                            : 'bg-blue-50 border-blue-200'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 mt-0.5">
                                            {point.type === 'danger' || point.type === 'warning' ? (
                                                <AlertTriangle
                                                    size={20}
                                                    className={point.type === 'danger' ? 'text-error' : 'text-warning'}
                                                />
                                            ) : (
                                                <Info size={20} className="text-accent" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-primary-navy mb-1">{point.text}</h3>
                                            <p className="text-sm text-text-secondary">{point.explanation}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Warnings */}
                {document.warnings && document.warnings.length > 0 && (
                    <div className="bg-red-50 rounded-xl border border-red-200 p-6">
                        <h2 className="text-lg font-semibold text-error mb-4 flex items-center gap-2">
                            <AlertTriangle size={20} />
                            Critical Warnings
                        </h2>
                        <ul className="space-y-2">
                            {document.warnings.map((warning: string, index: number) => (
                                <li key={index} className="text-text-primary flex items-start gap-2">
                                    <span className="text-error mt-1">•</span>
                                    <span>{warning}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* No Analysis Available */}
                {document.status !== 'complete' && (
                    <div className="bg-amber-50 rounded-xl border border-amber-200 p-6 text-center">
                        <p className="text-text-secondary">
                            Analysis is not yet complete for this document.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}

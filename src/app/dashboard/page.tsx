import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { FileText, Plus, Clock, MoreVertical, Search, Filter, Download, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { DocumentActions } from '@/components/dashboard/DocumentActions';

export default async function Dashboard() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Fetch documents
    const { data: documents } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    return (
        <div className="min-h-screen bg-slate-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-primary-navy">Your Documents</h1>
                        <p className="text-text-secondary mt-1">Manage and track your analyzed agreements</p>
                    </div>
                    <Link href="/analyze">
                        <Button leftIcon={<Plus size={20} />} className="shadow-lg shadow-indigo-200">
                            Analyze New Document
                        </Button>
                    </Link>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <div className="text-text-secondary text-sm font-medium uppercase tracking-wider mb-2">Total Documents</div>
                        <div className="text-3xl font-bold text-primary-navy">{documents?.length || 0}</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <div className="text-text-secondary text-sm font-medium uppercase tracking-wider mb-2">This Month</div>
                        <div className="text-3xl font-bold text-primary-navy">
                            {documents?.filter((d: any) => new Date(d.created_at) > new Date(new Date().setDate(1))).length || 0}
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <div className="text-text-secondary text-sm font-medium uppercase tracking-wider mb-2">Time Saved</div>
                        <div className="text-3xl font-bold text-success">~{(documents?.length || 0) * 20} mins</div>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="bg-white rounded-t-xl border border-slate-200 p-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3 top-2.5 text-text-secondary w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search documents..."
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-sm"
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-text-secondary hover:bg-slate-50">
                            <Filter size={16} />
                            Filter
                        </button>
                    </div>
                </div>

                {/* Documents Table */}
                <div className="bg-white border-x border-b border-slate-200 rounded-b-xl overflow-hidden shadow-sm">
                    {documents && documents.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase">Document Name</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase">Type</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase">Language</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase">Date</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase">Status</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {documents.map((doc: any) => (
                                        <tr key={doc.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-accent">
                                                        <FileText size={20} />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-primary-navy">{doc.filename}</div>
                                                        <div className="text-xs text-text-secondary">{(doc.file_size / 1024 / 1024).toFixed(2)} MB</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-text-secondary">
                                                    {doc.document_type || 'Unknown'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-text-secondary capitalize">{doc.language}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-text-secondary">
                                                    <Clock size={14} />
                                                    {new Date(doc.created_at).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${doc.status === 'html' ? 'bg-emerald-100 text-emerald-800' :
                                                    doc.status === 'processing' ? 'bg-amber-100 text-amber-800' :
                                                        'bg-slate-100 text-slate-800'
                                                    }`}>
                                                    {doc.status === 'complete' ? 'Analyzed' : doc.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <DocumentActions document={doc} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FileText className="w-12 h-12 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold text-primary-navy mb-2">No documents yet</h3>
                            <p className="text-text-secondary mb-8 max-w-sm mx-auto">
                                Upload your first document to get a simple explanation in your language.
                            </p>
                            <Link href="/analyze">
                                <Button>Upload Document</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

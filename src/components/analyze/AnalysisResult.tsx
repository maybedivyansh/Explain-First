import React from 'react';
import { AnalysisResult as AnalysisResultType } from '@/types';
import { CheckCircle2, AlertTriangle, AlertCircle, FileText, Download, RotateCcw, Share2, Trash2, Lightbulb } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import Link from 'next/link';
import { VoicePlayer } from './VoicePlayer';

interface Props {
    result: AnalysisResultType;
    audioUrl?: string | null;
    file: File | null;
    onReset: () => void;
}

export const AnalysisResult: React.FC<Props> = ({ result, audioUrl, file, onReset }) => {
    return (
        <div className="animate-fade-in w-full max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="bg-indigo-50 p-3 rounded-lg text-accent">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-primary-navy">{file?.name}</h2>
                        <div className="flex gap-2 mt-1">
                            <span className="bg-slate-100 text-text-secondary text-xs px-2 py-0.5 rounded-full font-medium uppercase tracking-wide">
                                {result.documentType}
                            </span>
                            <span className="bg-slate-100 text-text-secondary text-xs px-2 py-0.5 rounded-full">
                                {(file?.size ? (file.size / 1024 / 1024).toFixed(2) : 0)} MB
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Button variant="outline" size="sm" onClick={onReset} leftIcon={<RotateCcw size={16} />}>
                        New Analysis
                    </Button>
                    <Link href="/dashboard">
                        <Button size="sm">Save to Dashboard</Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Summary & Points */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Summary Card */}
                    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8">
                        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                            <h3 className="text-lg font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                                📝 Summary
                            </h3>
                            <span className="text-xs font-medium text-slate-400">~150 words</span>
                        </div>

                        <p className="text-xl leading-loose text-primary-navy font-medium">
                            {result.summary}
                        </p>

                        <div className="mt-8 bg-slate-50 rounded-xl p-6 border border-slate-200">
                            <h4 className="text-sm font-bold text-text-secondary mb-4 uppercase tracking-wider">Voice Explanation</h4>
                            <VoicePlayer audioUrl={audioUrl || null} />
                        </div>
                    </div>

                    {/* Key Points */}
                    <div>
                        <h3 className="text-xl font-bold text-primary-navy mb-4 flex items-center gap-2">
                            <span>✅ Key Points</span>
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            {result.keyPoints.map((point, idx) => (
                                <div key={idx} className={`p-5 rounded-lg border-l-4 ${point.type === 'danger' ? 'bg-red-50 border-error' :
                                    point.type === 'warning' ? 'bg-amber-50 border-warning' :
                                        'bg-emerald-50 border-success'
                                    } shadow-sm`}>
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 shrink-0">
                                            {point.type === 'danger' ? <AlertTriangle className="text-error" size={24} /> :
                                                point.type === 'warning' ? <AlertCircle className="text-warning" size={24} /> :
                                                    <CheckCircle2 className="text-success" size={24} />}
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-primary-navy mb-1">{point.text}</p>
                                            <p className="text-text-secondary">{point.explanation}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Warnings */}
                    {result.warnings && result.warnings.length > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm">
                            <h4 className="text-error font-bold text-lg mb-4 flex items-center gap-2">
                                <AlertTriangle size={24} />
                                ⚠️ Important Warnings
                            </h4>
                            <ul className="space-y-3">
                                {result.warnings.map((warning, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-primary-navy font-medium">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-error shrink-0" />
                                        {warning}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Right Column: Actions & Meta */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="font-bold text-primary-navy mb-4">Export & Share</h3>
                        <div className="space-y-3">
                            <Button variant="primary" className="w-full justify-start" leftIcon={<Download size={18} />}>
                                Download Summary (PDF)
                            </Button>
                            <Button variant="outline" className="w-full justify-start" leftIcon={<RotateCcw size={18} />}>
                                Translate to Another Language
                            </Button>
                            <Button variant="secondary" className="w-full justify-start text-success bg-emerald-50 hover:bg-emerald-100" leftIcon={<Share2 size={18} />}>
                                Share via WhatsApp
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-error hover:bg-red-50 hover:text-error" leftIcon={<Trash2 size={18} />}>
                                Delete Document
                            </Button>
                        </div>
                    </div>

                    <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                        <div className="flex items-start gap-3">
                            <Lightbulb className="text-accent shrink-0" size={24} />
                            <div>
                                <h4 className="font-bold text-primary-navy mb-2">Did you know?</h4>
                                <p className="text-sm text-text-secondary">
                                    {result.documentType.includes('Loan')
                                        ? "Most personal loans have 10-15% interest rates. Always check the annual percentage rate (APR)."
                                        : "Reading the fine print can save you from unexpected liabilities."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

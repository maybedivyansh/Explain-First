'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { DocumentUpload } from '@/components/analyze/DocumentUpload';
import { AnalysisResult } from '@/components/analyze/AnalysisResult';
import { createClient } from '@/lib/supabase/client';
import { AnalysisResult as AnalysisResultType } from '@/types';

type AnalysisState = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';
type LanguageCode = 'hi' | 'ta' | 'te' | 'bn' | 'mr' | 'en';

export default function AnalyzePage() {
    const supabase = createClient();
    const [state, setState] = useState<AnalysisState>('idle');
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('hi');
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<AnalysisResultType | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [processingStep, setProcessingStep] = useState(0);

    const languages: { code: LanguageCode; name: string; native: string }[] = [
        { code: 'hi', name: 'Hindi', native: 'हिंदी' },
        { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
        { code: 'te', name: 'Telugu', native: 'తెలుగు' },
        { code: 'bn', name: 'Bengali', native: 'বাংলা' },
        { code: 'mr', name: 'Marathi', native: 'मराठी' },
        { code: 'en', name: 'English', native: 'English' },
    ];

    // Load language preference
    React.useEffect(() => {
        const loadPreference = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.user_metadata?.language_preference) {
                setSelectedLanguage(user.user_metadata.language_preference as LanguageCode);
            }
        };
        loadPreference();
    }, [supabase]);

    const handleUpload = async () => {
        if (!file) return;

        setState('uploading');
        setError(null);

        try {
            // 1. Upload File
            const formData = new FormData();
            formData.append('file', file);
            formData.append('language', selectedLanguage);

            const uploadRes = await fetch('/api/upload-pdf', {
                method: 'POST',
                body: formData
            });

            if (!uploadRes.ok) throw new Error("Upload failed");
            const { documentId, filePath } = await uploadRes.json();

            // 2. Process & Analyze
            setState('processing');
            setProcessingStep(0); // "Extracting text..."

            setTimeout(() => setProcessingStep(1), 2000); // "Analyzing content..."

            const analyzeRes = await fetch('/api/analyze-document', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ documentId, filePath, language: languages.find(l => l.code === selectedLanguage)?.name })
            });

            // Update user's language preference
            supabase.auth.updateUser({
                data: { language_preference: selectedLanguage }
            });

            if (!analyzeRes.ok) {
                const errorData = await analyzeRes.json();
                throw new Error(errorData.error || "Analysis failed");
            }
            const analysisData = await analyzeRes.json();
            setResult(analysisData);

            // Audio URL is now included in the analysis response
            if (analysisData.audioUrl) {
                setAudioUrl(analysisData.audioUrl);
            }

            setState('complete');

        } catch (err: any) {
            console.error(err);
            setError(err.message || "An error occurred during analysis.");
            setState('error');
        }
    };

    const handleReset = () => {
        setState('idle');
        setFile(null);
        setResult(null);
        setAudioUrl(null);
        setError(null);
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <div className="mb-8">
                    <Link href="/dashboard" className="text-text-secondary hover:text-primary-navy inline-flex items-center gap-2 font-medium">
                        <ArrowLeft size={20} />
                        Back to Dashboard
                    </Link>
                </div>

                {state === 'idle' && (
                    <div className="max-w-3xl mx-auto animate-fade-in">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-primary-navy mb-3">Analyze Document</h1>
                            <p className="text-text-secondary">Upload a document to get a simple explanation in your language.</p>
                        </div>

                        {/* Language Selector */}
                        <div className="mb-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <label className="block text-sm font-bold text-primary-navy mb-4 uppercase tracking-wider">
                                Choose Language for Explanation
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => setSelectedLanguage(lang.code)}
                                        className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${selectedLanguage === lang.code
                                            ? 'border-accent bg-indigo-50 text-accent'
                                            : 'border-slate-100 hover:border-indigo-100 text-text-secondary'
                                            }`}
                                    >
                                        <div className="text-left">
                                            <div className="font-bold">{lang.name}</div>
                                            <div className="text-xs opacity-75">{lang.native}</div>
                                        </div>
                                        {selectedLanguage === lang.code && <div className="w-3 h-3 bg-accent rounded-full" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Upload */}
                        <DocumentUpload
                            onUpload={setFile}
                            currentFile={file}
                            onClear={() => setFile(null)}
                        />

                        {/* Action Button */}
                        <div className="mt-8">
                            <Button
                                className="w-full py-4 text-lg shadow-lg shadow-indigo-200"
                                disabled={!file}
                                onClick={handleUpload}
                            >
                                Analyze Document
                            </Button>
                        </div>
                    </div>
                )}

                {(state === 'uploading' || state === 'processing') && (
                    <div className="max-w-xl mx-auto text-center pt-20 animate-fade-in">
                        <div className="bg-white p-12 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
                                <div className="h-full bg-accent animate-wave"></div>
                            </div>

                            <LoadingSpinner size={64} className="mb-8" />

                            <h2 className="text-2xl font-bold text-primary-navy mb-2">
                                {state === 'uploading' ? 'Uploading Document...' : 'Analyzing Content...'}
                            </h2>
                            <p className="text-text-secondary mb-8">This usually takes about 30 seconds</p>

                            <div className="space-y-4 text-left max-w-xs mx-auto">
                                <StepItem label="Document uploaded securely" active={true} completed={state !== 'uploading'} />
                                <StepItem label="Extracting text from PDF" active={state === 'processing' && processingStep >= 0} completed={state === 'processing' && processingStep > 0} />
                                <StepItem label="AI analyzing content" active={state === 'processing' && processingStep >= 1} completed={state === 'processing' && processingStep > 1} />
                                <StepItem label="Generating voice explanation" active={state === 'processing' && processingStep >= 2} completed={false} />
                            </div>
                        </div>
                    </div>
                )}

                {state === 'error' && (
                    <div className="max-w-md mx-auto text-center pt-20 animate-fade-in">
                        <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-error">
                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-error">
                                <CheckCircle2 size={32} className="rotate-45" /> {/* Reuse icon inverted logic or use X */}
                            </div>
                            <h2 className="text-xl font-bold text-primary-navy mb-2">Analysis Failed</h2>
                            <p className="text-text-secondary mb-6">{error || "Something went wrong. Please try again."}</p>
                            <div className="flex gap-4 justify-center">
                                <Button variant="outline" onClick={handleReset}>Try Again</Button>
                                <Link href="/dashboard">
                                    <Button variant="ghost">Back to Dashboard</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {state === 'complete' && result && (
                    <AnalysisResult
                        result={result}
                        audioUrl={audioUrl}
                        file={file}
                        onReset={handleReset}
                    />
                )}
            </div>
        </div>
    );
}

const StepItem = ({ label, active, completed }: { label: string, active: boolean, completed: boolean }) => (
    <div className={`flex items-center gap-3 transition-opacity duration-300 ${active || completed ? 'opacity-100' : 'opacity-40'}`}>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 
            ${completed ? 'bg-success border-success text-white' :
                active ? 'border-accent text-accent animate-pulse' : 'border-slate-300'}`}>
            {completed ? <CheckCircle2 size={14} /> : <div className="w-2 h-2 bg-current rounded-full" />}
        </div>
        <span className="font-medium text-primary-navy">{label}</span>
    </div>
);

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Play, Pause, RotateCcw, CheckCircle2, AlertTriangle, AlertCircle, Download, Share2, Trash2 } from 'lucide-react';
import { Button } from '../shared/Button';
import { LoadingSpinner } from '../shared/LoadingSpinner';

type DemoState = 'idle' | 'processing' | 'complete';
type LanguageCode = 'hi' | 'ta' | 'te' | 'bn' | 'mr' | 'en';

export const DemoSection = () => {
    const [state, setState] = useState<DemoState>('idle');
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('hi');
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [processingStep, setProcessingStep] = useState(0);

    // Mock Audio Ref
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const languages: { code: LanguageCode; name: string }[] = [
        { code: 'hi', name: 'Hindi' },
        { code: 'ta', name: 'Tamil' },
        { code: 'te', name: 'Telugu' },
        { code: 'bn', name: 'Bengali' },
        { code: 'mr', name: 'Marathi' },
        { code: 'en', name: 'English' },
    ];

    const startDemo = () => {
        setState('processing');
        setProcessingStep(0);

        // Simulate processing steps
        const steps = [
            'Extracting text from document...',
            'Understanding document type...',
            `Translating to ${languages.find(l => l.code === selectedLanguage)?.name}...`,
            'Generating voice explanation...'
        ];

        let stepIndex = 0;
        const interval = setInterval(() => {
            if (stepIndex >= steps.length) {
                clearInterval(interval);
                setState('complete');
            } else {
                setProcessingStep(stepIndex);
                stepIndex++;
            }
        }, 800);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <section id="demo-section" className="py-24 bg-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4">
                    Try It Now - No Login Required
                </h2>
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px] text-left relative transition-all duration-500">

                    {/* IDLE STATE */}
                    {state === 'idle' && (
                        <div className="flex flex-col items-center justify-center p-12 h-full min-h-[600px] animate-fade-in">
                            <div className="w-full max-w-lg border-2 border-dashed border-indigo-200 rounded-xl p-12 flex flex-col items-center justify-center bg-indigo-50/50 hover:bg-indigo-50 transition-colors cursor-pointer"
                                onClick={startDemo}>
                                <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-6">
                                    <Upload className="w-10 h-10 text-accent" />
                                </div>
                                <h3 className="text-xl font-bold text-primary-navy mb-2">Drop a sample document</h3>
                                <p className="text-text-secondary text-center mb-6">
                                    Try with: Loan agreement, insurance form, consent letter
                                </p>
                                <Button onClick={(e) => { e.stopPropagation(); startDemo(); }}>
                                    Try Sample Document
                                </Button>
                            </div>

                            <div className="mt-8 flex items-center gap-4">
                                <span className="text-text-secondary font-medium">Explain in:</span>
                                <select
                                    className="border border-slate-300 rounded-lg px-4 py-2 text-primary-navy bg-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.target.value as LanguageCode)}
                                >
                                    {languages.map(lang => (
                                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {/* PROCESSING STATE */}
                    {state === 'processing' && (
                        <div className="flex flex-col items-center justify-center p-12 h-full min-h-[600px] animate-fade-in">
                            <LoadingSpinner size={48} className="mb-8" />
                            <div className="space-y-4 w-full max-w-sm">
                                {[
                                    'Extracting text from document...',
                                    'Understanding document type...',
                                    `Translating to ${languages.find(l => l.code === selectedLanguage)?.name}...`,
                                    'Generating voice explanation...'
                                ].map((step, idx) => (
                                    <div key={idx} className="flex items-center gap-3 transition-all duration-300"
                                        style={{ opacity: idx <= processingStep ? 1 : 0.4 }}>
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 
                                            ${idx < processingStep ? 'bg-success border-success text-white' :
                                                idx === processingStep ? 'border-accent text-accent animate-pulse' : 'border-slate-300 text-slate-300'}`}>
                                            {idx < processingStep ? <CheckCircle2 size={14} /> : <div className="w-2 h-2 bg-current rounded-full" />}
                                        </div>
                                        <span className={`font-medium ${idx === processingStep ? 'text-primary-navy' : 'text-text-secondary'}`}>
                                            {step}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* COMPLETE STATE */}
                    {state === 'complete' && (
                        <div className="flex flex-col h-full animate-fade-in">
                            {/* Header */}
                            <div className="border-b border-slate-100 p-4 flex items-center justify-between bg-white">
                                <div className="flex items-center gap-3">
                                    <div className="bg-red-50 p-2 rounded text-error">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-primary-navy text-sm">Sample_Loan_Agreement.pdf</p>
                                        <span className="text-xs bg-indigo-50 text-accent px-2 py-0.5 rounded-full font-medium">
                                            {languages.find(l => l.code === selectedLanguage)?.name}
                                        </span>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" onClick={() => setState('idle')}>
                                    Analyze Another
                                </Button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50/50">
                                <div className="flex justify-center mb-6">
                                    <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-indigo-200">
                                        📄 Personal Loan Agreement
                                    </span>
                                </div>

                                {/* Summary Card */}
                                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8">
                                    <h3 className="text-lg font-bold text-text-secondary uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                                        📝 यह दस्तावेज़ क्या कहता है (Summary)
                                    </h3>
                                    <p className="text-xl md:text-2xl text-primary-navy leading-relaxed font-medium">
                                        "आपको बैंक से ₹50,000 का लोन मिल रहा है।
                                        आपको हर महीने ₹1,500 वापस करने होंगे।
                                        कुल 3 साल में पूरा लोन चुकाना है।
                                        अगर आप समय पर पैसे नहीं देंगे, तो आपकी प्रॉपर्टी ले ली जा सकती है।"
                                    </p>

                                    {/* Audio Player */}
                                    <div className="mt-8 bg-indigo-50 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 border border-indigo-100">
                                        <button
                                            onClick={togglePlay}
                                            className="w-16 h-16 bg-accent hover:bg-accent-hover text-white rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 flex-shrink-0"
                                        >
                                            {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                                        </button>
                                        <div className="flex-1 w-full">
                                            <div className="flex justify-between text-sm font-medium text-text-secondary mb-2">
                                                <span>PLAY EXPLANATION</span>
                                                <span>0:12 / 0:45</span>
                                            </div>
                                            <div className="h-2 bg-indigo-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-accent w-[30%]"></div>
                                            </div>
                                            <div className="flex gap-1 mt-2 justify-center md:justify-start">
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                                    <div key={i} className={`w-1 bg-indigo-300 rounded-full ${isPlaying ? 'animate-wave' : 'h-2'}`} style={{
                                                        height: isPlaying ? undefined : '8px',
                                                        animationDelay: `${i * 0.1}s`
                                                    }}></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Key Points Grid */}
                                <h3 className="text-lg font-bold text-primary-navy mb-4 flex items-center gap-2">
                                    <span>✅ महत्वपूर्ण बातें</span>
                                    <span className="text-text-secondary font-normal text-sm">(Important Points)</span>
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    <div className="bg-emerald-50 border-l-4 border-success p-4 rounded-lg">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 className="text-success mt-1 shrink-0" size={20} />
                                            <div>
                                                <p className="font-bold text-primary-navy">Loan Amount: ₹50,000</p>
                                                <p className="text-sm text-text-secondary">आपको ये रकम मिलेगी</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-emerald-50 border-l-4 border-success p-4 rounded-lg">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 className="text-success mt-1 shrink-0" size={20} />
                                            <div>
                                                <p className="font-bold text-primary-navy">Monthly: ₹1,500</p>
                                                <p className="text-sm text-text-secondary">हर महीने की किस्त</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-amber-50 border-l-4 border-warning p-4 rounded-lg">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="text-warning mt-1 shrink-0" size={20} />
                                            <div>
                                                <p className="font-bold text-primary-navy">Interest: 12% / year</p>
                                                <p className="text-sm text-text-secondary">ब्याज दर - थोड़ा ज्यादा है</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-red-50 border-l-4 border-error p-4 rounded-lg">
                                        <div className="flex items-start gap-3">
                                            <AlertTriangle className="text-error mt-1 shrink-0" size={20} />
                                            <div>
                                                <p className="font-bold text-primary-navy">Collateral: Property</p>
                                                <p className="text-sm text-text-secondary">⚠️ आपकी प्रॉपर्टी गिरवी होगी</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Warning Section */}
                                <div className="bg-red-50 border border-red-100 rounded-xl p-6 mb-8">
                                    <h4 className="text-error font-bold text-lg mb-3 flex items-center gap-2">
                                        <AlertTriangle size={24} />
                                        ⚠️ ध्यान दें (Be Careful)
                                    </h4>
                                    <ul className="list-disc list-inside space-y-2 text-primary-navy font-medium">
                                        <li>अगर पेमेंट नहीं की तो घर ले लिया जाएगा</li>
                                        <li>ब्याज दर बाज़ार से ज्यादा है (सामान्य: 8-10%)</li>
                                    </ul>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 justify-center border-t border-slate-200 pt-6">
                                    <Button leftIcon={<Download size={18} />}>Download Summary</Button>
                                    <Button variant="outline" leftIcon={<RotateCcw size={18} />}>Translate</Button>
                                    <Button variant="secondary" className="bg-emerald-50 text-success hover:bg-emerald-100" leftIcon={<Share2 size={18} />}>Share via WhatsApp</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

"use client";

import React from 'react';
import { Volume2, MessageSquareQuote, Mic, Brain, Users, Check, X, FileText } from 'lucide-react';

// Types as requested
export type ConsentState = 'idle' | 'explaining' | 'checking' | 'verified';

export interface UserProperties {
    userLiteracyLevel: 'low' | 'high';
    language: string;
}

export const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-bg-primary text-text-primary font-sans selection:bg-primary-blue selection:text-white">

            {/* 1. HERO SECTION */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="container-custom relative z-10 text-center animate-fade-in duration-800">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary-navy mb-6">
                        Consent-First AI
                    </h1>
                    <p className="text-2xl md:text-3xl font-medium text-primary-blue mb-8">
                        Verifying Understanding, Not Just Clicks
                    </p>
                    <p className="max-w-2xl mx-auto text-lg text-text-secondary leading-relaxed mb-10">
                        In India, 287 million adults cannot read a consent form. We replace confusing checkboxes
                        with voice explanations and comprehension checks—because true consent requires understanding.
                    </p>
                </div>

                {/* Abstract background element */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none z-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary-blue/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-sky/10 rounded-full blur-3xl"></div>
                </div>
            </section>

            {/* 2. PROBLEM VISUALIZATION SECTION */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4">
                            The Broken Consent Problem
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

                        {/* LEFT SIDE - Traditional Approach */}
                        <div className="relative border border-slate-200 rounded-lg p-6 bg-slate-50 shadow-sm flex flex-col h-full group">
                            <div className="absolute inset-0 bg-red-500/10 pointer-events-none rounded-lg z-0"></div>
                            <div className="absolute top-4 right-4 bg-red-100 text-red-600 p-2 rounded-full z-10">
                                <X size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2 z-10">
                                <FileText size={20} className="text-text-secondary" />
                                Traditional Approach
                            </h3>

                            <div className="bg-white p-4 border border-slate-200 rounded shadow-sm flex-grow mb-4 opacity-50 relative overflow-hidden z-10">
                                <div className="space-y-2">
                                    <div className="h-2 bg-slate-200 rounded w-full"></div>
                                    <div className="h-2 bg-slate-200 rounded w-11/12"></div>
                                    <div className="h-2 bg-slate-200 rounded w-full"></div>
                                    <div className="h-2 bg-slate-200 rounded w-10/12"></div>
                                    <div className="h-2 bg-slate-200 rounded w-full"></div>
                                    <div className="h-2 bg-slate-200 rounded w-full"></div>
                                    <div className="h-2 bg-slate-200 rounded w-9/12"></div>
                                    {/* Lorem Ipsum simulation */}
                                    <p className="text-[10px] text-slate-400 mt-2 leading-tight text-justify font-serif">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...
                                    </p>
                                </div>

                                {/* Checkbox overlay */}
                                <div className="mt-4 flex items-center gap-2 pt-4 border-t border-slate-100">
                                    <div className="w-4 h-4 border border-slate-300 rounded"></div>
                                    <div className="h-2 bg-slate-200 rounded w-24"></div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE - Consent-First Solution */}
                        <div className="relative border-2 border-indigo-600 rounded-lg p-6 bg-indigo-50/30 shadow-md flex flex-col h-full ring-1 ring-primary-blue/5">
                            <div className="absolute top-4 right-4 bg-green-100 text-success p-2 rounded-full z-10">
                                <Check size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-primary-navy mb-4 flex items-center gap-2">
                                <Volume2 size={20} className="text-primary-blue" />
                                Consent-First Solution
                            </h3>

                            <div className="flex-grow flex flex-col items-center justify-center space-y-6 py-8">

                                {/* Visual Audio Wave */}
                                <div className="flex items-center gap-1 h-12 text-primary-blue">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="w-2 bg-current rounded-full animate-wave" style={{
                                            animationDelay: `${i * 0.1}s`,
                                            height: i % 2 === 0 ? '60%' : '100%'
                                        }}></div>
                                    ))}
                                </div>

                                {/* Explanation Card */}
                                <div className="bg-white p-4 rounded-lg shadow-sm w-full max-w-sm border-l-4 border-primary-blue">
                                    <p className="text-lg md:text-xl text-primary-navy font-medium text-center">
                                        "आपका बीमा मुफ्त है। सरकार भुगतान करती है।"
                                    </p>
                                </div>

                                {/* Comprehension Check */}
                                <div className="flex items-center gap-2 text-success font-medium bg-green-50 px-4 py-2 rounded-full">
                                    <MessageSquareQuote size={18} />
                                    <span>Verified understanding</span>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 3. PHILOSOPHY SECTION */}
            <section className="py-20 bg-bg-primary">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="text-primary-blue font-semibold tracking-wider text-sm uppercase">Our Core Principle</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-primary-navy mt-2 mb-6">
                            "Understanding &gt; Signatures"
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-primary-blue">
                            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-6 text-primary-blue">
                                <Mic size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-primary-navy mb-3">Voice-First</h3>
                            <p className="text-text-secondary leading-relaxed">
                                Explanations in the user's native language, breaking down complex barriers into simple, conversational interactions.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-primary-sky">
                            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 text-primary-sky">
                                <Brain size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-primary-navy mb-3">Comprehension Verified</h3>
                            <p className="text-text-secondary leading-relaxed">
                                Quiz-based checks, not blind clicks. We ensure the user actually understood the terms before proceeding.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-primary-navy">
                            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-6 text-primary-navy">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-primary-navy mb-3">Human Fallback</h3>
                            <p className="text-text-secondary leading-relaxed">
                                Escalate to human agents when AI can't verify understanding, ensuring no one is left behind by technology.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

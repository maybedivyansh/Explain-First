'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Button } from '../shared/Button';
import { InterfacePreview } from './InterfacePreview';

export const Hero = () => {
    return (
        <section className="bg-white pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary-navy mb-6 animate-fade-in">
                    समझें। फिर साइन करें।
                    <span className="block text-4xl md:text-6xl text-accent mt-2">
                        (Understand. Then Sign.)
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-text-secondary mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    Upload any legal document, loan agreement, or consent form. Get a simple explanation in <span className="font-semibold text-primary-navy">Hindi, Tamil, Telugu, Bengali, Marathi, or English</span> - with AI voice readout.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
                    <Button
                        size="lg"
                        className="w-full sm:w-auto text-lg px-8 py-4 shadow-xl shadow-indigo-200 bg-indigo-600 text-white hover:bg-indigo-700"
                        onClick={() => {
                            document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        rightIcon={<ArrowRight size={20} />}
                    >
                        Try Demo
                    </Button>
                    <Link href="/login" className="w-full sm:w-auto">
                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full text-lg px-8 py-4"
                        >
                            Sign Up Free
                        </Button>
                    </Link>
                </div>

                <div className="mt-16 mx-auto max-w-6xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    <InterfacePreview />
                </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>
        </section>
    );
};

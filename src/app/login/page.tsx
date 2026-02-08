'use client';

import React from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { FileText } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="mb-8 text-center animate-fade-in">
                <Link href="/" className="inline-flex items-center gap-2 mb-4">
                    <div className="w-12 h-12 bg-primary-navy rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                        <FileText size={24} />
                    </div>
                </Link>
                <h1 className="text-3xl font-bold text-primary-navy">Welcome to ExplainFirst</h1>
                <p className="text-text-secondary mt-2">Sign in to manage your documents</p>
            </div>

            <div className="animate-slide-up w-full max-w-md">
                <AuthForm />
            </div>

            <div className="mt-8 text-center text-xs text-text-secondary animate-fade-in" style={{ animationDelay: '0.2s' }}>
                By continuing, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
            </div>
        </div>
    );
}

import React from 'react';
import { Footer } from '@/components/shared/Footer';
import { Shield, BookOpen, UserCheck, Heart } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-indigo-50 py-20 border-b border-indigo-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">
                        Empowering Every Indian to Understand Before Signing
                    </h1>
                    <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                        ExplainFirst is built on a simple premise: <strong>Consent requires comprehension.</strong> We use AI to bridge the gap between complex legal language and everyday understanding.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-primary-navy mb-6">The Problem</h2>
                            <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                                In India, millions of people sign documents they cannot read or understand. Technical jargon, language barriers, and small print lead to exploitation, financial loss, and uninformed consent.
                            </p>
                            <div className="p-6 bg-red-50 rounded-xl border-l-4 border-error mb-6">
                                <p className="font-medium text-error flex gap-2">
                                    <span className="font-bold">Fact:</span> Only ~10% of rural Indians can read English fluently, yet 90% of legal documents are in English.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-text-secondary">
                                    <BookOpen size={24} />
                                </div>
                                <h3 className="font-bold text-lg text-primary-navy">Literacy Gap</h3>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-text-secondary">
                                    <Shield size={24} />
                                </div>
                                <h3 className="font-bold text-lg text-primary-navy">Compliance</h3>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-text-secondary">
                                    <UserCheck size={24} />
                                </div>
                                <h3 className="font-bold text-lg text-primary-navy">Trust</h3>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-text-secondary">
                                    <Heart size={24} />
                                </div>
                                <h3 className="font-bold text-lg text-primary-navy">Empathy</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary-navy mb-4">Our Core Values</h2>
                        <p className="text-lg text-text-secondary">How we are redesigning trust for the digital age.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-accent mb-6">
                                <UserCheck size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-primary-navy mb-3">User-Centricity</h3>
                            <p className="text-text-secondary">We design for the "next billion users"—focusing on simplicity, voice-first interaction, and vernacular languages.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-success mb-6">
                                <Shield size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-primary-navy mb-3">Privacy First</h3>
                            <p className="text-text-secondary">Your documents are personal. We prioritize privacy, encryption, and data sovereignty in everything we build.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-warning mb-6">
                                <BookOpen size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-primary-navy mb-3">Transparency</h3>
                            <p className="text-text-secondary">Our AI explains not just "what" but "why". We highlight risks clearly, without hiding behind legal jargon.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

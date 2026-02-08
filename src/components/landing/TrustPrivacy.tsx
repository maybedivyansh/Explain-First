import React from 'react';
import { ShieldCheck, Lock, Trash2 } from 'lucide-react';

export const TrustPrivacy = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4">
                        Your Privacy is Sacred
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        We use government-grade encryption to protect your documents.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 text-center hover:bg-white hover:shadow-lg transition-all duration-300">
                        <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center text-success mb-6">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-primary-navy mb-3">Encrypted Storage</h3>
                        <p className="text-text-secondary leading-relaxed">
                            End-to-end encryption for all documents. Your data is encrypted both in transit and at rest.
                        </p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 text-center hover:bg-white hover:shadow-lg transition-all duration-300">
                        <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center text-accent mb-6">
                            <Lock size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-primary-navy mb-3">Your Eyes Only</h3>
                        <p className="text-text-secondary leading-relaxed">
                            No one can access your documents except you. We do not sell or share your data with anyone.
                        </p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 text-center hover:bg-white hover:shadow-lg transition-all duration-300">
                        <div className="w-16 h-16 mx-auto bg-slate-200 rounded-full flex items-center justify-center text-text-primary mb-6">
                            <Trash2 size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-primary-navy mb-3">Auto-Delete Option</h3>
                        <p className="text-text-secondary leading-relaxed">
                            Delete documents anytime, or set them to auto-delete after 30 days for complete peace of mind.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

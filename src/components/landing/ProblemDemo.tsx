import React from 'react';
import { XCircle, CheckCircle2, Volume2 } from 'lucide-react';

export const ProblemDemo = () => {
    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4">
                        The Consent Problem in India
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Millions sign documents they don't understand. We're fixing that.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Traditional Way */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-error relative group">
                        <div className="p-8">
                            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <XCircle className="w-24 h-24 text-error" />
                            </div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-error">
                                    <XCircle size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-primary-navy">Traditional Way</h3>
                            </div>

                            <div className="bg-slate-50 p-4 rounded border border-slate-200 mb-4 h-48 overflow-hidden relative">
                                <p className="text-[8px] text-slate-400 leading-tight text-justify select-none">
                                    LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. UT ENIM AD MINIM VENIAM, QUIS NOSTRUD EXERCITATION ULLAMCO LABORIS NISI UT ALIQUIP EX EA COMMODO CONSEQUAT. DUIS AUTE IRURE DOLOR IN REPREHENDERIT IN VOLUPTATE VELIT ESSE CILLUM DOLORE EU FUGIAT NULLA PARIATUR. EXCEPTEUR SINT OCCAECAT CUPIDATAT NON PROIDENT, SUNT IN CULPA QUI OFFICIA DESERUNT MOLLIT ANIM ID EST LABORUM.
                                    <br /><br />
                                    SECTION 12.3: WHEREAS THE PARTY OF THE FIRST PART AGREES TO INDEMNIFY THE PARTY OF THE SECOND PART AGAINST ALL CLAIMS, DAMAGES, AND LIABILITIES ARISING FROM...
                                </p>
                                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
                            </div>

                            <div className="flex items-center gap-2 text-slate-400 mb-2">
                                <div className="w-4 h-4 border border-slate-300 rounded"></div>
                                <span className="text-xs">I agree to the terms and conditions</span>
                            </div>

                            <div className="mt-6 p-3 bg-red-50 rounded-lg border border-red-100 text-error text-sm font-medium text-center">
                                287 million Indians cannot read this
                            </div>
                        </div>
                    </div>

                    {/* ExplainFirst Way */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-success relative group">
                        <div className="p-8">
                            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <CheckCircle2 className="w-24 h-24 text-success" />
                            </div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-success">
                                    <Volume2 size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-primary-navy">ExplainFirst Way</h3>
                            </div>

                            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 mb-4 h-48 flex flex-col justify-center relative overflow-hidden">
                                <div className="absolute right-4 top-4">
                                    <span className="flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                                    </span>
                                </div>
                                <p className="text-lg font-medium text-primary-navy mb-2">
                                    "आपको ₹50,000 का लोन मिलेगा।"
                                </p>
                                <p className="text-base text-text-secondary mb-1">
                                    • ब्याज: 12% प्रति वर्ष
                                </p>
                                <p className="text-base text-text-secondary">
                                    • 3 साल में वापस करें
                                </p>

                                <div className="mt-4 flex items-center gap-2">
                                    <div className="flex space-x-1">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className="w-1 bg-indigo-400 rounded-full animate-wave" style={{
                                                height: Math.random() * 16 + 8 + 'px',
                                                animationDuration: '1s',
                                                animationDelay: `${i * 0.1}s`
                                            }}></div>
                                        ))}
                                    </div>
                                    <span className="text-xs text-indigo-600 font-medium">Playing Explanation...</span>
                                </div>
                            </div>

                            <div className="mt-6 p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-success text-sm font-medium text-center">
                                Explained in 30 seconds. Verified understanding.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

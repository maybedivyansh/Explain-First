import React from 'react';
import { Upload, Languages, Volume2 } from 'lucide-react';

export const HowItWorks = () => {
    const steps = [
        {
            icon: <Upload className="w-8 h-8 text-white" />,
            title: "Upload Document",
            desc: "PDF, image, or photo of any paper document",
            color: "bg-indigo-600"
        },
        {
            icon: <Languages className="w-8 h-8 text-white" />,
            title: "Choose Language",
            desc: "Get explanation in Hindi, Tamil, Telugu, Bengali, Marathi, or English",
            color: "bg-emerald-500"
        },
        {
            icon: <Volume2 className="w-8 h-8 text-white" />,
            title: "Listen & Understand",
            desc: "AI reads it aloud. Simple words. Clear explanation.",
            color: "bg-amber-500"
        }
    ];

    return (
        <section id="how-it-works" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4">
                        How ExplainFirst Works
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Three simple steps to clarity. No legal jargon.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {steps.map((step, index) => (
                        <div key={index} className="relative flex flex-col items-center text-center group">
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-10 left-1/2 w-full h-1 bg-slate-100 -z-10">
                                    <div className="h-full bg-indigo-100 w-0 group-hover:w-full transition-all duration-700 ease-out origin-left"></div>
                                </div>
                            )}

                            <div className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center shadow-lg shadow-indigo-100 mb-6 transform group-hover:scale-110 transition-transform duration-300 relative`}>
                                {step.icon}
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full border-2 border-slate-100 flex items-center justify-center font-bold text-primary-navy shadow-sm">
                                    {index + 1}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-primary-navy mb-3">{step.title}</h3>
                            <p className="text-text-secondary leading-relaxed px-4">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

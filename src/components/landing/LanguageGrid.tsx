import React from 'react';

export const LanguageGrid = () => {
    const languages = [
        { code: 'hi', name: 'Hindi', native: 'हिंदी', speakers: '520M speakers', char: 'हिं' },
        { code: 'ta', name: 'Tamil', native: 'தமிழ்', speakers: '75M speakers', char: 'த' },
        { code: 'te', name: 'Telugu', native: 'తెలుగు', speakers: '82M speakers', char: 'తె' },
        { code: 'bn', name: 'Bengali', native: 'বাংলা', speakers: '265M speakers', char: 'বা' },
        { code: 'mr', name: 'Marathi', native: 'मराठी', speakers: '83M speakers', char: 'म' },
        { code: 'en', name: 'English', native: 'English', speakers: 'Simplified', char: 'En' },
    ];

    return (
        <section id="languages" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4">
                        Available in 6+ Indian Languages
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Breaking language barriers in legal understanding.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {languages.map((lang) => (
                        <div key={lang.code} className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-xl font-bold text-accent shrink-0">
                                {lang.char}
                            </div>
                            <div>
                                <h3 className="font-bold text-primary-navy text-lg">
                                    {lang.name} <span className="text-sm font-normal text-text-secondary">({lang.native})</span>
                                </h3>
                                <p className="text-sm text-text-secondary mt-1">{lang.speakers}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

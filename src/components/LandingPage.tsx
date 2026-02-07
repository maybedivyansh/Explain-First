import React from 'react';

export const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen">
            <section className="py-16 md:py-24 animate-fade-in">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary-navy mb-4">
                        Landing Page - Teammate 1
                    </h1>
                    <p className="text-text-secondary">
                        Paste your Antigravity prompt and replace this placeholder
                    </p>
                </div>
            </section>
        </div>
    );
};
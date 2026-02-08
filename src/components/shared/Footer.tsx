import React from 'react';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-200 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <span className="text-xl font-bold text-primary-navy block">ExplainFirst</span>
                    <span className="text-sm text-text-secondary">Generic AI for Government & Legal Tech</span>
                </div>
                <div className="flex gap-6 text-sm text-text-secondary">
                    <Link href="#" className="hover:text-primary-navy">Privacy Policy</Link>
                    <Link href="#" className="hover:text-primary-navy">Terms of Service</Link>
                    <Link href="#" className="hover:text-primary-navy">Contact</Link>
                </div>
                <div className="text-sm text-text-secondary font-medium">
                    Built for India 🇮🇳
                </div>
            </div>
        </footer>
    );
};

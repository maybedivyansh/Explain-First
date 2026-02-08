'use client';

import React from 'react';
import { AnalysisResult } from '@/components/analyze/AnalysisResult';
import { AnalysisResult as AnalysisResultType } from '@/types';

export const InterfacePreview = () => {
    const mockResult: AnalysisResultType = {
        documentType: "Residential Rental Agreement",
        summary: "यह 11 महीने की अवधि के लिए एक मानक किराये का समझौता (Standard Rental Agreement) है। मासिक किराया ₹15,000 है और ₹50,000 की सुरक्षा जमा (Security Deposit) की आवश्यकता है। बिजली और पानी के बिल का भुगतान आपको करना होगा। मकान मालिक को समझौता समाप्त करने के लिए 30 दिनों का नोटिस देना होगा।",
        keyPoints: [
            {
                text: "Monthly Rent & Due Date",
                type: "info",
                explanation: "Rent of ₹15,000 must be paid by the 5th of every month directly to the landlord's bank account."
            },
            {
                text: "Security Deposit Refund",
                type: "warning",
                explanation: "The ₹50,000 deposit is refundable, but a standard painting charge will be deducted upon vacating."
            },
            {
                text: "Lock-in Period",
                type: "danger",
                explanation: "There is a 6-month lock-in period. Leaving earlier will result in forfeiture of the entire security deposit."
            }
        ],
        warnings: [
            "Penalty of ₹500 per day for delayed rent payment.",
            "Sub-letting (renting to others) is strictly prohibited."
        ]
    };

    const mockFile = {
        name: "Rental_Agreement_2024.pdf",
        size: 1024 * 1024 * 2.5, // 2.5MB
        type: "application/pdf"
    } as File;

    return (
        <div className="bg-slate-50 rounded-xl overflow-hidden shadow-2xl border border-slate-200 pointer-events-none select-none transform scale-[0.85] md:scale-100 origin-top">
            <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="ml-4 bg-slate-100 px-3 py-1 rounded-md text-xs text-text-secondary flex-1 text-center font-mono">
                    app.explainfirst.com/analyze/result
                </div>
            </div>
            <div className="p-4 md:p-8 max-h-[600px] overflow-y-hidden relative">
                <AnalysisResult
                    result={mockResult}
                    file={mockFile}
                    onReset={() => { }}
                    audioUrl={null}
                />

                {/* Fade out at the bottom to suggest scrolling */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-10"></div>
            </div>
        </div>
    );
};

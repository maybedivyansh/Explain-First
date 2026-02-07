import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play,
    MessageSquare,
    CheckCircle,
    XCircle,
    CheckCircle2,
    AlertTriangle,
    Phone
} from 'lucide-react';
import type { ConsentState } from '../types';

export default function ConsentFlow() {
    const [consentState, setConsentState] = useState<ConsentState>('idle');
    const [comprehensionScore, setComprehensionScore] = useState(0);
    const [retryCount, setRetryCount] = useState(0);
    const [timestamp, setTimestamp] = useState<string>('');

    // Mock user data
    const user = {
        name: "Ram Kumar",
        location: "Patna, Bihar",
        language: "hi-IN",
        literacyLevel: "low"
    };

    // Explanation logic
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (consentState === 'explaining') {
            // Auto-transition after 5 seconds (simulating audio explanation)
            timer = setTimeout(() => {
                setConsentState('checking');
            }, 5500);
        }
        return () => clearTimeout(timer);
    }, [consentState]);



    const handleStart = () => setConsentState('explaining');

    const handleCheck = (understood: boolean) => {
        if (understood) {
            setComprehensionScore(100);
            setTimestamp(new Date().toLocaleString('en-IN'));
            setConsentState('verified');
        } else {
            setComprehensionScore(0);
            const newRetryCount = retryCount + 1;
            setRetryCount(newRetryCount);

            if (newRetryCount > 2) {
                setConsentState('failed');
            } else {
                setConsentState('explaining');
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-inter">
            {/* Phone Mockup */}
            <div className="w-full max-w-sm bg-white border-2 border-slate-300 rounded-3xl shadow-xl overflow-hidden h-[700px] flex flex-col relative text-slate-700">

                {/* Status Bar Mock */}
                <div className="h-6 bg-slate-900 w-full flex justify-between items-center px-4 text-[10px] text-white">
                    <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 bg-white rounded-full opacity-70"></div>
                        <div className="w-3 h-3 bg-white rounded-full opacity-70"></div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 relative flex flex-col">
                    <AnimatePresence mode="wait">

                        {/* STEP 1: IDLE */}
                        {consentState === 'idle' && (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col items-center justify-center h-full text-center space-y-8"
                            >
                                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center border-4 border-indigo-100">
                                    <span className="text-2xl font-bold text-indigo-600">RK</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
                                    <p className="text-slate-500">{user.location}</p>
                                </div>

                                <div className="w-full pt-8">
                                    <button
                                        onClick={handleStart}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                                        aria-label="Begin Consent Verification"
                                    >
                                        <Play className="w-5 h-5 fill-current" />
                                        Begin Verification
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: EXPLAINING */}
                        {consentState === 'explaining' && (
                            <motion.div
                                key="explaining"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center h-full space-y-8"
                            >
                                <div className="text-center space-y-2">
                                    <h3 className="text-lg font-semibold text-indigo-600 animate-pulse">
                                        AI Agent Explaining...
                                    </h3>
                                    <p className="text-xs text-slate-400 uppercase tracking-widest">Hindi • {user.literacyLevel} literacy mode</p>
                                </div>

                                {/* Audio Visualizer */}
                                <div className="flex items-end justify-center gap-1 h-16">
                                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="w-2 bg-indigo-500 rounded-full"
                                            animate={{
                                                height: [20, 40 + (i % 3) * 10, 20],
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 0.5 + (i % 4) * 0.1,
                                                ease: "easeInOut"
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Explanation Card */}
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 w-full text-center shadow-sm">
                                    <p className="text-lg leading-relaxed text-slate-800 font-medium">
                                        "आपको ₹50,000 का ऋण मिलेगा। <br />
                                        ब्याज दर <span className="text-indigo-600 font-bold">12% प्रति वर्ष</span> है। <br />
                                        आपको 3 साल में वापस करना होगा।"
                                    </p>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-indigo-600"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 5, ease: "linear" }}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: CHECKING */}
                        {consentState === 'checking' && (
                            <motion.div
                                key="checking"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="flex flex-col h-full justify-center space-y-6"
                            >
                                <div className="flex flex-col items-center text-center space-y-4 mb-4">
                                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-500">
                                        <MessageSquare className="w-8 h-8" />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900">Comprehension Check</h2>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border-2 border-indigo-50 shadow-sm">
                                    <p className="text-lg font-medium text-center text-slate-800">
                                        Did the agent explain that the interest rate is <span className="text-indigo-600 font-bold">12% per year</span>?
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-4 pt-4">
                                    <button
                                        onClick={() => handleCheck(true)}
                                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-4 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                        Yes, I understood
                                    </button>

                                    <button
                                        onClick={() => handleCheck(false)}
                                        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-4 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <XCircle className="w-5 h-5" />
                                        No, explain again
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 4A: VERIFIED */}
                        {consentState === 'verified' && (
                            <motion.div
                                key="verified"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col h-full justify-center items-center text-center space-y-6"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}

                                    className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2"
                                >
                                    <CheckCircle2 className="w-14 h-14" />
                                </motion.div>

                                <div className="w-full space-y-4">
                                    <h2 className="text-2xl font-bold text-emerald-800">Consent Verified</h2>

                                    <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-sm font-semibold">
                                        Comprehension Score: {comprehensionScore}/100
                                    </div>

                                    <div className="bg-emerald-50 border-2 border-emerald-100 p-6 rounded-2xl text-left space-y-3 shadow-inner">
                                        <p className="text-emerald-900 font-medium border-b border-emerald-200 pb-2">
                                            {user.name} demonstrated understanding of the loan terms.
                                        </p>
                                        <div className="text-xs text-emerald-700 space-y-1">
                                            <p>Time: {timestamp}</p>
                                            <p>UID: 9872-XXXX-XXXX</p>
                                            <p className="italic font-mono mt-2">Digital signature recorded</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-8 text-slate-400 hover:text-slate-600 text-sm"
                                >
                                    Start New Session
                                </button>
                            </motion.div>
                        )}

                        {/* STEP 4B: FAILED */}
                        {consentState === 'failed' && (
                            <motion.div
                                key="failed"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col h-full justify-center items-center text-center space-y-6"
                            >
                                <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-2">
                                    <AlertTriangle className="w-12 h-12" />
                                </div>

                                <div className="w-full space-y-4">
                                    <h2 className="text-2xl font-bold text-amber-800">Human Verification Required</h2>

                                    <div className="bg-amber-50 border-2 border-amber-100 p-6 rounded-2xl text-slate-700 space-y-4 shadow-sm">
                                        <p>
                                            The AI could not verify comprehension after multiple attempts.
                                            Escalating to human agent.
                                        </p>

                                        <div className="bg-white p-4 rounded-xl border border-amber-200 flex items-center gap-4">
                                            <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                                                <Phone className="w-6 h-6" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-xs text-slate-500 uppercase font-bold">Queue Position: 3</p>
                                                <p className="font-semibold text-slate-800">Agent will call shortly</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-8 text-slate-400 hover:text-slate-600 text-sm"
                                >
                                    Reset Demo
                                </button>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>

                {/* Home Indicator */}
                <div className="h-1.5 w-32 bg-slate-200 rounded-full mx-auto mb-2" />
            </div>
        </div>
    );
}
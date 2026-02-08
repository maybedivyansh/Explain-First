'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '../shared/Button';

export const AuthForm = () => {
    const supabase = createClient();
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });
                if (error) throw error;
                router.push('/dashboard');
            } else {
                if (formData.password !== formData.confirmPassword) {
                    throw new Error("Passwords do not match");
                }
                const { error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            full_name: formData.fullName,
                        },
                    },
                });
                if (error) throw error;
                // For email confirmation flows, you might want to show a message here
                router.push('/dashboard');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md border border-slate-100">
            {/* Tabs */}
            <div className="flex border-b border-slate-100">
                <button
                    className={`flex-1 py-4 text-center font-bold text-sm uppercase tracking-wider transition-colors ${isLogin ? 'bg-indigo-50 text-accent border-b-2 border-accent' : 'text-text-secondary hover:bg-slate-50'}`}
                    onClick={() => { setIsLogin(true); setError(null); }}
                >
                    Login
                </button>
                <button
                    className={`flex-1 py-4 text-center font-bold text-sm uppercase tracking-wider transition-colors ${!isLogin ? 'bg-indigo-50 text-accent border-b-2 border-accent' : 'text-text-secondary hover:bg-slate-50'}`}
                    onClick={() => { setIsLogin(false); setError(null); }}
                >
                    Sign Up
                </button>
            </div>

            <div className="p-8">
                {error && (
                    <div className="mb-6 p-3 bg-red-50 text-error text-sm rounded-lg flex items-center gap-2">
                        <AlertCircleIcon className="w-4 h-4" /> {/* Helper icon */}
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 text-text-secondary w-5 h-5" />
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                required={!isLogin}
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                            />
                        </div>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-text-secondary w-5 h-5" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 text-text-secondary w-5 h-5" />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3.5 text-text-secondary hover:text-primary-navy"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {!isLogin && (
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 text-text-secondary w-5 h-5" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                required={!isLogin}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                            />
                        </div>
                    )}

                    {isLogin && (
                        <div className="text-right">
                            <a href="#" className="text-sm text-accent hover:text-accent-hover font-medium">Forgot password?</a>
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full py-3 text-lg"
                        isLoading={isLoading}
                    >
                        {isLogin ? 'Login' : 'Create Account'}
                    </Button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-text-secondary">Or continue with</span>
                    </div>
                </div>

                <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26c.47-1.4 1.82-2.4 3.37-2.4 1.07 0 2.06.42 2.8 1.1l2.09-2.09C12.04 5.39 10.16 4.6 8 4.6c-4.3 0-8.01 2.47-9.82 6.43h2.84z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    Google
                </Button>

                <p className="mt-6 text-center text-sm text-text-secondary">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        className="text-accent font-bold hover:underline"
                        onClick={() => { setIsLogin(!isLogin); setError(null); }}
                    >
                        {isLogin ? 'Sign up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

const AlertCircleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
);

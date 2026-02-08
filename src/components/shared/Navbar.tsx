'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, FileText, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { createClient } from '@/lib/supabase/client';
import { User as SupabaseUser, AuthChangeEvent, Session } from '@supabase/supabase-js';

export const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Fetch specific user data
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
        setIsProfileOpen(false);
        setIsMenuOpen(false);
    };

    const navLinks = [
        { href: '/#how-it-works', label: 'How It Works' },
        { href: '/#languages', label: 'Languages' },
        { href: '/about', label: 'About' },
    ];

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                            <FileText className="h-8 w-8 text-accent" />
                            <span className="font-bold text-2xl text-primary-navy">ExplainFirst</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-text-secondary hover:text-accent transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary-navy transition-colors focus:outline-none"
                                >
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-accent border border-indigo-200">
                                        <User size={18} />
                                    </div>
                                    <span className="max-w-[150px] truncate hidden lg:block">
                                        {user.user_metadata?.full_name || user.email}
                                    </span>
                                </button>

                                {/* Dropdown Menu */}
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 animate-fade-in origin-top-right">
                                        <div className="px-4 py-3 border-b border-slate-50">
                                            <p className="text-sm font-bold text-primary-navy truncate">
                                                {user.user_metadata?.full_name || 'User'}
                                            </p>
                                            <p className="text-xs text-text-secondary truncate">{user.email}</p>
                                        </div>
                                        <Link
                                            href="/dashboard"
                                            className="block px-4 py-2 text-sm text-text-secondary hover:bg-slate-50 hover:text-primary-navy flex items-center gap-2"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            <LayoutDashboard size={16} />
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full text-left px-4 py-2 text-sm text-error hover:bg-red-50 flex items-center gap-2 transition-colors"
                                        >
                                            <LogOut size={16} />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" className="text-accent hover:text-accent-hover hover:bg-indigo-50">Login</Button>
                                </Link>
                                <Link href="/login">
                                    <Button>Sign Up</Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-primary-navy hover:bg-slate-100 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-slate-200">
                    <div className="pt-2 pb-3 space-y-1 px-4">
                        {user && (
                            <div className="mb-4 p-3 bg-indigo-50 rounded-lg flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-accent border border-indigo-100 shadow-sm">
                                    <User size={20} />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-bold text-primary-navy truncate">
                                        {user.user_metadata?.full_name || 'User'}
                                    </p>
                                    <p className="text-xs text-text-secondary truncate">{user.email}</p>
                                </div>
                            </div>
                        )}

                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-primary-navy hover:bg-slate-50"
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div className="border-t border-slate-100 pt-4 mt-2">
                            {user ? (
                                <div className="space-y-2">
                                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                                        <Button className="w-full justify-center flex items-center gap-2">
                                            <LayoutDashboard size={18} />
                                            Dashboard
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-center text-error border-red-200 hover:bg-red-50 hover:border-red-300 flex items-center gap-2"
                                        onClick={handleSignOut}
                                    >
                                        <LogOut size={18} />
                                        Sign Out
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant="outline" className="w-full justify-center">Login</Button>
                                    </Link>
                                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                        <Button className="w-full justify-center">Sign Up</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, Loader2 } from 'lucide-react';

export const VoicePlayer = ({ audioUrl }: { audioUrl: string | null }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    if (!audioUrl) {
        return (
            <div className="flex items-center gap-3 text-text-secondary">
                <Loader2 className="animate-spin" size={20} />
                <span className="text-sm">Generating voice explanation...</span>
            </div>
        );
    }

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleEnded = () => {
        setIsPlaying(false);
    };

    const handleLoadStart = () => {
        setIsLoading(true);
    };

    const handleCanPlay = () => {
        setIsLoading(false);
    };

    return (
        <div className="flex items-center gap-4">
            <button
                onClick={togglePlay}
                disabled={isLoading}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-white hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                aria-label={isPlaying ? 'Pause' : 'Play'}
            >
                {isLoading ? (
                    <Loader2 className="animate-spin" size={24} />
                ) : isPlaying ? (
                    <Pause size={24} />
                ) : (
                    <Play size={24} className="ml-0.5" />
                )}
            </button>

            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <Volume2 size={16} className="text-accent" />
                    <span className="text-sm font-medium text-primary-navy">
                        {isPlaying ? 'Playing...' : 'Click to listen'}
                    </span>
                </div>
                <audio
                    ref={audioRef}
                    src={audioUrl}
                    onEnded={handleEnded}
                    onLoadStart={handleLoadStart}
                    onCanPlay={handleCanPlay}
                    className="w-full h-8"
                    controls
                />
            </div>
        </div>
    );
};

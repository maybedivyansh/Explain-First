import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
    size?: number;
    className?: string;
    text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 24, className = '', text }) => {
    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <Loader2 className="animate-spin text-accent" size={size} />
            {text && <p className="mt-2 text-sm text-text-secondary">{text}</p>}
        </div>
    );
};

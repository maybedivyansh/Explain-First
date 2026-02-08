import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X } from 'lucide-react';
import { Button } from '@/components/shared/Button';

interface DocumentUploadProps {
    onUpload: (file: File) => void;
    currentFile: File | null;
    onClear: () => void;
    disabled?: boolean;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUpload, currentFile, onClear, disabled }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            onUpload(acceptedFiles[0]);
        }
    }, [onUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png']
        },
        maxFiles: 1,
        disabled: disabled || !!currentFile,
        maxSize: 10 * 1024 * 1024 // 10MB
    });

    if (currentFile) {
        return (
            <div className="bg-white border rounded-xl p-6 flex items-center justify-between shadow-sm animate-fade-in">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-accent">
                        <FileText size={24} />
                    </div>
                    <div>
                        <p className="font-medium text-primary-navy truncate max-w-xs">{currentFile.name}</p>
                        <p className="text-sm text-text-secondary">{(currentFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                </div>
                {!disabled && (
                    <button
                        onClick={onClear}
                        className="p-2 text-text-secondary hover:text-error hover:bg-red-50 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>
        );
    }

    return (
        <div
            {...getRootProps()}
            className={`
                border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer min-h-[300px] flex flex-col items-center justify-center
                ${isDragActive ? 'border-accent bg-indigo-50/50 scale-[1.02]' : 'border-slate-300 hover:border-accent hover:bg-slate-50'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
        >
            <input {...getInputProps()} />
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 text-accent">
                <Upload size={40} />
            </div>
            <h3 className="text-xl font-bold text-primary-navy mb-2">
                {isDragActive ? "Drop document here" : "Drag & drop your document"}
            </h3>
            <p className="text-text-secondary mb-6">
                or click to browse from your computer
            </p>
            <div className="flex flex-wrap gap-2 justify-center text-xs text-text-secondary">
                <span className="px-2 py-1 bg-slate-100 rounded">PDF</span>
                <span className="px-2 py-1 bg-slate-100 rounded">JPG</span>
                <span className="px-2 py-1 bg-slate-100 rounded">PNG</span>
                <span className="px-2 py-1 bg-slate-100 rounded">Max 10MB</span>
            </div>
        </div>
    );
};

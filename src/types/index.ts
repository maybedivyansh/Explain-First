export type LanguageCode = 'hi' | 'ta' | 'te' | 'bn' | 'mr' | 'en';

export interface UserProfile {
    id: string;
    email: string;
    full_name?: string;
    avatar_url?: string;
}

export interface DocumentMetadata {
    id: string;
    user_id: string;
    filename: string;
    file_path: string;
    document_type?: string;
    language: LanguageCode;
    summary?: string;
    key_points?: KeyPoint[];
    warnings?: string[];
    created_at: string;
    file_size: number;
    status: 'uploading' | 'processing' | 'complete' | 'error';
}

export interface KeyPoint {
    text: string;
    type: 'info' | 'warning' | 'danger';
    explanation?: string;
}

export interface AnalysisResult {
    documentType: string;
    summary: string;
    keyPoints: KeyPoint[];
    warnings: string[];
}

// Shared type definitions for ExplainFirst
export type ConsentState = 'idle' | 'explaining' | 'checking' | 'verified' | 'failed';
export type Language = 'hi-IN' | 'en-IN' | 'ta-IN' | 'te-IN' | 'bn-IN' | 'mr-IN';
export type LiteracyLevel = 'low' | 'medium' | 'high';
export type ConsentType = 'health' | 'finance' | 'welfare';
export type VerificationStatus = 'verified' | 'escalated' | 'pending';

export interface ConsentFlowState {
    consentState: ConsentState;
    comprehensionScore: number;
    language: Language;
    userLiteracyLevel: LiteracyLevel;
    retryCount: number;
    timestamp: Date | null;
}

export interface ConsentLog {
    id: string;
    userName: string;
    location: string;
    timestamp: string;
    language: Language;
    comprehensionScore: number;
    status: VerificationStatus;
    retryCount: number;
    consentType: ConsentType;
}

export interface MetricCard {
    icon: string;
    value: string;
    label: string;
    trend?: string;
    trendDirection?: 'up' | 'down';
}

export interface RegionData {
    state: string;
    avgScore: number;
}

export interface HumanReviewCase {
    id: string;
    userName: string;
    userInitials: string;
    issue: string;
    waitTime: string;
    language: Language;
    priority: 'high' | 'medium' | 'low';
}
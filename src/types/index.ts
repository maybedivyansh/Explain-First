export type ConsentState = 'idle' | 'explaining' | 'checking' | 'verified' | 'failed';

export interface ConsentFlowProps {
    onComplete?: (success: boolean, data: unknown) => void;
}
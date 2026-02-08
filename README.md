# ExplainFirst 🇮🇳

**Understand. Then Sign.**

ExplainFirst (formerly DocSahayak) is a Next.js application designed to help the 287 million Indians who cannot read complex legal documents. It uses AI to explain documents in simple language (Hindi, Tamil, Telugu, Bengali, Marathi, English) and provides audio readouts using Text-to-Speech.

## Features

-   **Multi-Language Support**: Explanations in 6+ Indian languages.
-   **Audio Explanations (New)**: Listen to the summary in your native language powered by ElevenLabs.
-   **Gov-Tech Aesthetic**: Clean, accessible, and trustworthy UI.
-   **Document Analysis**: Automated breakdown of Loan Agreements, Insurance Policies, etc., using **Gemini 2.5 Flash**.
-   **Key Points & Warnings**: Highlights critical information and red flags.
-   **Persistent Storage**: Documents and generated audio summaries are stored securely in Supabase.
-   **Secure**: Built with Supabase RLS, encryption, and signed URLs for private file access.

## Tech Stack

-   **Framework**: Next.js 14+ (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **Database & Auth**: Supabase
-   **AI Model**: Google Gemini 2.5 Flash (via REST API)
-   **Text-to-Speech**: ElevenLabs API
-   **PDF Processing**: `pdf2json`

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/explainfirst.git
    cd explainfirst
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Copy `.env.example` to `.env.local` and add your credentials:
    ```bash
    cp .env.example .env.local
    ```
    
    You need:
    -   `NEXT_PUBLIC_SUPABASE_URL`
    -   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    -   `GEMINI_API_KEY` (Get from Google AI Studio)
    -   `ELEVENLABS_API_KEY` (Get from ElevenLabs)
    -   `OPENAI_API_KEY` (Optional/Deprecated)

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  **Open in browser**:
    Navigate to [http://localhost:3000](http://localhost:3000).

## Supabase Setup

1.  Create a new Supabase project.
2.  Enable Email/Password and Google Auth providers.
3.  Create a private storage bucket named `user-documents`.
4.  Run the SQL migration in `supabase_schema.sql` to create tables and policies.
5.  **Important**: Run `add_audio_url_migration.sql` to add audio support to the `documents` table.

    **Table: documents**
    - `id`: uuid (PK)
    - `user_id`: uuid (FK to auth.users)
    - `filename`: text
    - `file_path`: text
    - `document_type`: text
    - `language`: text
    - `summary`: text
    - `key_points`: jsonb
    - `warnings`: jsonb
    - `audio_url`: text (Storage path to TTS audio)
    - `created_at`: timestamp
    - `file_size`: bigint
    - `status`: text

## Key Components

-   `/src/app/page.tsx`: Landing page with interactive demo.
-   `/src/app/analyze`: Main document analysis flow.
-   `/src/app/dashboard`: User document history with actions (View, Download, Delete).
-   `/src/app/document/[id]`: Detailed document view with audio player.
-   `/src/lib/tts.ts`: Shared Text-to-Speech utility.

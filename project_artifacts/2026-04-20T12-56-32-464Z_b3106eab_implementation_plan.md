# Premium F1 AI-Powered Web Application

This project will create a state-of-the-art, secure web application focused on Formula 1. It will pull comprehensive historical and current F1 data via the Jolpica API and augment it with AI capabilities to provide unique insights, analysis, or conversational interactions.

## User Review Required

> [!IMPORTANT]
> Please review the framework and architecture choices:
> - **Framework**: Next.js (React) for a seamless full-stack experience (frontend + backend API routes). This allows us to hide API keys and secure data on the server.
> - **Styling**: Vanilla CSS / CSS Modules with a premium, dynamic F1-inspired aesthetic (dark mode, glassmorphism, vibrant racing red accents, modern typography, and smooth micro-animations).
> - **Workspace**: The project will be created in `C:\Users\samph\.gemini\antigravity\scratch\f1-ai-app`.

## Open Questions

> [!WARNING]
> I need your input on a few critical design decisions before we start building:
> 1. **AI Functionality**: What specific AI features do you envision? (e.g., an F1 Assistant Chatbot, natural language search for stats, or AI-generated race summaries/predictions?)
> 2. **AI Provider**: We will need an AI API key (like a Google Gemini API key). Do you have one available, or would you like me to mock the AI responses for now?
> 3. **Security Requirements**: When you say "secure", do you mean implementing user accounts and login (e.g., via NextAuth/Auth.js), or do you mean secure API practices (rate limiting, secure headers, data validation)? If login is needed, which providers should we support (Google, GitHub, credentials)?

## Proposed Changes

We will bootstrap a new Next.js project and set up the initial architecture.

### Project Foundation

- Initialize Next.js app in the designated scratch directory.
- Configure `globals.css` with a premium design system (CSS variables for colors, typography, and animations) avoiding TailwindCSS as per guidelines.

### Jolpica API Integration

- Create robust, server-side utility functions in Next.js to securely fetch data from `api.jolpi.ca/ergast/f1/`.

### AI Integration

- Create secure API routes (`/api/ai`) to communicate with the chosen AI provider, keeping keys out of the browser.

### Core Features

- **Dashboard**: A visually stunning landing page showing the latest season standings, upcoming races, and recent results.
- **AI Interface**: The primary UI for the AI-powered features.
- **Security**: Implement robust security headers, input validation, and (if approved) authentication.

## Verification Plan

### Automated Checks
- Run `npm run lint` and `npm run build` to ensure the project compiles correctly and follows best practices.

### Manual Verification
- Start the development server (`npm run dev`).
- Visually inspect the application to ensure the premium UI meets expectations (responsive design, animations, F1 theme).
- Test the Jolpica API data retrieval and the AI integration to verify correct end-to-end functionality.

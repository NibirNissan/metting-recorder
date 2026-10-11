# VoiceBrain - Commercial AI Meeting Assistant & Second Brain

> **Production-grade AI meeting intelligence platform with native bilingual Bengali & English multimodal speech processing, real-time audio streaming, persistent hardware vault synchronization, and executive Second Brain knowledge hub.**

---

## 🎯 Executive Mission & Overview

**VoiceBrain** is an enterprise-ready Voice Meeting Assistant and Personal Second Brain designed for modern executives, product managers, and distributed engineering teams. Operating seamlessly across mobile, desktop, and dedicated IoT hardware (ESP32 Smart Pods), VoiceBrain captures high-fidelity audio, accurately transcribes multi-dialect bilingual speech (Bengali, English, and colloquial Banglish), and synthesizes unstructured conversation into actionable executive summaries, key strategic decisions, and structured task assignments with explicit assignees.

### Core Value Pillars
- **Native Multilingual Speech Intelligence:** Powered by Google's latest multimodal Gemini Flash models with native phonetic understanding of Bengali (`bn-BD`), English (`en-US`), and mixed conversational Banglish.
- **MicroSD Hardware Voice Vault:** Direct synchronization with physical IoT recording hardware, providing dual local-buffer and cloud-persisted recording management.
- **Living Second Brain Memory Hub:** Automatic entity extraction, persistent memory categorization (Client, Project, Deadline, Team, Technical), and semantic recall.
- **In-Meeting Contextual Q&A:** Slide-over meeting intelligence drawer for zero-latency queries directly grounded in verbatim meeting transcripts.
- **Enterprise Super Admin CMS:** Real-time SaaS instrumentation, customizable LLM provider selection, STT/TTS routing, tier packaging, promo code configuration, and ESP32 hardware device registry.

---

## 💻 Tech Stack Breakdown

| Layer | Technologies & Libraries | Role in Architecture |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19, TypeScript 5.8+, Vite 6+ / Next.js Hybrid | Reactive mobile-first single page client with micro-animations and zero-slop UI |
| **Styling & Design** | Tailwind CSS v4, Lucide React, Motion | Dark executive aesthetic, responsive typography, high-contrast states |
| **Backend API Server** | Node.js, Express, TSX Runtime | High-throughput REST API proxy, multipart streaming, JSON document persistence |
| **AI Intelligence Engine** | `@google/genai` SDK (`gemini-3.8-flash`, `gemini-flash-latest`) | Multimodal audio transcription, schema-constrained structured extraction, semantic RAG |
| **Database & Persistence** | Local JSON Document Store & MongoDB-Ready Schema Engine | ACID-compliant file-backed collections (`meetings`, `memories`, `settings`, `sd_recordings`) |
| **Hardware & IoT Gateway** | ESP32 Webhook Ingestion (`/api/gateway/esp32`) | Cryptographically verified token-based audio payload ingestion from portable mic pods |

---

## 🚀 Quickstart & Local Setup Guide

### 1. Prerequisites
- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm` (v10+) or `bun`
- **Gemini API Key**: Obtain a key from [Google AI Studio](https://aistudio.google.com/)

### 2. Clone and Install Dependencies
```bash
# Clone the repository
git clone https://github.com/your-org/voicebrain-ai-assistant.git
cd voicebrain-ai-assistant

# Install project dependencies
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root by copying the template:
```bash
cp .env.example .env
```

Populate the required environment variables:
```env
# Required for Gemini AI multimodal transcription and Q&A reasoning
GEMINI_API_KEY="AIzaSyYourActualKeyHere"

# Application host URL (used for CORS and self-referential links)
APP_URL="http://localhost:3000"

# Server Port (default 3000)
PORT=3000
```

### 4. Run Development Server
```bash
npm run dev
```
The unified development server will launch on `http://localhost:3000`, serving both the Express backend API and the Vite React frontend with Hot Module Replacement.

### 5. Production Build & Deployment
```bash
# Type check and build static frontend bundle
npm run build

# Start the full-stack production server
npm run start
```

---

## ⚙️ Environment Variables Specification

| Variable Name | Required | Default | Description |
| :--- | :---: | :--- | :--- |
| `GEMINI_API_KEY` | **Yes** | — | Google AI Studio API key used for multimodal audio transcription and chat reasoning. |
| `APP_URL` | No | `http://localhost:3000` | Base public URL where the web application is served. |
| `PORT` | No | `3000` | HTTP port on which the Express server listens. |
| `NODE_ENV` | No | `development` | Runtime environment (`development` or `production`). |
| `GEMINI_MODEL` | No | `gemini-3.8-flash` | Primary multimodal model used for audio ingestion. |

---

## 📁 Repository Structure Overview

```
.
├── src/
│   ├── components/            # Isolated UI components (Drawer, Modals, Cards)
│   │   ├── MeetingQaDrawer.tsx   # Slide-over "Ask AI" transcript inspector
│   │   ├── AdminPortalModal.tsx  # Super Admin executive CMS
│   │   └── ...
│   ├── services/              # Client-side API service abstractions
│   │   └── apiClient.ts          # Typed REST client for VoiceBrain backend
│   ├── types/                 # Central TypeScript schemas & contracts
│   │   └── index.ts              # Data models, interfaces, and enums
│   ├── App.tsx                # Main commercial application shell & state machine
│   ├── main.tsx               # Client entry point
│   └── index.css              # Global styles & Tailwind imports
├── data/                      # Persistent JSON document storage
│   ├── meetings.json          # Persisted meeting transcripts & summaries
│   ├── memories.json          # Persistent Second Brain facts & insights
│   ├── sd_recordings.json     # MicroSD hardware recordings metadata
│   └── settings.json          # Global system & admin configuration
├── server.ts                  # Production Express API gateway & Vite server
├── sample_meeting.wav         # Reference bilingual audio recording
├── ARCHITECTURE.md            # In-depth system architecture & data pipeline
├── API_DOCS.md                # Comprehensive REST API contract & schemas
├── AI_CONTEXT_RULES.md        # Architectural rules for future AI coding agents
├── metadata.json              # Platform manifest & capabilities
└── package.json               # Dependencies and build scripts
```

---

## 🔒 Security & Best Practices

- **Zero Client-Side Keys:** All Gemini API invocations are strictly executed server-side via Express routes (`/api/*`). No API secrets are exposed to the client bundle.
- **Cryptographic Hardware Authentication:** Physical ESP32 hardware units must present a valid Bearer token matching the configured `deviceToken` in the Super Admin CMS.
- **Fail-Safe Fallbacks:** Robust local synthesis fallbacks ensure continuous operation even during transient network or model quota limits.
- **Data Protection:** Transcripts and memories are isolated within structured persistent data stores without unauthorized third-party telemetry.

---

## 📄 License
Enterprise Commercial License. Developed with Google AI Studio.

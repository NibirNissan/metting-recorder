# VoiceBrain - System Architecture & Engineering Specifications

This document outlines the architectural blueprints, end-to-end data flow pipelines, state management contracts, and component hierarchy of the **VoiceBrain** platform.

---

## 1. High-Level Architectural Diagram

```
+-----------------------------------------------------------------------------------------+
|                                    INPUT LAYER                                          |
|                                                                                         |
|   +-----------------------+     +-----------------------+     +---------------------+   |
|   |   Live Microphone     |     |   MicroSD Hardware    |     |   ESP32 Smart Pod   |   |
|   |   (Web Audio API /    |     |   Voice Vault         |     |   IoT Gateway       |   |
|   |   MediaRecorder)      |     |   (FatFS / SPI Flash) |     |   (WiFi / HTTP POST)|   |
|   +-----------+-----------+     +-----------+-----------+     +----------+----------+   |
+---------------|-----------------------------|----------------------------|--------------+
                |                             |                            |
                v                             v                            v
+-----------------------------------------------------------------------------------------+
|                                API GATEWAY (server.ts)                                  |
|                                                                                         |
|   - Multipart / Base64 Audio Ingestion (50MB payload limits)                            |
|   - Bearer Authentication for IoT Hardware (ESP32 Token Validation)                     |
|   - Route Handlers: /api/analyze-audio, /api/synthesize-live-meeting, /api/gateway/esp32|
+---------------------------------------------+-------------------------------------------+
                                              |
                                              v
+-----------------------------------------------------------------------------------------+
|                           MULTIMODAL INTELLIGENCE ENGINE                                |
|                                                                                         |
|       +-----------------------------------------------------------------------+         |
|       |                     Google Gemini 3.8 Flash SDK                       |         |
|       |                                                                       |         |
|       |  1. Phonetic Multilingual Transcription (Bengali, English, Banglish)  |         |
|       |  2. Schema-Constrained Extraction (JSON Schema Mode via responseSchema)|        |
|       |  3. Deduplication & Entity Resolution                                 |         |
|       +-----------------------------------+-----------------------------------+         |
+-------------------------------------------|---------------------------------------------+
                                            |
                                            v
+-----------------------------------------------------------------------------------------+
|                          PERSISTENCE & VECTOR SECOND BRAIN                              |
|                                                                                         |
|   +-----------------------+     +-----------------------+     +---------------------+   |
|   |   Meetings Storage    |     |   Second Brain Hub    |     |   Admin CMS Store   |   |
|   |   (data/meetings.json)|     |   (data/memories.json)|     |   (data/settings.json)  |   |
|   |                       |     |                       |     |                     |   |
|   |   - Executive Summary |     |   - Category Fact Base|     |   - LLM Routing     |   |
|   |   - Verbatim Text     |     |   - Tag Indexing      |     |   - Pricing Plans   |   |
|   |   - Action Items      |     |   - Semantic Memory   |     |   - Device Registry |   |
|   +-----------------------+     +-----------------------+     +---------------------+   |
+-------------------------------------------+---------------------------------------------+
                                            |
                                            v
+-----------------------------------------------------------------------------------------+
|                                REACT CLIENT FRONTEND                                    |
|                                                                                         |
|   +------------------+  +-------------------+  +------------------+  +--------------+   |
|   |  Live Assistant  |  |  Hardware Vault   |  |   Second Brain   |  | Meeting Q&A  |   |
|   |  (Waveform Pulse |  |  (Storage Gauge,  |  |   Memory Hub     |  | (1-Tap Slide |   |
|   |  & Real-Time     |  |  Audio Playback,  |  |   (Categorized   |  |  Over Drawer)|   |
|   |  Transcript)     |  |  Sync Manager)    |  |    Knowledge)    |  |              |   |
|   +------------------+  +-------------------+  +------------------+  +--------------+   |
+-----------------------------------------------------------------------------------------+
```

---

## 2. End-to-End Data Flow Pipelines

### Pipeline A: Live Meeting Stream -> Real-Time Synthesis
1. **Audio Capture:** The browser captures mic streams via Web Audio API, chunking speech data and running an animated audio waveform visualizer.
2. **Rolling Transcription:** A bilingual transcription stream simulates/captures real-time utterances in Bengali and English with speaker attribution (`Elena`, `Rahul`, `Sarah`, `David`).
3. **End & Auto-Summarize Trigger:**
   - The user clicks **End & Auto-Summarize**.
   - The client packages the exact cumulative transcript chunks into a single payload.
   - Dispatches `POST /api/synthesize-live-meeting` to the server.
   - The server passes the verbatim transcript to **Gemini 3.8 Flash** with a strict JSON schema contract (`meetingSummarySchema`).
   - The resulting structured response contains:
     - `language_detected`: Identifies dialect (e.g. *"Banglish (Bengali & English)"*).
     - `executive_summary`: High-level strategic briefing.
     - `key_points`: Array of crucial decisions and conclusions.
     - `action_items`: Array of `{ task, assignee, status }` objects.
     - `transcript`: Exact verbatim spoken text.
4. **State Transition:** The client switches from live stream mode to the synthesized **Completed Meeting** card, revealing the single, contextual `[ Ask AI ]` button.

### Pipeline B: MicroSD Voice Vault -> Dual Sync
1. **Hardware Inspection:** Client polls `GET /api/hardware/sd-recordings` to query the MicroSD card capacity, available space, and stored `.wav` audio files.
2. **On-Demand Analysis:** The user clicks **"Analyze AI"** on any unanalyzed recording.
3. **Server-Side Audio Decoding:**
   - Audio buffer is extracted from filesystem or base64 stream.
   - Transmitted directly as an inline data part to Gemini Flash:
     ```typescript
     contents: [
       {
         role: 'user',
         parts: [
           { inlineData: { mimeType: 'audio/wav', data: base64Audio } },
           { text: promptText }
         ]
       }
     ]
     ```
4. **Vault Update:** The recording status transitions from `'ready'` to `'analyzed'`, and the synthesized meeting is saved to `data/meetings.json`.

### Pipeline C: ESP32 IoT Gateway Webhook
1. **Hardware Ingestion:** Portable ESP32 conference badges or microphone pods connect via 2.4GHz WiFi.
2. **Authentication:** ESP32 sends a `POST /api/gateway/esp32` HTTP request with `Authorization: Bearer esp32_hw_...`.
3. **Token Verification:** Server validates against `deviceGateway.deviceToken` configured in `settings.json`.
4. **Queue & Process:** Audio payloads are verified, buffered, and asynchronously dispatched to the transcription queue.

### Pipeline D: Second Brain Semantic Memory Recall & Q&A
1. **Fact Ingestion:** Facts are recorded either manually, via chat interaction (`"Remember this fact..."`), or extracted from completed meetings.
2. **Categorization:** Items are classified under fixed taxonomy:
   - `Client`, `Project`, `Deadline`, `Team`, `Technical`, `Personal`, `General`.
3. **Context Injection:** When querying the Assistant (`/api/chat`) or the Meeting Intelligence Drawer (`/api/meeting-qa`), pertinent memories and meeting transcripts are injected into the Gemini prompt context, achieving zero-hallucination grounded responses.

---

## 3. Frontend Architecture & State Management

The frontend uses a modern, unidirectional state flow combining React hooks with localized persistent caching in `localStorage`.

### State Organization
- **Navigation State:**
  - `activeTab`: `'meetings' | 'memories' | 'assistant' | 'profile'`
  - `meetingsSubView`: `'live' | 'vault' | 'history'` (strict sub-tab separation)
- **Session State:**
  - `isLiveRecording`: Controls recording interval and Web Audio visualization.
  - `liveStreamChunks`: Cumulative array of time-stamped speaker utterances.
  - `result`: Active meeting analysis (`AnalysisResult | null`).
  - `activeMeetingTitle`: Focused meeting label.
- **Hardware Onboarding State:**
  - `onboardingStep`: `'pairing' | 'plan' | 'completed'`
  - `isPaired`, `pairedDeviceId`, `activePlan`.
- **Admin CMS State:**
  - `isAdminPortalOpen`: Controls full-screen superuser configuration console.
  - `systemSettings`: Mirrors `SystemSettings` schema with live editing controls.

---

## 4. Directory & Module Boundaries

```
src/
├── types/
│   └── index.ts               # Core domain entities, DTOs, and contracts
├── services/
│   └── apiClient.ts           # Clean asynchronous API service client
├── components/
│   ├── MeetingQaDrawer.tsx    # Slide-over meeting intelligence drawer
│   └── ...                    # Isolated UI modules
├── App.tsx                    # Top-level shell coordinating sub-views
├── main.tsx                   # React root hydration
└── index.css                  # Tailwind styles and theme setup
```

### Separation of Concerns Rules
1. **No Raw API Fetching in Presentation Components:** All network interactions route through `VoiceBrainApiClient` in `src/services/apiClient.ts`.
2. **Centralized Types:** Components and services import domain interfaces exclusively from `src/types/index.ts`.
3. **Fail-Safe Fallbacks:** Every external API call implements a deterministic error recovery path with graceful user feedback.

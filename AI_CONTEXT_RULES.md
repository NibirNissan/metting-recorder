# VoiceBrain - AI Agent Coding Rules & Context Guidelines

> **CRITICAL INSTRUCTIONS FOR FUTURE AI AGENTS (Cursor, Claude Code, GitHub Copilot, Codex, Windsurf):**  
> Read this document prior to making any architectural modifications, refactorings, or feature implementations. Adherence to these rules is mandatory to prevent functional regressions and code erosion.

---

## 1. Core Architectural Constitution

1. **Strict Client/Server Separation of Secrets:**
   - **NEVER** expose `GEMINI_API_KEY` or any cloud credentials in client-side React code.
   - All AI interactions and hardware endpoints MUST route through `/api/*` endpoints in `server.ts`.
   - Never create user interfaces requesting API keys unless explicitly in the Super Admin CMS.

2. **Server Runtime Environment:**
   - The development server runs on port **3000** (`"dev": "tsx server.ts"`).
   - Express mounts Vite middlewares via `createViteServer({ server: { middlewareMode: true } })`.
   - Production starts with `"start": "tsx server.ts"`.

3. **Strict TypeScript & Zero `any` Discipline:**
   - Always define clear interfaces and types in `src/types/index.ts`.
   - When modifying data structures, update `src/types/index.ts` first, then the backend schema, and finally the frontend components.
   - Do not cast unknown entities with `(x as any)` unless interfacing with legacy third-party untyped window globals.

4. **Preserve Bilingual Bengali & English Multimodal Capabilities:**
   - In all Gemini system prompts, ALWAYS instruct the model to respect and accurately transcribe bilingual Bengali (`bn-BD`), English (`en-US`), and mixed conversational "Banglish".
   - Never enforce translation into English-only unless explicitly requested by the user. Retain verbatim Bengali quotes for authenticity and auditability.

---

## 2. Code Organization & Modularity Rules

1. **Modular Component Hierarchy:**
   - Keep components modular inside `src/components/`.
   - Do not add massive 1000+ line blocks directly into `src/App.tsx`.
   - Large self-contained surfaces (drawers, complex modals, hardware wizards) MUST live in dedicated components under `src/components/`.

2. **API Abstraction Boundary:**
   - Components MUST NOT invoke raw `fetch('/api/...')` directly.
   - All HTTP communication MUST route through the static methods of `VoiceBrainApiClient` in `src/services/apiClient.ts`.
   - If adding a new backend endpoint, add the corresponding typed method to `VoiceBrainApiClient` first.

3. **Clean UI & Styling Conventions (Tailwind CSS v4):**
   - Use standard Tailwind utility classes.
   - Adhere to the established **executive dark mode theme**:
     - Backgrounds: `bg-slate-950`, `bg-slate-900`, `bg-slate-900/90`
     - Borders: `border-slate-800`, `border-slate-800/80`
     - Text: `text-white`, `text-slate-200`, `text-slate-400`
     - Accent: `bg-indigo-600`, `text-indigo-400`, `bg-emerald-500/10 text-emerald-400`
   - Avoid excessive nested wrapper cards. Maintain clean padding and generous breathing room.
   - Do not display internal system IDs, trace logs, or raw JSON in consumer views.

---

## 3. Meeting Page Sub-Tab Integrity (Regression Prevention)

To preserve the clean Meetings UX:
1. **Never Re-introduce the Top Navbar "[ Ask AI ]" Button:**
   - There must be **ONLY ONE** "[ Ask AI ]" button on the Meetings view.
   - It MUST reside strictly inside the **Completed Meeting Transcript/Summary Card**.
   - Clicking it triggers `handleOpenMeetingQa()` for that specific meeting session.

2. **Preserve the Sub-Tab Separation:**
   - **Tab 1: "Live Assistant" (`meetingsSubView === 'live'`):**
     - Renders the Live Stream recorder card (waveform visualizer, mic pulse, 30s rolling transcript).
     - Renders the Completed Meeting Card when a meeting has been analyzed.
     - **NEVER** render the Hardware SD Card Vault card in this sub-tab.
   - **Tab 2: "Hardware SD Vault" (`meetingsSubView === 'vault'`):**
     - Renders the MicroSD storage gauge and the list of physical `.wav` recordings with Play / Delete / Analyze actions.
   - **Tab 3: "History" (`meetingsSubView === 'history'`):**
     - Searchable catalog of archived past meetings.

3. **Live Auto-Summarization Data Integrity:**
   - In `stopAndAutoSummarizeLiveMeeting()`, always pass the **exact rolling transcribed text** to `/api/synthesize-live-meeting`.
   - Never substitute with outdated static mock text.

---

## 4. Hardware Gateway & IoT Protocol Rules

1. **ESP32 Authentication:**
   - Any request to `/api/gateway/esp32` must be validated against `deviceGateway.deviceToken` in `data/settings.json`.
   - Return `401 Unauthorized` if the token is missing or invalid.

2. **MicroSD Vault Persistence:**
   - Keep `data/sd_recordings.json` and `data/meetings.json` synchronized when a recording is analyzed.
   - Mark `status: 'analyzed'` and link the newly generated meeting ID.

---

## 5. Verification Protocol Before Completing Tasks

Before concluding any code changes, every AI agent MUST execute:
1. `npm run lint` (or `tsc --noEmit`) to verify zero TypeScript errors.
2. `compile_applet` to verify clean bundle build without syntax regressions.
3. Verify that server routes start and JSON files in `data/` remain valid JSON.

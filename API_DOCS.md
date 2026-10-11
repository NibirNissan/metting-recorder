# VoiceBrain - REST API Specification & Endpoint Contracts

This document provides the complete API specification for the VoiceBrain platform, covering multimodal audio ingestion, meeting intelligence, memory hub persistence, IoT hardware gateway webhooks, and administrative configuration.

**Base URL:** `http://localhost:3000` (or configured `APP_URL`)  
**Standard Data Format:** `application/json` (Payload limit: 50MB)  
**Standard Authentication:** Session cookies / Optional Bearer token for IoT hardware (`Authorization: Bearer <token>`)

---

## 1. Audio Processing & Transcription

### `POST /api/analyze-audio`
Transcribes and extracts executive summaries, key decisions, and action items from audio recordings using Google Gemini Flash.

#### Request Headers
| Header | Value | Description |
| :--- | :--- | :--- |
| `Content-Type` | `application/json` | JSON with base64 audio payload |

#### Request Body
```json
{
  "audioBase64": "UklGRi4AAABXQVZFZm10IBAAAAABAAEA...",
  "mimeType": "audio/wav",
  "fileName": "standup_meeting.wav",
  "useSample": false,
  "systemInstruction": "Optional custom system instructions",
  "promptText": "Optional custom prompt"
}
```

#### Response `200 OK`
```json
{
  "result": {
    "language_detected": "Banglish (Bengali & English)",
    "transcript": "Elena: আজকের স্প্রিন্টে Redis latency issue নিয়ে আলোচনা করতে হবে...\nRahul: হ্যাঁ, আমি অলরেডি caching layer অপ্টিমাইজ করেছি।",
    "executive_summary": "Sprint 42 sync reviewing Redis caching improvements and API response latency reduction.",
    "key_points": [
      "Redis memory allocation updated to 8GB",
      "P99 latency decreased from 420ms to 85ms",
      "Production deployment scheduled for Thursday 10:00 PM"
    ],
    "action_items": [
      {
        "task": "Deploy updated Redis caching config to staging",
        "assignee": "Rahul"
      },
      {
        "task": "Review monitoring dashboards in Datadog",
        "assignee": "Elena"
      }
    ]
  },
  "meta": {
    "fileName": "standup_meeting.wav",
    "mimeType": "audio/wav",
    "modelUsed": "gemini-3.8-flash",
    "processedAt": "2026-10-08T17:42:00.000Z",
    "processingTimeSeconds": 2.41
  }
}
```

---

### `POST /api/synthesize-live-meeting`
Synthesizes verbatim live streaming text chunks into structured executive intelligence.

#### Request Body
```json
{
  "transcript": "Elena: আমাদের পেমেন্ট গেটওয়ে ইন্টিগ্রেশন শেষ করতে হবে...\nDavid: bKash and Nagad webhooks are passing test suites.",
  "title": "Sprint 42: Core Architecture & Live Demo",
  "chunks": [
    {
      "second": 5,
      "speaker": "Elena",
      "text": "আমাদের পেমেন্ট গেটওয়ে ইন্টিগ্রেশন শেষ করতে হবে",
      "lang": "bn"
    }
  ]
}
```

#### Response `200 OK`
```json
{
  "result": {
    "language_detected": "Banglish (Bengali & English)",
    "transcript": "Elena: আমাদের পেমেন্ট গেটওয়ে ইন্টিগ্রেশন শেষ করতে হবে...",
    "executive_summary": "Finalized payment gateway milestone and verified webhook reliability.",
    "key_points": [
      "bKash and Nagad webhooks verified",
      "Security audit passed"
    ],
    "action_items": [
      {
        "task": "Run end-to-end sandbox settlement test",
        "assignee": "David"
      }
    ]
  },
  "meta": {
    "fileName": "live_session_stream.wav",
    "mimeType": "audio/live-stream",
    "modelUsed": "gemini-3.8-flash",
    "processedAt": "2026-10-08T17:45:00.000Z",
    "processingTimeSeconds": 1.82
  }
}
```

---

## 2. Second Brain & Memory Hub

### `GET /api/memories`
Retrieves all persistent facts, decisions, and knowledge notes.

#### Response `200 OK`
```json
{
  "memories": [
    {
      "id": "mem-101",
      "content": "Client prefers weekly milestone releases on Thursdays.",
      "category": "Client",
      "tags": ["Acme Corp", "Schedule"],
      "createdAt": "2026-10-08T10:00:00.000Z",
      "source": "meeting_extracted",
      "pinned": true
    }
  ]
}
```

### `POST /api/memories`
Creates a new atomic memory item.

#### Request Body
```json
{
  "content": "bKash MFS sandbox merchant ID is 01700000000",
  "category": "Technical",
  "tags": ["bKash", "API", "Credentials"],
  "pinned": false,
  "source": "manual"
}
```

#### Response `200 OK`
```json
{
  "memory": {
    "id": "mem-1728409200000",
    "content": "bKash MFS sandbox merchant ID is 01700000000",
    "category": "Technical",
    "tags": ["bKash", "API", "Credentials"],
    "createdAt": "2026-10-08T17:40:00.000Z",
    "source": "manual",
    "pinned": false
  },
  "count": 14
}
```

### `DELETE /api/memories/:id`
Deletes a memory by unique ID.

#### Response `200 OK`
```json
{
  "success": true,
  "count": 13
}
```

---

## 3. Meeting Intelligence & Q&A

### `POST /api/meeting-qa`
Executes targeted Q&A directly grounded against a specific meeting transcript.

#### Request Body
```json
{
  "question": "What did Rahul promise regarding the Redis latency?",
  "meetingContext": {
    "title": "Sprint 42 Architecture Review",
    "transcript": "Rahul: হ্যাঁ, আমি অলরেডি caching layer অপ্টিমাইজ করেছি। লেটেন্সি কমে ৮৫ms-এ নেমে এসেছে।",
    "executive_summary": "Sprint review on latency reduction.",
    "key_points": ["P99 latency down to 85ms"],
    "action_items": [
      { "task": "Verify staging Redis cluster", "assignee": "Rahul" }
    ]
  },
  "history": []
}
```

#### Response `200 OK`
```json
{
  "reply": "According to the transcript, Rahul confirmed that he optimized the caching layer, successfully dropping response latency down to 85ms. He is also assigned to verify the staging cluster before release.",
  "citations": ["Rahul: হ্যাঁ, আমি অলরেডি caching layer অপ্টিমাইজ করেছি..."]
}
```

---

### `POST /api/chat`
General Second Brain assistant chat incorporating both user memories and past meetings into contextual retrieval.

#### Request Body
```json
{
  "message": "When is our next payment gateway milestone?",
  "history": [],
  "memories": [],
  "meetings": []
}
```

#### Response `200 OK`
```json
{
  "reply": "Based on your project memories and Sprint 42 meeting, the payment gateway integration with bKash and Nagad is scheduled for final sandbox settlement tests this Thursday.",
  "source": "ai",
  "newMemory": null
}
```

---

## 4. Hardware Gateway (ESP32 Smart Pod)

### `POST /api/gateway/esp32`
Ingests audio buffers and telemetry from physical ESP32 microphone pods.

#### Request Headers
| Header | Value | Description |
| :--- | :--- | :--- |
| `Authorization` | `Bearer esp32_hw_7a9f3b1e84c20d65` | Device gateway token matching `settings.json` |
| `Content-Type` | `application/json` | Encoded audio payload |

#### Request Body
```json
{
  "deviceId": "ESP-7721",
  "timestamp": "2026-10-08T17:42:00Z",
  "audioBase64": "UklGRi4AAABXQVZF...",
  "sampleRate": 16000,
  "format": "wav",
  "batteryPercent": 88,
  "firmwareVersion": "v1.4.2",
  "wifiRssi": -58
}
```

#### Response `200 OK`
```json
{
  "status": "success",
  "timestamp": "2026-10-08T17:42:01.000Z",
  "message": "ESP32 audio payload accepted and queued for multimodal synthesis",
  "receivedBytes": 482104
}
```

#### Response `401 Unauthorized`
```json
{
  "error": "Unauthorized: Invalid ESP32 Device Gateway Token"
}
```

---

## 5. Super Admin CMS & Settings

### `GET /api/settings`
Returns global system configuration including active LLM parameters, pricing packages, promo codes, and hardware registry.

#### Response `200 OK`
```json
{
  "settings": {
    "llm": {
      "activeProvider": "gemini",
      "selectedModel": "gemini-3.8-flash",
      "temperature": 0.2
    },
    "deviceGateway": {
      "esp32Enabled": true,
      "deviceToken": "esp32_hw_7a9f3b1e84c20d65",
      "audioSampleRate": 16000,
      "autoTranscribe": true
    },
    "packages": {
      "starter": { "name": "Starter Free", "priceBdt": 0 },
      "pro": { "name": "Pro Executive", "priceBdt": 499 },
      "business": { "name": "Business Power", "priceBdt": 1499 }
    },
    "promos": [
      { "code": "LAUNCH50", "discountPercent": 50, "active": true }
    ],
    "registry": [
      {
        "serial": "XZ-8842",
        "email": "dreamcrafter99@gmail.com",
        "plan": "pro",
        "status": "online",
        "battery": 94
      }
    ]
  }
}
```

### `POST /api/settings`
Updates system configuration.

#### Request Body
```json
{
  "llm": {
    "selectedModel": "gemini-3.8-flash",
    "temperature": 0.15
  }
}
```

#### Response `200 OK`
```json
{
  "settings": { ... },
  "message": "Settings saved successfully"
}
```

### `POST /api/settings/generate-token`
Generates a new secure random device token for ESP32 hardware authentication.

#### Response `200 OK`
```json
{
  "token": "esp32_hw_9c3a1e84f02d71b5"
}
```

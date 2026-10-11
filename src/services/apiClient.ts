/**
 * VoiceBrain - Typed API Client Service
 * 
 * Centralized service module providing typed asynchronous methods
 * for all VoiceBrain REST endpoints, AI processing pipelines, and
 * hardware gateway communication.
 */

import type {
  MeetingItem,
  MemoryItem,
  SystemSettings,
  SDCardRecording,
  SDCardStatus,
  AnalysisResult,
  MetaInfo,
  LiveStreamChunk,
  Esp32GatewayPayload,
  Esp32GatewayResponse,
} from '../types';

export class VoiceBrainApiClient {
  /**
   * Transcribe and synthesize audio through Gemini Multimodal Speech pipeline
   */
  static async analyzeAudio(formData: FormData): Promise<{
    result: AnalysisResult;
    meta: MetaInfo;
  }> {
    const res = await fetch('/api/analyze-audio', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Audio analysis failed with status ${res.status}`);
    }
    return res.json();
  }

  /**
   * Synthesize real-time streaming transcript chunks into structured meeting intelligence
   */
  static async synthesizeLiveMeeting(params: {
    transcript: string;
    title?: string;
    chunks?: LiveStreamChunk[];
  }): Promise<{
    result: AnalysisResult;
    meta: MetaInfo;
  }> {
    const res = await fetch('/api/synthesize-live-meeting', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Live meeting synthesis failed (${res.status})`);
    }
    return res.json();
  }

  /**
   * Fetch pre-recorded or mock audio sample
   */
  static async getSampleAudio(): Promise<Blob> {
    const res = await fetch('/api/sample-audio');
    if (!res.ok) throw new Error('Failed to load sample audio');
    return res.blob();
  }

  /**
   * Retrieve all saved meeting intelligence sessions
   */
  static async getMeetings(): Promise<MeetingItem[]> {
    const res = await fetch('/api/meetings');
    if (!res.ok) throw new Error('Failed to fetch meetings');
    return res.json();
  }

  /**
   * Persist a new or updated meeting session
   */
  static async saveMeeting(meeting: MeetingItem): Promise<MeetingItem> {
    const res = await fetch('/api/meetings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meeting),
    });
    if (!res.ok) throw new Error('Failed to save meeting');
    return res.json();
  }

  /**
   * Delete a meeting session by unique ID
   */
  static async deleteMeeting(id: string): Promise<void> {
    const res = await fetch(`/api/meetings/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete meeting');
  }

  /**
   * Retrieve all persistent Second Brain memories
   */
  static async getMemories(): Promise<MemoryItem[]> {
    const res = await fetch('/api/memories');
    if (!res.ok) throw new Error('Failed to fetch memories');
    return res.json();
  }

  /**
   * Add a new atomic memory fact or insight
   */
  static async saveMemory(memory: Partial<MemoryItem>): Promise<MemoryItem> {
    const res = await fetch('/api/memories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memory),
    });
    if (!res.ok) throw new Error('Failed to save memory');
    return res.json();
  }

  /**
   * Delete a persistent memory item
   */
  static async deleteMemory(id: string): Promise<void> {
    const res = await fetch(`/api/memories/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete memory');
  }

  /**
   * Send a contextual chat query to the Second Brain Assistant
   */
  static async sendChatMessage(payload: {
    message: string;
    history?: { sender: string; text: string }[];
    memories?: MemoryItem[];
    meetings?: MeetingItem[];
  }): Promise<{
    reply: string;
    source: string;
    newMemory?: MemoryItem;
  }> {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Chat request failed');
    return res.json();
  }

  /**
   * Ask targeted questions against a specific meeting transcript & decisions
   */
  static async queryMeetingIntelligence(payload: {
    question: string;
    meetingContext: {
      title: string;
      transcript: string;
      executive_summary: string;
      key_points?: string[];
      action_items?: { task: string; assignee: string }[];
    };
    history?: { sender: string; text: string }[];
  }): Promise<{
    reply: string;
    citations?: string[];
  }> {
    const res = await fetch('/api/meeting-qa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Meeting intelligence Q&A failed');
    return res.json();
  }

  /**
   * Retrieve hardware MicroSD recordings vault and status
   */
  static async getSdRecordings(): Promise<{
    status: SDCardStatus;
    recordings: SDCardRecording[];
  }> {
    const res = await fetch('/api/hardware/sd-recordings');
    if (!res.ok) throw new Error('Failed to fetch SD recordings');
    return res.json();
  }

  /**
   * Delete a recording from the hardware MicroSD vault
   */
  static async deleteSdRecording(id: string): Promise<void> {
    const res = await fetch(`/api/hardware/sd-recordings/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete SD recording');
  }

  /**
   * Retrieve global system configuration (Admin CMS)
   */
  static async getSettings(): Promise<SystemSettings> {
    const res = await fetch('/api/settings');
    if (!res.ok) throw new Error('Failed to fetch system settings');
    return res.json();
  }

  /**
   * Update global system configuration (Admin CMS)
   */
  static async saveSettings(settings: SystemSettings): Promise<{ success: boolean }> {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    if (!res.ok) throw new Error('Failed to save settings');
    return res.json();
  }

  /**
   * Generate an automated cryptographic ESP32 device token
   */
  static async generateGatewayToken(): Promise<{ token: string }> {
    const res = await fetch('/api/settings/generate-token', {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to generate token');
    return res.json();
  }

  /**
   * ESP32 Gateway Webhook endpoint
   */
  static async postEsp32Gateway(payload: Esp32GatewayPayload): Promise<Esp32GatewayResponse> {
    const res = await fetch('/api/gateway/esp32', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Gateway sync failed');
    return res.json();
  }

  /**
   * Fetch pre-configured real-time Bengali/English meeting simulation chunks
   */
  static async getPresetChunks(): Promise<{
    chunks: LiveStreamChunk[];
    fullSynthesis: AnalysisResult;
  }> {
    const res = await fetch('/api/live-stream/preset-chunks');
    if (!res.ok) throw new Error('Failed to fetch simulation chunks');
    return res.json();
  }
}

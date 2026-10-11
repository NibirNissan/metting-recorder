/**
 * VoiceBrain - Production TypeScript Type Definitions
 * 
 * Centralized data models, API request/response contracts,
 * hardware gateway payloads, and persistent entity schemas.
 */

export interface ActionItem {
  task: string;
  assignee: string;
  status?: 'pending' | 'in-progress' | 'done';
}

export interface AnalysisResult {
  language_detected: string;
  transcript: string;
  executive_summary: string;
  key_points: string[];
  action_items: ActionItem[];
}

export interface MetaInfo {
  fileName: string;
  mimeType: string;
  modelUsed: string;
  processedAt: string;
  processingTimeSeconds?: number;
}

export interface MeetingItem {
  id: string;
  title: string;
  createdAt: string;
  fileName: string;
  language_detected: string;
  executive_summary: string;
  transcript: string;
  key_points: string[];
  action_items: ActionItem[];
  modelUsed: string;
  audioUrl?: string | null;
  isStarred?: boolean;
}

export type MemoryCategory =
  | 'Client'
  | 'Project'
  | 'Deadline'
  | 'Personal'
  | 'Team'
  | 'Technical'
  | 'General';

export interface MemoryItem {
  id: string;
  content: string;
  category: MemoryCategory;
  tags: string[];
  createdAt: string;
  source: 'manual' | 'chat_remember' | 'meeting_extracted';
  pinned?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?:
    | 'ai'
    | 'memory_saved'
    | 'memory_fallback'
    | 'meeting_fallback'
    | 'fallback'
    | 'meeting_transcript';
  category?: string;
  newMemory?: MemoryItem;
}

export interface SDCardRecording {
  id: string;
  fileName: string;
  duration: string;
  durationSeconds: number;
  sizeMb: number;
  recordedAt: string;
  timestampIso: string;
  status: 'ready' | 'analyzed';
  audioUrl?: string;
  previewContext?: string;
  synced?: boolean;
}

export interface SDCardStatus {
  cardName: string;
  capacityGb: number;
  freeGb: number;
  usedMb: number;
  syncState: string;
  syncProtocol: string;
  health: string;
}

export interface PackageTier {
  name: string;
  priceBdt: number;
  storage: string;
  features: string[];
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  active: boolean;
}

export interface RegisteredDevice {
  serial: string;
  email: string;
  plan: 'starter' | 'pro' | 'business';
  status: 'online' | 'idle' | 'offline';
  battery: number;
  lastPing: string;
}

export type LLMProviderId =
  | 'gemini'
  | 'openai'
  | 'anthropic'
  | 'groq'
  | 'deepseek'
  | 'custom';

export interface TierLLMConfig {
  provider: LLMProviderId;
  model: string;
  apiKey: string;
  useGlobalKey: boolean;
  temperature: number;
  maxTokens: number;
  customEndpoint?: string;
}

export interface TieredLLMSettings {
  starter: TierLLMConfig;
  pro: TierLLMConfig;
  business: TierLLMConfig;
  systemPrompt: string;
  // Legacy fields for backward compatibility
  activeProvider?: string;
  selectedModel?: string;
  geminiApiKey?: string;
  openaiApiKey?: string;
  temperature?: number;
}

export type STTProviderId =
  | 'gemini-native'
  | 'whisper'
  | 'deepgram'
  | 'groq-whisper'
  | 'custom';

export type TTSProviderId =
  | 'elevenlabs'
  | 'openai-tts'
  | 'google-cloud-tts'
  | 'azure-speech'
  | 'custom';

export interface VoiceEngineSettings {
  sttProvider: STTProviderId;
  sttModel: string;
  sttApiKey: string;
  sttEndpointUrl?: string;
  ttsProvider: TTSProviderId;
  ttsModel?: string;
  ttsVoiceId: string;
  ttsApiKey: string;
  ttsEndpointUrl?: string;
}

export interface SystemSettings {
  llm: TieredLLMSettings;
  voice: VoiceEngineSettings;
  storage: {
    provider: 'cloudflare-r2' | 'aws-s3';
    bucketName: string;
    endpointUrl: string;
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
  };
  deviceGateway: {
    esp32Enabled: boolean;
    gatewayUrl: string;
    deviceToken: string;
    audioSampleRate: number;
    autoTranscribe: boolean;
  };
  packages: {
    starter: PackageTier;
    pro: PackageTier;
    business: PackageTier;
  };
  promos: PromoCode[];
  registry: RegisteredDevice[];
}

export type OnboardingStep = 'pairing' | 'plan' | 'completed';

export type NavTab = 'meetings' | 'memories' | 'assistant' | 'profile';

export type MeetingsSubView = 'live' | 'vault' | 'history';

export interface LiveStreamChunk {
  second: number;
  speaker: string;
  text: string;
  lang: 'bn' | 'en' | 'banglish';
}

export interface Esp32GatewayPayload {
  deviceId: string;
  timestamp: string;
  audioBase64?: string;
  audioUrl?: string;
  sampleRate?: number;
  format?: 'wav' | 'pcm' | 'mp3';
  batteryPercent?: number;
  firmwareVersion?: string;
  wifiRssi?: number;
}

export interface Esp32GatewayResponse {
  success: boolean;
  jobId: string;
  status: 'queued' | 'transcribed' | 'error';
  meetingId?: string;
  message?: string;
}

/**
 * Standalone Voice Meeting Assistant Script (Step 1)
 * Powered by Google Gemini Flash & @google/genai SDK
 *
 * Transcribes Bengali / English / Banglish voice recordings
 * and extracts executive summaries, key points, and action items as structured JSON.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI, Type } from '@google/genai';
import 'dotenv/config';

// Resolve current directory for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Supported Audio MIME mappings
const MIME_MAP = {
  '.mp3': 'audio/mp3',
  '.wav': 'audio/wav',
  '.m4a': 'audio/m4a',
  '.aac': 'audio/aac',
  '.ogg': 'audio/ogg',
  '.flac': 'audio/flac',
  '.webm': 'audio/webm',
};

/**
 * Validates audio file extension and returns proper MIME type
 */
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeType = MIME_MAP[ext];
  if (!mimeType) {
    const supported = Object.keys(MIME_MAP).join(', ');
    throw new Error(
      `Unsupported audio format "${ext}". Supported extensions: ${supported}`
    );
  }
  return mimeType;
}

/**
 * Schema definition for structured JSON output
 */
const meetingSummarySchema = {
  type: Type.OBJECT,
  properties: {
    language_detected: {
      type: Type.STRING,
      description: "Detected spoken language(s), e.g., 'Bengali', 'English', or 'Banglish (Bengali & English)'",
    },
    transcript: {
      type: Type.STRING,
      description: "Full accurate verbatim transcript preserving original spoken Bengali, English, or Banglish words.",
    },
    executive_summary: {
      type: Type.STRING,
      description: "Concise executive summary capturing the core purpose and outcomes of the meeting.",
    },
    key_points: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "Key points, major topics discussed, and critical decisions made.",
    },
    action_items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          task: {
            type: Type.STRING,
            description: "Description of the specific action item or task to be performed.",
          },
          assignee: {
            type: Type.STRING,
            description: "Name of the person assigned or 'unassigned' if not specified in the conversation.",
          },
        },
        required: ['task', 'assignee'],
      },
      description: "List of actionable tasks and their designated owners.",
    },
  },
  required: ['language_detected', 'transcript', 'executive_summary', 'key_points', 'action_items'],
};

// Global default instructions for audio transcription and executive summarization
export const DEFAULT_SYSTEM_INSTRUCTION =
  'You are an expert executive meeting assistant. Listen to the audio carefully. ' +
  'First, transcribe everything accurately (retaining original language whether Bengali, English, or Banglish). ' +
  'Then, extract the key points, decisions, and action items.';

export const DEFAULT_PROMPT_TEXT =
  'Please listen to this voice meeting recording. Transcribe the conversation completely, ' +
  'preserving Bengali, English, or Banglish phrases. Extract the executive summary, key points, ' +
  'and action items with their respective assignees in the required JSON schema.';

/**
 * Main meeting analysis function
 * @param {string} audioFilePath - Path to local audio file (.mp3, .wav, .m4a, etc.)
 */
export async function analyzeMeetingAudio(audioFilePath) {
  // Validate API key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'MY_GEMINI_API_KEY') {
    throw new Error(
      'GEMINI_API_KEY is missing or invalid. Please set GEMINI_API_KEY in your .env file.'
    );
  }

  // Validate File Existence
  const resolvedPath = path.resolve(process.cwd(), audioFilePath);
  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`Audio file not found at path: ${resolvedPath}`);
  }

  const fileStats = fs.statSync(resolvedPath);
  const fileSizeMB = (fileStats.size / (1024 * 1024)).toFixed(2);
  const mimeType = getMimeType(resolvedPath);

  console.log(`\n🎧 [Voice Meeting Assistant] Processing: ${path.basename(resolvedPath)}`);
  console.log(`   Format: ${mimeType} | Size: ${fileSizeMB} MB`);

  // Read local file into Base64
  console.log('   Reading audio bytes into memory...');
  const audioBuffer = fs.readFileSync(resolvedPath);
  const base64Audio = audioBuffer.toString('base64');

  // Initialize official Google GenAI SDK
  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Primary and fallback models for high-availability
  const candidateModels = [
    process.env.GEMINI_MODEL || 'gemini-3.8-flash',
    'gemini-flash-latest',
  ];

  const systemInstruction =
    'You are an expert executive meeting assistant. Listen to the audio carefully. ' +
    'First, transcribe everything accurately (retaining original language whether Bengali, English, or Banglish). ' +
    'Then, extract the key points, decisions, and action items.';

  const promptText =
    'Please listen to this voice meeting recording. Transcribe the conversation completely, ' +
    'preserving Bengali, English, or Banglish phrases. Extract the executive summary, key points, ' +
    'and action items with their respective assignees in the required JSON schema.';

  let lastError;
  let response;
  let modelUsed = candidateModels[0];

  for (const currentModel of candidateModels) {
    let attempts = 0;
    const maxAttempts = 2;
    let modelSuccess = false;

    console.log(`   Calling Gemini model: ${currentModel}...`);
    while (attempts < maxAttempts) {
      try {
        attempts++;
        response = await ai.models.generateContent({
          model: currentModel,
          contents: [
            {
              inlineData: {
                mimeType,
                data: base64Audio,
              },
            },
            {
              text: promptText,
            },
          ],
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: meetingSummarySchema,
          },
        });
        modelUsed = currentModel;
        modelSuccess = true;
        break;
      } catch (err) {
        lastError = err;
        const isTransient =
          err.status === 503 ||
          err.status === 429 ||
          err.status === 404 ||
          (err.message && (err.message.includes('503') || err.message.includes('404')));

        if (isTransient && attempts < maxAttempts) {
          const delayMs = attempts * 1500;
          console.warn(`   ⚠️ Model ${currentModel} returned ${err.status || 'transient error'}. Retrying in ${delayMs / 1000}s...`);
          await new Promise((res) => setTimeout(res, delayMs));
        } else {
          break;
        }
      }
    }

    if (modelSuccess) {
      break;
    }
  }

  if (!response && lastError) {
    throw lastError;
  }

  // Parse and validate the response
  const rawText = response.text?.trim();
  if (!rawText) {
    throw new Error('Received empty response from Gemini API.');
  }

  let structuredData;
  try {
    structuredData = JSON.parse(rawText);
  } catch (parseError) {
    throw new Error(`Failed to parse model output as JSON: ${parseError.message}\nRaw output: ${rawText}`);
  }

  return {
    meta: {
      fileName: path.basename(resolvedPath),
      fileSizeMB: Number(fileSizeMB),
      mimeType,
      modelUsed,
      processedAt: new Date().toISOString(),
    },
    data: structuredData,
  };
}

// CLI Execution Entry Point
async function main() {
  const args = process.argv.slice(2);
  let audioFile = args[0];

  // Help flag
  if (audioFile === '--help' || audioFile === '-h') {
    console.log(`
Usage:
  node index.js <path-to-audio-file>

Examples:
  node index.js sample_meeting.mp3
  node index.js sample_meeting.wav
  node index.js /path/to/my_discussion.m4a

Environment Variables:
  GEMINI_API_KEY  (required) Your Google Gemini API Key
  GEMINI_MODEL    (optional) Default: gemini-3.8-flash
`);
    process.exit(0);
  }

  // Fallback to sample file if no argument provided
  if (!audioFile) {
    const candidates = ['sample_meeting.mp3', 'sample_meeting.wav', 'sample_meeting.m4a'];
    for (const cand of candidates) {
      if (fs.existsSync(path.resolve(process.cwd(), cand))) {
        audioFile = cand;
        console.log(`ℹ️  No file specified. Defaulting to detected sample: "${cand}"`);
        break;
      }
    }
  }

  if (!audioFile) {
    console.error('❌ Error: Please provide an audio file path as an argument.');
    console.log('   Example: node index.js sample_meeting.mp3');
    console.log('   Run "node index.js --help" for options.');
    process.exit(1);
  }

  try {
    const startTime = Date.now();
    const result = await analyzeMeetingAudio(audioFile);
    const durationSec = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('\n======================================================');
    console.log('✨ [AI Voice Meeting Assistant - Structured Output]');
    console.log(`⏱️ Completed in ${durationSec}s`);
    console.log('======================================================\n');

    // Pretty-print JSON output
    console.log(JSON.stringify(result.data, null, 2));

    // Optional: save output to <audio_filename>.summary.json
    const outputFilename = `${audioFile}.summary.json`;
    fs.writeFileSync(outputFilename, JSON.stringify(result.data, null, 2), 'utf-8');
    console.log(`\n💾 Saved structured summary to: ${outputFilename}`);
  } catch (error) {
    console.error('\n❌ Error executing Voice Meeting Assistant:');
    console.error(`   ${error.message}`);
    process.exit(1);
  }
}

// Only invoke main when run directly from CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

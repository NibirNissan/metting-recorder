import React from 'react';
import { Sparkles, X, Copy, Brain, RefreshCw, Send } from 'lucide-react';

interface MeetingQaMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface MeetingQaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeMeetingTitle: string;
  messages: MeetingQaMessage[];
  isLoading: boolean;
  input: string;
  onInputChange: (val: string) => void;
  onSendMessage: (customPrompt?: string) => void;
  onCopy: (text: string, id: string) => void;
  copiedId: string | null;
  onSaveInsightToMemory: (text: string) => void;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

export const MeetingQaDrawer: React.FC<MeetingQaDrawerProps> = ({
  isOpen,
  onClose,
  activeMeetingTitle,
  messages,
  isLoading,
  input,
  onInputChange,
  onSendMessage,
  onCopy,
  copiedId,
  onSaveInsightToMemory,
  bottomRef,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-full sm:max-w-md md:max-w-lg bg-black/95 backdrop-blur-2xl border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.95)] h-full flex flex-col z-10 animate-fade-in text-zinc-100">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/15 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_0_15px_rgba(255,255,255,0.06)]">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white tracking-tight truncate">Meeting Intelligence Q&amp;A</h3>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-white/5 text-zinc-300 border border-white/10 flex-shrink-0">
                  Verbatim Grounded
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                {activeMeetingTitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0 ml-2"
            aria-label="Close Q&A Drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Pre-Suggested Quick Prompts with Zero Scrollbars */}
        <div className="p-3 bg-zinc-950/80 border-b border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[10px] text-zinc-400 font-semibold uppercase tracking-wider px-1">
            <span>Quick Prompts for this Transcript</span>
            <span className="text-white font-mono font-medium">1-Tap AI</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 text-[11px] scrollbar-none no-scrollbar">
            <button
              type="button"
              onClick={() => onSendMessage('Summarize key decisions')}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/30 text-zinc-200 hover:text-white whitespace-nowrap cursor-pointer transition-colors shadow-sm"
            >
              📌 Summarize key decisions
            </button>
            <button
              type="button"
              onClick={() => onSendMessage("List everyone's action items")}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/30 text-zinc-200 hover:text-white whitespace-nowrap cursor-pointer transition-colors shadow-sm"
            >
              📋 List everyone's action items
            </button>
            <button
              type="button"
              onClick={() => onSendMessage('Draft a follow-up email')}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white whitespace-nowrap cursor-pointer transition-colors shadow-sm"
            >
              ✉️ Draft a follow-up email
            </button>
            <button
              type="button"
              onClick={() => onSendMessage('What did Elena report about Redis?')}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white whitespace-nowrap cursor-pointer transition-colors shadow-sm"
            >
              ⚡ Redis &amp; Latency Update
            </button>
          </div>
        </div>

        {/* Conversation Messages Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs scrollbar-none">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}

              <div
                className={`max-w-[88%] rounded-2xl p-4 leading-relaxed shadow-lg ${
                  msg.sender === 'user'
                    ? 'bg-white text-black font-medium border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                    : 'bg-zinc-950/80 border border-white/10 text-zinc-200 backdrop-blur-xl'
                }`}
              >
                <div className="whitespace-pre-line text-xs font-sans">{msg.text}</div>

                {msg.sender === 'assistant' && (
                  <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-white/10 text-[10px] text-zinc-400">
                    <span className="font-mono">{msg.timestamp}</span>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => onCopy(msg.text, msg.id)}
                        className="text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                        title="Copy response"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onSaveInsightToMemory(msg.text)}
                        className="text-zinc-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                        title="Save insight to Second Brain Memory Hub"
                      >
                        <Brain className="w-3 h-3 text-zinc-400" />
                        <span>Save Fact</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2.5 text-xs text-zinc-300 items-center p-3 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-md">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
              <span>Analyzing verbatim transcript and action items...</span>
            </div>
          )}
          <div ref={bottomRef as any} />
        </div>

        {/* Input Bar */}
        <div className="p-3.5 border-t border-white/10 bg-black/95 backdrop-blur-xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSendMessage();
            }}
            className="flex items-center gap-2 bg-zinc-950/90 rounded-full border border-white/15 p-1.5 focus-within:border-white/40 transition-all shadow-lg"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Ask anything about this meeting's transcript..."
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-9 h-9 rounded-full bg-white text-black hover:bg-zinc-200 disabled:opacity-40 cursor-pointer transition-transform active:scale-95 flex items-center justify-center flex-shrink-0 shadow-md shadow-white/10"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

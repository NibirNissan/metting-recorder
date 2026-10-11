import React, { useState } from 'react';
import {
  Brain,
  Radio,
  HardDrive,
  Sparkles,
  Zap,
  ArrowRight,
  Shield,
  Activity,
  Layers,
  Cpu,
  Mic,
  Lock,
  Play,
  Volume2,
  Check,
  ChevronRight,
  Compass,
} from 'lucide-react';
import type { PackageTier, SystemSettings } from '../types';

interface LandingPageProps {
  onConnectHardware: () => void;
  onExploreDemo: () => void;
  onOpenAdmin: () => void;
  systemSettings: SystemSettings;
  activePlan: 'starter' | 'pro' | 'business';
  onSelectPlanTier: (tierKey: 'starter' | 'pro' | 'business') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onConnectHardware,
  onExploreDemo,
  onOpenAdmin,
  systemSettings,
  activePlan,
  onSelectPlanTier,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-black text-zinc-100 flex flex-col selection:bg-white/20 selection:text-white">
      {/* 1. ULTRA-LUXURY OBSIDIAN MONOCHROME HEADER */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-black/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          {/* Brand Logo Zone */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 border border-white/15 text-white shadow-[0_0_20px_rgba(255,255,255,0.08)]">
              <Brain className="w-5 h-5 text-white" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]" />
            </div>
            <div>
              <span className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
                VoiceBrain
                <span className="text-[11px] font-mono font-medium text-zinc-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                  v2.4
                </span>
              </span>
              <p className="text-[11px] text-zinc-400 hidden sm:block">Hardware Smart Recorder &amp; Perpetual Second Brain</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Capabilities</a>
            <a href="#hardware" className="hover:text-white transition-colors">Hardware Companion</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="text-xs font-medium text-zinc-400 hover:text-white px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Super Admin CMS Portal"
            >
              <Shield className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline">Admin CMS</span>
            </button>

            <button
              onClick={onConnectHardware}
              className="relative group px-4 py-2 rounded-full bg-white text-black text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-zinc-200 active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Connect Pod</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. CINEMATIC OBSIDIAN HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-black via-[#060608] to-black">
        {/* Atmospheric Faint Silver Glow Backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-white/[0.03] via-white/[0.06] to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-8">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/80 border border-white/15 text-xs text-zinc-300 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="font-medium tracking-wide">VoiceBrain Hardware Pod v2.4</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400 font-normal">Gemini Multimodal Inside</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Capture Every Word.{' '}
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Remember Every Decision.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
            The hardware smart recorder and perpetual Second Brain that transcribes bilingual meetings live and remembers context forever.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <button
              onClick={onConnectHardware}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:bg-zinc-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Radio className="w-4 h-4 text-black" />
              <span>Connect Hardware Companion</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreDemo}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-xl"
            >
              <Zap className="w-4 h-4 text-zinc-300" />
              <span>Explore Interactive Demo</span>
            </button>
          </div>

          {/* HERO VISUAL SHOWCASE: Hardware Pod + Live Streaming Transcript Card */}
          <div className="pt-10 max-w-5xl mx-auto">
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-[0_0_50px_rgba(0,0,0,0.9)]">
              <div className="rounded-[22px] bg-zinc-950/90 backdrop-blur-2xl border border-white/10 p-5 sm:p-8 overflow-hidden text-left">
                {/* Window Bar */}
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-zinc-700" />
                    <span className="w-3 h-3 rounded-full bg-zinc-600" />
                    <span className="w-3 h-3 rounded-full bg-zinc-400" />
                    <span className="ml-2 text-xs font-mono text-zinc-500">voicebrain-pod://companion-live-stream</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-400">
                    <span className="flex items-center gap-1.5 text-zinc-300 font-mono">
                      <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]" />
                      Hardware Pod Online (ESP32)
                    </span>
                    <span className="text-zinc-700 hidden sm:inline">|</span>
                    <span className="font-mono text-zinc-500 hidden sm:inline">WiFi DMA 16kHz</span>
                  </div>
                </div>

                {/* Showcase Grid: Hardware Pod Graphic & Live Stream Transcript */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
                  {/* Left Column: Glowing Hardware Pod Simulator Graphic */}
                  <div className="lg:col-span-5 rounded-2xl bg-black/80 border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden shadow-inner">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.04] rounded-full blur-2xl" />
                    
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-6">
                      <span className="font-medium text-zinc-300">Voice Pod Hardware</span>
                      <span className="font-mono text-white font-semibold">BATTERY 94%</span>
                    </div>

                    {/* Hardware Pod Visual Circle */}
                    <div className="my-auto py-6 flex flex-col items-center text-center">
                      <div className="relative flex items-center justify-center w-36 h-36 rounded-full bg-zinc-950 border-2 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.06)]">
                        {/* Audio Wave Ring */}
                        <div className="absolute inset-0 rounded-full border border-white/15 animate-ping opacity-30" />
                        <div className="w-24 h-24 rounded-full bg-black border border-white/10 flex flex-col items-center justify-center text-white">
                          <Mic className="w-8 h-8 text-white" />
                          <span className="text-[10px] font-mono mt-1 text-zinc-300 font-bold">REC ON</span>
                        </div>
                      </div>

                      <div className="mt-5 space-y-1">
                        <p className="text-sm font-semibold text-white">Dual MEMS I2S Array</p>
                        <p className="text-xs text-zinc-400">Offline MicroSD Auto-Failover Active</p>
                      </div>
                    </div>

                    {/* Live waveform equalizer simulation */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-1 h-8">
                      {[40, 75, 55, 90, 60, 85, 30, 95, 70, 45, 80, 65, 90, 40, 70, 50, 85, 60].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-zinc-500 to-white rounded-full opacity-85"
                          style={{
                            height: `${h}%`,
                            animation: `pulse 1.2s infinite ease-in-out ${i * 0.08}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Live Bilingual Rolling Transcript Preview */}
                  <div className="lg:col-span-7 rounded-2xl bg-black/60 border border-white/10 p-5 flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-white" />
                        <span className="text-xs font-semibold text-zinc-200">
                          Live Bilingual Stream (Bengali / English)
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-zinc-300 border border-white/10">
                        CHUNK 01 · 00:30
                      </span>
                    </div>

                    {/* Speech Bubbles */}
                    <div className="space-y-3 font-sans text-xs">
                      {/* Speaker 1 */}
                      <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-white/10 space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-white">Rahul (Engineering Lead)</span>
                          <span className="font-mono text-zinc-500">00:12</span>
                        </div>
                        <p className="text-zinc-300 leading-relaxed">
                          "আমরা PostgreSQL drizzle schema টা deploy করেছি। Next step হলো Bengali speech chunking pipeline টাকে 30 seconds interval-এ sync করা।"
                        </p>
                      </div>

                      {/* Speaker 2 */}
                      <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-white/10 space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-zinc-300">Sarah (Product Manager)</span>
                          <span className="font-mono text-zinc-500">00:24</span>
                        </div>
                        <p className="text-zinc-300 leading-relaxed">
                          "That looks very solid. Let's make sure the MicroSD backup doesn't stop writing if WiFi reconnects mid-session."
                        </p>
                      </div>

                      {/* AI Auto-Extraction Realtime Callout */}
                      <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/15 text-zinc-200 text-xs flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-white flex-shrink-0" />
                          <span>Action item automatically captured into Second Brain</span>
                        </div>
                        <span className="font-mono text-[10px] text-zinc-300 underline cursor-pointer hover:text-white">
                          View Memory
                        </span>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs text-zinc-400">
                      <span>Zero hallucination guarantee</span>
                      <button
                        onClick={onExploreDemo}
                        className="text-white hover:text-zinc-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        Launch Interactive Session &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENTO BOX FEATURES GRID */}
      <section id="features" className="py-20 border-t border-white/10 relative z-10 bg-[#060608]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Architected for Speed &amp; Accuracy</h2>
            <p className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              A Complete Intelligence Loop from Mic to Memory
            </p>
            <p className="text-sm sm:text-base text-zinc-400">
              No phone screens required during meetings. VoiceBrain pairs dedicated tactile recording hardware with multimodal Gemini Flash intelligence.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1: Hardware Voice Pod */}
            <div className="rounded-3xl p-6 sm:p-8 bg-zinc-950/70 backdrop-blur-2xl border border-white/10 hover:border-white/25 shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                  <Radio className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">Hardware Voice Pod</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Dual I2S microphone array powered by ESP32 DMA streaming. Local MicroSD offline vault prevents data loss if venue WiFi fluctuates.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 space-y-2 text-xs font-mono text-zinc-400">
                <div className="flex justify-between">
                  <span>Microphone Type</span>
                  <span className="text-white">Dual MEMS I2S</span>
                </div>
                <div className="flex justify-between">
                  <span>Offline Storage</span>
                  <span className="text-white">MicroSD 32GB Ultra</span>
                </div>
                <div className="flex justify-between">
                  <span>Battery Endurance</span>
                  <span className="text-white font-semibold">14 Hours Continuous</span>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Real-Time Bilingual Stream */}
            <div className="rounded-3xl p-6 sm:p-8 bg-zinc-950/70 backdrop-blur-2xl border border-white/10 hover:border-white/25 shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">Real-Time Bilingual Stream</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Native understanding of mixed Bengali, English, and Banglish idioms. Rolling 30-second chunk synthesis produces flawless verbatim transcripts.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 space-y-2 text-xs font-mono text-zinc-400">
                <div className="flex justify-between">
                  <span>Languages</span>
                  <span className="text-white">Bengali / English / Mixed</span>
                </div>
                <div className="flex justify-between">
                  <span>Chunking Latency</span>
                  <span className="text-white">&lt; 30 Seconds</span>
                </div>
                <div className="flex justify-between">
                  <span>Speaker Diarization</span>
                  <span className="text-white font-semibold">Multi-Speaker Attributed</span>
                </div>
              </div>
            </div>

            {/* Bento Card 3: Perpetual Second Brain */}
            <div className="rounded-3xl p-6 sm:p-8 bg-zinc-950/70 backdrop-blur-2xl border border-white/10 hover:border-white/25 shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">Perpetual Second Brain</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Instant retrieval of deadlines, client preferences, and past decisions across weeks of discussions. Ask natural questions and receive factual citations.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 space-y-2 text-xs font-mono text-zinc-400">
                <div className="flex justify-between">
                  <span>Memory Recall</span>
                  <span className="text-white">Semantic &amp; Entity Vectors</span>
                </div>
                <div className="flex justify-between">
                  <span>Knowledge Categorization</span>
                  <span className="text-white">Auto-Tagged &amp; Pinned</span>
                </div>
                <div className="flex justify-between">
                  <span>Meeting Q&amp;A</span>
                  <span className="text-white font-semibold">Instant Slide-Over Sheet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HARDWARE COMPANION SECTION */}
      <section id="hardware" className="py-20 border-t border-white/10 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-zinc-950/90 border border-white/10 p-8 sm:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-semibold text-zinc-200">
                  <Cpu className="w-3.5 h-3.5 text-white" />
                  Tactile Hardware Companion
                </div>
                <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                  No Apps to Open. Just Press &amp; Speak.
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                  Engineered for real boardroom tables, client coffee shops, and busy team standups. Place the VoiceBrain Pod in the middle of the table, click the tactile ring button, and let Gemini handle everything.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-white font-semibold text-sm">
                      <Lock className="w-4 h-4 text-white" />
                      Encrypted MicroSD Vault
                    </div>
                    <p className="text-xs text-zinc-400">
                      Recordings are stored with AES encryption and sync over your secure local network.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-white font-semibold text-sm">
                      <Zap className="w-4 h-4 text-white" />
                      Instant 6-Digit Pairing
                    </div>
                    <p className="text-xs text-zinc-400">
                      No Bluetooth pairing drama. Type your hardware serial number once or scan the laser-etched QR code.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onConnectHardware}
                    className="px-6 py-3 rounded-full bg-white text-black text-sm font-semibold shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-zinc-200 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Pair Your Device Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Hardware Pod Diagram Graphic */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative p-8 rounded-3xl bg-black border border-white/15 shadow-[0_0_30px_rgba(255,255,255,0.05)] w-full max-w-sm text-center space-y-6">
                  <div className="w-40 h-40 mx-auto rounded-full bg-zinc-950 border-2 border-white/20 flex items-center justify-center relative shadow-inner">
                    <div className="w-28 h-28 rounded-full bg-black border border-white/10 flex flex-col items-center justify-center text-white">
                      <Volume2 className="w-8 h-8 text-white" />
                      <span className="text-[10px] font-mono mt-1 font-bold text-zinc-300">16kHz DMA</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-base font-semibold text-white">VoiceBrain Pod Model XZ-8842</p>
                    <p className="text-xs text-zinc-400">
                      Firmware v2.4.12 · Bengali Speech Engine Ready
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3 text-xs text-zinc-300 font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/10">WiFi 2.4GHz</span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/10">USB-C Fast</span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/10">MicroSD Slot</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LUXURY OBSIDIAN PRICING SECTION */}
      <section id="pricing" className="py-20 border-t border-white/10 relative z-10 bg-[#060608]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Transparent Subscriptions</h2>
            <p className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              Invest in Flawless Meeting Memory
            </p>
            <p className="text-sm sm:text-base text-zinc-400">
              Pick the tier that fits your workflow. Change or upgrade anytime via the built-in portal.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Tier 1: Starter */}
            <div className="rounded-3xl p-6 sm:p-8 bg-zinc-950/70 backdrop-blur-2xl border border-white/10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{systemSettings.packages.starter.name}</h3>
                  <span className="text-xs font-mono text-zinc-400 uppercase">Individual</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-semibold font-mono text-white">BDT 0</span>
                  <span className="text-xs text-zinc-400">/month</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Ideal for solo creators testing Bengali speech-to-text and MicroSD card workflows.
                </p>

                <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span>{systemSettings.packages.starter.storage} Audio Storage</span>
                  </div>
                  {systemSettings.packages.starter.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-white flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectPlanTier('starter')}
                className="w-full py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-semibold transition-all cursor-pointer"
              >
                {activePlan === 'starter' ? 'Current Plan' : 'Select Starter'}
              </button>
            </div>

            {/* Tier 2: Pro (Highlighted with White Rim Rim Glow) */}
            <div className="rounded-3xl p-6 sm:p-8 bg-zinc-900/90 backdrop-blur-2xl border-2 border-white/50 shadow-[0_0_40px_rgba(255,255,255,0.12)] flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white text-[10px] font-bold text-black uppercase tracking-wider shadow-md">
                Most Popular
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{systemSettings.packages.pro.name}</h3>
                  <span className="text-xs font-mono text-zinc-300 uppercase font-bold">Executives</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-bold font-mono text-white">
                    BDT {systemSettings.packages.pro.priceBdt}
                  </span>
                  <span className="text-xs text-zinc-400">/month</span>
                </div>
                <p className="text-xs text-zinc-300">
                  Full multimodal intelligence, unlimited Second Brain semantic memories, and priority processing.
                </p>

                <div className="pt-4 border-t border-white/15 space-y-2.5 text-xs text-zinc-200">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span className="font-semibold text-white">{systemSettings.packages.pro.storage} Storage</span>
                  </div>
                  {systemSettings.packages.pro.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-white flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectPlanTier('pro')}
                className="w-full py-3.5 rounded-full bg-white text-black text-xs font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-zinc-200 transition-all cursor-pointer"
              >
                {activePlan === 'pro' ? 'Current Plan (Active)' : 'Choose Pro Executive'}
              </button>
            </div>

            {/* Tier 3: Business */}
            <div className="rounded-3xl p-6 sm:p-8 bg-zinc-950/70 backdrop-blur-2xl border border-white/10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{systemSettings.packages.business.name}</h3>
                  <span className="text-xs font-mono text-zinc-400 uppercase">Enterprise</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-semibold font-mono text-white">
                    BDT {systemSettings.packages.business.priceBdt}
                  </span>
                  <span className="text-xs text-zinc-400">/month</span>
                </div>
                <p className="text-xs text-zinc-400">
                  For cross-functional agencies, high-scale engineering pods, and multi-team organizations.
                </p>

                <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span>{systemSettings.packages.business.storage} Audio Storage</span>
                  </div>
                  {systemSettings.packages.business.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-white flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectPlanTier('business')}
                className="w-full py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-semibold transition-all cursor-pointer"
              >
                {activePlan === 'business' ? 'Current Plan' : 'Select Business'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ & TRUST SECTION */}
      <section id="faq" className="py-20 border-t border-white/10 relative z-10 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Frequently Asked Questions</h2>
            <p className="text-3xl font-semibold text-white">Everything You Need to Know</p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How does VoiceBrain handle mixed Bengali and English (Banglish) dialects?',
                a: 'Our audio ingestion pipeline chunks recordings into 30-second segments and feeds them into Gemini Flash with custom phonetic vocabulary models. It automatically handles Bengali script alongside English technical jargon without losing nuance.',
              },
              {
                q: 'What happens if WiFi drops during an important conference meeting?',
                a: 'The physical Voice Pod automatically writes the audio stream to the integrated MicroSD card via high-speed DMA. As soon as connectivity is restored, the pod uploads and synchronizes with your Second Brain with zero packet loss.',
              },
              {
                q: 'Can I ask questions about a meeting that took place three weeks ago?',
                a: 'Yes! The Perpetual Second Brain indexes all entities, decisions, and deadlines into persistent memory. You can ask "Rahul-er deadline kobe?" in our Assistant Chat and receive the exact quote and date instantly.',
              },
              {
                q: 'How do I connect my device if I just received my Voice Pod?',
                a: 'Click "Connect Hardware Companion" above, enter the 6-character code printed on the bottom of the device (or click Instant Demo with XZ-8842), and pair in seconds.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-zinc-950/70 border border-white/10 overflow-hidden transition-all hover:border-white/20"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-sm sm:text-base font-medium text-white hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-zinc-400 transition-transform ${
                      activeFaq === idx ? 'rotate-90 text-white' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/10 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. POLISHED OBSIDIAN FOOTER */}
      <footer className="border-t border-white/10 bg-black py-12 relative z-10 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-white/15 flex items-center justify-center text-white font-bold">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">VoiceBrain</p>
              <p className="text-[11px] text-zinc-500">Autonomous Speech Intelligence &amp; Memory Vault</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#hardware" className="hover:text-white transition-colors">Hardware Pod</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <button onClick={onOpenAdmin} className="hover:text-white transition-colors cursor-pointer">
              Admin Portal
            </button>
          </div>

          <div className="text-center md:text-right text-[11px] text-zinc-500 space-y-0.5">
            <p>&copy; {new Date().getFullYear()} VoiceBrain Technologies Inc. All rights reserved.</p>
            <p className="font-mono">Engineered with Google Gemini Flash &bull; Dhaka &amp; Global</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

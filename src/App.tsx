import React, { useState, useMemo } from "react";
import {
  Copy,
  Check,
  Download,
  ExternalLink,
  Github,
  Sparkles,
  Code2,
  Eye,
  Settings2,
  BookOpen,
  Terminal,
  Award,
  Smartphone,
  Globe,
  CheckCircle2,
  HelpCircle,
  Play,
  Share2,
  ShieldCheck,
  Flame,
  ArrowRight,
  Layers,
  FileText,
  User,
  Tv,
  CreditCard,
  Scissors
} from "lucide-react";
import {
  initialProfileConfig,
  projectsList,
  certificationsList,
  themesAvailable,
  ProfileConfig,
  ProjectItem,
} from "./data/profileData";
import { generateMarkdown } from "./utils/markdownGenerator";

export default function App() {
  const [config, setConfig] = useState<ProfileConfig>(initialProfileConfig);
  const [projects, setProjects] = useState<ProjectItem[]>(projectsList);
  const [activeTab, setActiveTab] = useState<"preview" | "markdown" | "wizard" | "customizer" | "snake">("preview");
  const [copied, setCopied] = useState(false);

  // Generate markdown on the fly
  const markdownOutput = useMemo(() => {
    return generateMarkdown(config, projects, certificationsList);
  }, [config, projects]);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownOutput], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "README.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadSnake = () => {
    const snakeYaml = `name: generate snake
on:
  schedule:
    - cron: "0 */12 * * *"
  workflow_dispatch:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: Platane/snk@v3
        with:
          github_user_name: ${config.username}
          outputs: |
            dist/github-contribution-grid-snake.svg
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark
      - uses: crazy-max/ghaction-github-pages@v3.1.0
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}`;
    const blob = new Blob([snakeYaml], { type: "text/yaml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "snake.yml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const toggleProject = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Header & Quick Actions */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0c111e]/90 backdrop-blur-md px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={config.avatarUrl}
                alt={config.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-cyan-400 shadow-lg shadow-cyan-500/20"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#090d16] rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white">
                  {config.name}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                  Engineering Portfolio Studio
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Tailored for @{config.username} · Recruiter-Ready GitHub Profile
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 shadow-md ${
                copied
                  ? "bg-emerald-600 text-white shadow-emerald-500/30 scale-105"
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/20 hover:scale-[1.02]"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> Copied README!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> 1-Click Copy README
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Download README.md"
            >
              <Download className="w-4 h-4" />
              <span>Download README.md</span>
            </button>

            <a
              href="https://github.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs sm:text-sm bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border border-cyan-900/50 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Open GitHub</span>
            </a>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="max-w-7xl mx-auto mt-3 flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeTab === "preview"
                ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
            }`}
          >
            <Eye className="w-4 h-4" />
            Live GitHub Profile Preview
          </button>

          <button
            onClick={() => setActiveTab("markdown")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeTab === "markdown"
                ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
            }`}
          >
            <Code2 className="w-4 h-4" />
            Raw Markdown & Export
          </button>

          <button
            onClick={() => setActiveTab("wizard")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeTab === "wizard"
                ? "bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            GitHub Deployment Guide
          </button>

          <button
            onClick={() => setActiveTab("customizer")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeTab === "customizer"
                ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
            }`}
          >
            <Settings2 className="w-4 h-4" />
            Project & Theme Settings
          </button>

          <button
            onClick={() => setActiveTab("snake")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeTab === "snake"
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
            }`}
          >
            <Flame className="w-4 h-4" />
            Contribution Snake Automation
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        {/* Recruiter-Ready Badge Bar */}
        <div className="mb-6 rounded-xl bg-slate-900/80 border border-cyan-900/40 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100">
                Production-Grade Engineering Profile & Verified Project Showcase
              </p>
              <p className="text-xs text-slate-400">
                Featuring Fortress UPI (Offline/Online Payments), Storyloom (Amazon Fire TV), CutSlot (Salon Partner), and Rescuen (Google Play).
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleDownload}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Download File
            </button>
            <button
              onClick={() => setActiveTab("wizard")}
              className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800/60 hover:bg-cyan-900/60 transition flex items-center gap-1"
            >
              Upload Steps <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* TAB 1: LIVE GITHUB PROFILE PREVIEW */}
        {activeTab === "preview" && (
          <div className="space-y-6">
            {/* GitHub Container Frame */}
            <div className="rounded-2xl border border-slate-700/80 bg-[#0d1117] shadow-2xl overflow-hidden">
              {/* GitHub Repo Header */}
              <div className="border-b border-slate-800 bg-[#161b22] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-200">
                    {config.username}
                  </span>
                  <span className="text-slate-500">/</span>
                  <span className="text-sm font-semibold text-white">README.md</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    Special Repository
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live GitHub Preview
                </div>
              </div>

              {/* Rendered Preview Body */}
              <div className="p-4 sm:p-8 space-y-8 max-w-4xl mx-auto">
                {/* 1. Header Luxury Banner */}
                <div className="flex justify-center overflow-hidden rounded-xl shadow-2xl border border-cyan-500/20">
                  <img
                    src="/assets/header-luxury.svg"
                    alt="Bapan Ghosh Header Banner"
                    className="w-full"
                  />
                </div>

                {/* 2. Photo Avatar on Terrace */}
                {config.showAvatar && (
                  <div className="flex flex-col items-center justify-center -mt-6">
                    <a
                      href={config.portfolioUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative"
                    >
                      <img
                        src={config.avatarUrl}
                        alt="Bapan Ghosh"
                        className="w-32 h-32 rounded-full object-cover border-4 border-cyan-400 shadow-[0_0_30px_rgba(56,189,248,0.5)] transition duration-300 group-hover:scale-105"
                      />
                    </a>
                  </div>
                )}

                {/* 3. Typing SVG */}
                <div className="flex justify-center">
                  <img
                    src={`https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=20&duration=3000&pause=1200&color=38BDF8&center=true&vCenter=true&width=800&lines=${config.typingLines
                      .map((l) => encodeURIComponent(l).replace(/%20/g, "+"))
                      .join(";")}`}
                    alt="Dynamic Headline Simulation"
                    className="max-w-full"
                  />
                </div>

                {/* 4. Follower, Views & Portfolio Badges */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <img
                    src={`https://img.shields.io/github/followers/${config.username}?label=Followers&logo=github&style=for-the-badge&color=050811&labelColor=0d1117&logoColor=38bdf8`}
                    alt="Followers"
                  />
                  {config.showViewsCounter && (
                    <img
                      src={`https://komarev.com/ghpvc/?username=${config.username}&style=for-the-badge&color=050811&labelColor=0d1117`}
                      alt="Profile Views"
                    />
                  )}
                  <a href={config.portfolioUrl} target="_blank" rel="noreferrer">
                    <img
                      src="https://img.shields.io/badge/Live_Portfolio-00F2FE?style=for-the-badge&logo=netlify&logoColor=black&labelColor=050811"
                      alt="Portfolio Badge"
                    />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.officialrescuen.app"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://img.shields.io/badge/Google_Play-34D399?style=for-the-badge&logo=googleplay&logoColor=white&labelColor=050811"
                      alt="Google Play"
                    />
                  </a>
                </div>

                {/* 5. Professional Social Channels */}
                {config.showSocialBadges && (
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <a href={config.linkedinUrl} target="_blank" rel="noreferrer">
                      <img
                        src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=050811"
                        alt="LinkedIn"
                      />
                    </a>
                    <a href={config.leetcodeUrl} target="_blank" rel="noreferrer">
                      <img
                        src="https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=black&labelColor=050811"
                        alt="LeetCode"
                      />
                    </a>
                    <a href={`mailto:${config.email}`}>
                      <img
                        src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white&labelColor=050811"
                        alt="Email"
                      />
                    </a>
                    <a href={config.whatsappUrl} target="_blank" rel="noreferrer">
                      <img
                        src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white&labelColor=050811"
                        alt="WhatsApp"
                      />
                    </a>
                  </div>
                )}

                <div className="flex justify-center">
                  <img src="/assets/divider.svg" alt="Divider" className="w-full my-2 opacity-90" />
                </div>

                {/* 6. Executive Summary */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-white border-b border-slate-800 pb-2">
                    👨‍💻 Executive Summary
                  </h3>
                  <div className="rounded-xl bg-[#161b22] border border-slate-800 p-4 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto shadow-inner">
                    <span className="text-purple-400">engineer:</span> {config.name}
                    <br />
                    <span className="text-purple-400">role:</span> {config.role}
                    <br />
                    <span className="text-purple-400">education:</span> {config.education} @ {config.college}
                    <br />
                    <span className="text-purple-400">location:</span> {config.location}
                    <br />
                    <span className="text-purple-400">status:</span> 🟢 Available for SDE, Full-Stack &amp; Mobile Engineering Internships
                    <br />
                    <span className="text-purple-400">focus_areas:</span>
                    <br />
                    &nbsp;&nbsp;- Production Full-Stack Web (React, Next.js, Node.js, Express, MongoDB)
                    <br />
                    &nbsp;&nbsp;- Production Mobile Engineering (Flutter, Android SDK, Published on Google Play)
                    <br />
                    &nbsp;&nbsp;- Living Room TV Applications (Amazon Fire TV, React Native for TV, AWS Bedrock)
                    <br />
                    &nbsp;&nbsp;- Hardware-Attested Cryptographic Protocols (Android StrongBox, BLE / NFC Offline Ledger)
                  </div>

                  <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                    <li>
                      📱 <strong className="text-white">Shipped to Production:</strong> Architected and deployed <a href="https://play.google.com/store/apps/details?id=com.officialrescuen.app" target="_blank" rel="noreferrer" className="text-cyan-400 font-semibold underline">Rescuen</a> live on the Google Play Store, serving real-time emergency SOS alerts with background GPS telemetry.
                    </li>
                    <li>
                      🛡️ <strong className="text-white">Fintech Engineering:</strong> Built <a href="https://github.com/bapanghosh0812/FORTRESS-UPI" target="_blank" rel="noreferrer" className="text-cyan-400 font-semibold underline">Fortress UPI</a>, an offline-resilient payment engine using hardware-attested keys (Android StrongBox / TEE) and single-use offline notes (p99 &lt; 15ms).
                    </li>
                    <li>
                      📺 <strong className="text-white">Cloud &amp; Living Room TV:</strong> Authored <a href="https://github.com/bapanghosh0812/Fire-TV-Amazon" target="_blank" rel="noreferrer" className="text-cyan-400 font-semibold underline">Storyloom on Amazon Fire TV</a> leveraging Amazon Bedrock AgentCore, Strands multi-agent pipelines, Amazon Nova, and AWS Polly.
                    </li>
                    <li>
                      💼 <strong className="text-white">Industry Experience:</strong> Former AI/ML Intern at <span className="text-cyan-400 font-semibold">EDU TANTR</span> and Web Development Intern at <span className="text-cyan-400 font-semibold">Cognifyz IT Solutions</span>.
                    </li>
                    <li>
                      📜 <strong className="text-white">Accreditations:</strong> Certified in Oracle Cloud Infrastructure (OCI Generative AI), Microsoft Azure (AZ-900), IBM AI Foundations, and Kaggle 5-Day Agentic AI.
                    </li>
                  </ul>
                </div>

                <div className="flex justify-center">
                  <img src="/assets/divider.svg" alt="Divider" className="w-full my-2 opacity-90" />
                </div>

                {/* 7. Core Engineering Stack */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-white border-b border-slate-800 pb-2">
                    🛠️ Core Engineering Stack
                  </h3>
                  <div className="flex justify-center overflow-hidden rounded-xl shadow-xl">
                    <img
                      src="/assets/tech-stack.svg"
                      alt="Tech Stack Visual Matrix"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <img src="/assets/divider.svg" alt="Divider" className="w-full my-2 opacity-90" />
                </div>

                {/* 8. Key Engineering Projects Showcase */}
                {config.showProjectsTable && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-white border-b border-slate-800 pb-2">
                      🚀 Key Engineering Projects
                    </h3>
                    <div className="overflow-x-auto rounded-xl border border-slate-800">
                      <table className="w-full text-left text-sm text-slate-300">
                        <thead className="bg-[#161b22] text-xs uppercase text-slate-400 font-semibold border-b border-slate-800">
                          <tr>
                            <th className="py-3 px-4">Project</th>
                            <th className="py-3 px-4">Highlights &amp; Architecture</th>
                            <th className="py-3 px-4">Technologies</th>
                            <th className="py-3 px-4 text-center">Links</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {projects
                            .filter((p) => p.featured)
                            .sort((a, b) => a.priority - b.priority)
                            .map((p) => (
                              <tr key={p.id} className="hover:bg-slate-800/40 transition">
                                <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                                  <div className="flex items-center gap-2">
                                    <span>{p.shortTitle}</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-mono">
                                      {p.badge}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-xs text-slate-400 max-w-md leading-relaxed">
                                  {p.description}
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                                    {p.tech.map((t) => (
                                      <span
                                        key={t}
                                        className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono border border-slate-700"
                                      >
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-center whitespace-nowrap text-xs">
                                  <div className="flex items-center justify-center gap-2">
                                    {p.playStoreUrl && (
                                      <a
                                        href={p.playStoreUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-emerald-400 hover:underline font-medium"
                                      >
                                        📱 Play Store
                                      </a>
                                    )}
                                    {p.liveUrl && (
                                      <a
                                        href={p.liveUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-cyan-400 hover:underline font-medium"
                                      >
                                        🌐 Demo
                                      </a>
                                    )}
                                    {p.githubUrl && (
                                      <a
                                        href={p.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-slate-400 hover:text-white hover:underline"
                                      >
                                        💻 Repo
                                      </a>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Interactive Architecture Deep Dives in Preview */}
                    <div className="space-y-3 pt-2">
                      <details className="group rounded-xl border border-slate-800 bg-[#161b22] p-4 text-xs text-slate-300 cursor-pointer">
                        <summary className="font-semibold text-cyan-400 flex items-center justify-between">
                          <span>🔬 Architecture Deep Dive: Fortress UPI Offline Protocol</span>
                          <span className="text-slate-500 group-open:rotate-180 transition">▼</span>
                        </summary>
                        <div className="mt-3 space-y-2 border-t border-slate-800 pt-3 font-mono text-[11px] text-slate-400">
                          <p className="text-slate-200">
                            <strong>Double-Spend Prevention Without Internet:</strong> Single-use hardware key attestation (<code>KeyGenParameterSpec.Builder.setMaxUsageCount(1)</code>) guarantees that an offline token cannot be cryptographically forged or re-signed on device.
                          </p>
                          <p>
                            <strong>Sub-15ms Latency:</strong> Optimized BLE advertisement payload packing prevents MTU fragmentation and handles encrypted session verification over BLE/NFC.
                          </p>
                        </div>
                      </details>

                      <details className="group rounded-xl border border-slate-800 bg-[#161b22] p-4 text-xs text-slate-300 cursor-pointer">
                        <summary className="font-semibold text-purple-400 flex items-center justify-between">
                          <span>📺 Architecture Deep Dive: Storyloom on Amazon Fire TV</span>
                          <span className="text-slate-500 group-open:rotate-180 transition">▼</span>
                        </summary>
                        <div className="mt-3 space-y-2 border-t border-slate-800 pt-3 font-mono text-[11px] text-slate-400">
                          <p className="text-slate-200">
                            <strong>10-Foot Living Room Interaction:</strong> Built on React Native for TV with hardware D-Pad spatial focus normalization.
                          </p>
                          <p>
                            <strong>Multi-Agent Pipeline:</strong> Amazon Bedrock AgentCore orchestrating Strands multi-agent state machines, Amazon Nova narrative synthesis, and AWS Polly real-time streaming audio playback.
                          </p>
                        </div>
                      </details>
                    </div>
                  </div>
                )}

                <div className="flex justify-center">
                  <img src="/assets/divider.svg" alt="Divider" className="w-full my-2 opacity-90" />
                </div>

                {/* 9. Metrics & Streaks */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-white border-b border-slate-800 pb-2">
                    📊 GitHub Activity &amp; Real-Time Metrics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-[#050811] p-2 flex items-center justify-center border border-slate-800">
                      <img
                        src={`https://github-readme-stats.vercel.app/api?username=${config.username}&show_icons=true&theme=radical&hide_border=true&bg_color=050811&title_color=38BDF8&icon_color=00F2FE&text_color=94A3B8&border_color=1E293B`}
                        alt="GitHub Stats Card"
                        className="w-full max-w-md"
                      />
                    </div>
                    {config.showStreak && (
                      <div className="rounded-xl bg-[#050811] p-2 flex items-center justify-center border border-slate-800">
                        <img
                          src={`https://github-readme-streak-stats.herokuapp.com/?user=${config.username}&theme=radical&hide_border=true&background=050811&ring=38BDF8&fire=00F2FE&currStreakNum=38BDF8&sideNums=94A3B8&currStreakLabel=38BDF8`}
                          alt="Streak Card"
                          className="w-full max-w-md"
                        />
                      </div>
                    )}
                  </div>
                  {config.showTopLangs && (
                    <div className="rounded-xl bg-[#050811] p-2 flex items-center justify-center border border-slate-800 max-w-xl mx-auto">
                      <img
                        src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${config.username}&layout=compact&theme=radical&hide_border=true&bg_color=050811&title_color=38BDF8&text_color=94A3B8&border_color=1E293B`}
                        alt="Top Languages"
                        className="w-full"
                      />
                    </div>
                  )}
                </div>

                {/* 10. Trophies */}
                {config.showTrophies && (
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-white border-b border-slate-800 pb-2">
                      🏆 GitHub Milestones &amp; Trophies
                    </h3>
                    <div className="flex justify-center overflow-x-auto py-2">
                      <img
                        src={`https://github-profile-trophy.vercel.app/?username=${config.username}&theme=radical&no-frame=true&no-bg=false&margin-w=4`}
                        alt="GitHub Trophies"
                        className="max-w-full"
                      />
                    </div>
                  </div>
                )}

                <hr className="border-slate-800" />

                {/* 10. Key Engineering Projects Showcase */}
                {config.showProjectsTable && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-white border-b border-slate-800 pb-2">
                      🚀 Key Engineering Projects
                    </h3>
                    <div className="overflow-x-auto rounded-xl border border-slate-800">
                      <table className="w-full text-left text-sm text-slate-300">
                        <thead className="bg-[#161b22] text-xs uppercase text-slate-400 font-semibold border-b border-slate-800">
                          <tr>
                            <th className="py-3 px-4">Project</th>
                            <th className="py-3 px-4">Highlights & Architecture</th>
                            <th className="py-3 px-4">Technologies</th>
                            <th className="py-3 px-4 text-center">Links</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {projects
                            .filter((p) => p.featured)
                            .sort((a, b) => a.priority - b.priority)
                            .map((p) => (
                              <tr key={p.id} className="hover:bg-slate-800/40 transition">
                                <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                                  <div className="flex items-center gap-2">
                                    <span>{p.shortTitle}</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-mono">
                                      {p.badge}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-xs text-slate-400 max-w-md leading-relaxed">
                                  {p.description}
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                                    {p.tech.map((t) => (
                                      <span
                                        key={t}
                                        className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono border border-slate-700"
                                      >
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-center whitespace-nowrap text-xs">
                                  <div className="flex items-center justify-center gap-2">
                                    {p.playStoreUrl && (
                                      <a
                                        href={p.playStoreUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-emerald-400 hover:underline font-medium"
                                      >
                                        📱 Play Store
                                      </a>
                                    )}
                                    {p.liveUrl && (
                                      <a
                                        href={p.liveUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-cyan-400 hover:underline font-medium"
                                      >
                                        🌐 Demo
                                      </a>
                                    )}
                                    {p.githubUrl && (
                                      <a
                                        href={p.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-slate-400 hover:text-white hover:underline"
                                      >
                                        💻 Repo
                                      </a>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <hr className="border-slate-800" />

                {/* 11. Certifications */}
                {config.showCertifications && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-white border-b border-slate-800 pb-2">
                      🎖️ Professional Accreditations & Credentials
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {certificationsList.map((c) => (
                        <div
                          key={c.id}
                          className="rounded-xl bg-[#161b22] border border-slate-800 p-3 flex items-start gap-3"
                        >
                          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                            <Award className="w-4 h-4 text-amber-400" />
                          </div>
                          <div>
                            <div className="font-semibold text-xs sm:text-sm text-slate-200">
                              {c.title}
                            </div>
                            <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                              <span>{c.issuer}</span>
                              <span>·</span>
                              <span className="text-cyan-400">{c.badge}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 12. Footer Wave */}
                <div className="flex justify-center pt-6">
                  <img
                    src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=1,11,21,31&height=120&section=footer"
                    alt="Footer Wave"
                    className="w-full max-w-3xl rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RAW MARKDOWN & EXPORT */}
        {activeTab === "markdown" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  Production README.md Markdown
                </h3>
                <p className="text-xs text-slate-400">
                  Ready for immediate deployment to your GitHub special repository.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-sm transition ${
                    copied
                      ? "bg-emerald-600 text-white"
                      : "bg-cyan-600 hover:bg-cyan-500 text-white"
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied to Clipboard!" : "Copy Full Code"}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                >
                  <Download className="w-4 h-4" /> Download README.md
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#0d1117] p-4 sm:p-6 overflow-x-auto shadow-2xl">
              <pre className="font-mono text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap select-all">
                {markdownOutput}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: GITHUB DEPLOYMENT GUIDE */}
        {activeTab === "wizard" && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Fast Deployment Flow
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                How to Publish Your Profile to GitHub in 30 Seconds
              </h2>
              <p className="text-sm text-slate-400 max-w-xl mx-auto">
                No local tools, git terminal commands, or file edits on your computer are required. Follow these 4 straightforward steps directly on GitHub:
              </p>
            </div>

            {/* 4 Step Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Step 1 */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center border border-cyan-500/30">
                    1
                  </span>
                  <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded-md border border-cyan-800/40">
                    Create Repository
                  </span>
                </div>
                <h4 className="font-bold text-base text-white">
                  Create Special Repository
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Go to GitHub and create a new repository with your exact username:
                  <br />
                  <code className="text-cyan-300 font-bold bg-slate-800 px-2 py-0.5 rounded mt-1 inline-block">
                    bapanghosh0812
                  </code>
                </p>
                <div className="pt-2">
                  <a
                    href="https://github.com/new"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition shadow-sm"
                  >
                    Open GitHub New Repo <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Step 2 */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center border border-cyan-500/30">
                    2
                  </span>
                  <span className="text-xs font-mono text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800/40">
                    Public + Initialize
                  </span>
                </div>
                <h4 className="font-bold text-base text-white">
                  Set Visibility to Public
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ensure the repository is set to <strong className="text-white">Public</strong>. Check the checkbox for <strong className="text-white">"Add a README file"</strong>, then click <strong className="text-white">Create repository</strong>.
                </p>
                <div className="text-[11px] text-amber-400/90 bg-amber-950/30 border border-amber-800/40 rounded-lg p-2">
                  💡 <em>Setting it to Public is required by GitHub for the profile overview to render publicly.</em>
                </div>
              </div>

              {/* Step 3 */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center border border-cyan-500/30">
                    3
                  </span>
                  <span className="text-xs font-mono text-indigo-300 bg-indigo-950 px-2.5 py-1 rounded-md border border-indigo-800/40">
                    Copy or Download
                  </span>
                </div>
                <h4 className="font-bold text-base text-white">
                  Get the Verified Markdown Code
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Either download the <code className="text-slate-200">README.md</code> file or copy the raw markdown text directly into your clipboard.
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy Code"}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                  >
                    <Download className="w-3.5 h-3.5" /> Download .md
                  </button>
                </div>
              </div>

              {/* Step 4 */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center border border-cyan-500/30">
                    4
                  </span>
                  <span className="text-xs font-mono text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800/40">
                    Commit Changes
                  </span>
                </div>
                <h4 className="font-bold text-base text-white">
                  Paste & Commit to GitHub
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Click the pencil icon ✏️ (Edit) on <code className="text-slate-200">README.md</code> in your repository, replace the content with the copied code, and click the green <strong className="text-white">Commit changes</strong> button.
                </p>
                <div className="pt-2">
                  <a
                    href={`https://github.com/${config.username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-900/40 transition"
                  >
                    Visit Your Profile <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Technical Verification FAQ */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
                Frequently Asked Technical Questions
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <strong className="text-white block mb-1">
                    Are any local computer files affected?
                  </strong>
                  <p className="text-slate-400 text-xs">
                    Zero local files are altered or accessed. The entire profile generation process takes place securely in the cloud environment and interfaces directly with GitHub.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <strong className="text-white block mb-1">
                    How do dynamic stat counters update?
                  </strong>
                  <p className="text-slate-400 text-xs">
                    The GitHub stats, trophies, and profile visit counters run on serverless endpoints. They automatically sync every time someone visits your GitHub profile.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <strong className="text-white block mb-1">
                    Can projects or links be updated later?
                  </strong>
                  <p className="text-slate-400 text-xs">
                    Yes. You can return to the "Project & Theme Settings" tab anytime to toggle new repos, update metrics, or modify headlines, then re-commit the generated README.md.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROJECT & THEME SETTINGS */}
        {activeTab === "customizer" && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Visual Theme Selector */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Settings2 className="w-5 h-5 text-cyan-400" />
                  Visual Theme & Color Palette
                </h3>
                <p className="text-xs text-slate-400">
                  Select the visual color scheme for GitHub metrics, streak counters, and trophies:
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {themesAvailable.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setConfig((prev) => ({ ...prev, theme: t.id }))}
                    className={`p-3 rounded-xl border text-left transition ${
                      config.theme === t.id
                        ? "border-cyan-500 bg-cyan-950/40 ring-1 ring-cyan-500"
                        : "border-slate-800 bg-slate-800/40 hover:bg-slate-800"
                    }`}
                  >
                    <div className="font-semibold text-xs sm:text-sm text-white">
                      {t.name}
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span
                        className="w-4 h-4 rounded-full border border-slate-700"
                        style={{ backgroundColor: t.bg }}
                      ></span>
                      <span
                        className="w-4 h-4 rounded-full border border-slate-700"
                        style={{ backgroundColor: t.title }}
                      ></span>
                      <span
                        className="w-4 h-4 rounded-full border border-slate-700"
                        style={{ backgroundColor: t.accent }}
                      ></span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Profile Avatar Toggle */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-cyan-400" />
                    Profile Picture Header
                  </h3>
                  <p className="text-xs text-slate-400">
                    Terrace photo with circular aesthetic and cyan neon accent glow.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={config.showAvatar}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, showAvatar: e.target.checked }))
                  }
                  className="w-5 h-5 rounded accent-cyan-500 cursor-pointer"
                />
              </div>

              {config.showAvatar && (
                <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                  <img
                    src={config.avatarUrl}
                    alt="Bapan Ghosh"
                    className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400 shadow-md"
                  />
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-white">
                      Terrace Portrait Active
                    </span>
                    <p className="text-[11px] text-slate-400">
                      Hosted at {config.avatarUrl}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Section Toggles */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                Display Sections
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-800 cursor-pointer hover:bg-slate-800">
                  <span>GitHub Trophies Showcase</span>
                  <input
                    type="checkbox"
                    checked={config.showTrophies}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, showTrophies: e.target.checked }))
                    }
                    className="w-4 h-4 rounded accent-cyan-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-800 cursor-pointer hover:bg-slate-800">
                  <span>Contribution Streak Counter</span>
                  <input
                    type="checkbox"
                    checked={config.showStreak}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, showStreak: e.target.checked }))
                    }
                    className="w-4 h-4 rounded accent-cyan-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-800 cursor-pointer hover:bg-slate-800">
                  <span>Language Distribution Graph</span>
                  <input
                    type="checkbox"
                    checked={config.showTopLangs}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, showTopLangs: e.target.checked }))
                    }
                    className="w-4 h-4 rounded accent-cyan-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-800 cursor-pointer hover:bg-slate-800">
                  <span>Real-Time Visitor Counter</span>
                  <input
                    type="checkbox"
                    checked={config.showViewsCounter}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, showViewsCounter: e.target.checked }))
                    }
                    className="w-4 h-4 rounded accent-cyan-500"
                  />
                </label>
              </div>
            </div>

            {/* Featured Projects Selector */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-cyan-400" />
                Featured Engineering Projects ({projects.filter((p) => p.featured).length} Active)
              </h3>
              <p className="text-xs text-slate-400">
                Toggle repositories to include in your primary showcase table:
              </p>

              <div className="space-y-2">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => toggleProject(project.id)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition ${
                      project.featured
                        ? "bg-cyan-950/30 border-cyan-700/60"
                        : "bg-slate-800/30 border-slate-800 opacity-60"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs sm:text-sm text-white">
                          {project.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
                          {project.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                        {project.description}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={project.featured}
                      onChange={() => {}}
                      className="w-4 h-4 rounded accent-cyan-500 shrink-0"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SNAKE AUTOMATION WORKFLOW */}
        {activeTab === "snake" && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Automated Contribution Graph Snake (GitHub Actions)
                  </h3>
                  <p className="text-xs text-slate-400">
                    A popular open-source workflow that generates an animated retro snake eating your commit grid squares.
                  </p>
                </div>
              </div>

              {/* Snake Demo */}
              <div className="rounded-xl border border-slate-800 bg-[#0d1117] p-4 flex items-center justify-center">
                <img
                  src="https://raw.githubusercontent.com/Platane/snk/output/github-contribution-grid-snake.svg"
                  alt="Snake Demo"
                  className="w-full max-w-lg"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-white">
                    Setup in 1 Minute via GitHub Web:
                  </h4>
                  <button
                    onClick={handleDownloadSnake}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition"
                  >
                    <Download className="w-3.5 h-3.5" /> Download snake.yml
                  </button>
                </div>

                <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-300">
                  <li>
                    Navigate to your <strong className="text-white">bapanghosh0812/bapanghosh0812</strong> repo on GitHub.
                  </li>
                  <li>
                    Click <strong className="text-white">"Add file"</strong> &gt; <strong className="text-white">"Create new file"</strong>.
                  </li>
                  <li>
                    Name the file path: <code className="bg-slate-800 text-cyan-300 px-1.5 py-0.5 rounded font-mono">.github/workflows/snake.yml</code>
                  </li>
                  <li>
                    Paste the YAML configuration below and click <strong className="text-white">Commit changes</strong>:
                  </li>
                </ol>

                <div className="relative rounded-xl border border-slate-800 bg-[#0d1117] p-4 overflow-x-auto">
                  <pre className="font-mono text-xs text-emerald-400 leading-relaxed whitespace-pre">
{`name: generate snake
on:
  schedule:
    - cron: "0 */12 * * *"
  workflow_dispatch:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: Platane/snk@v3
        with:
          github_user_name: ${config.username}
          outputs: |
            dist/github-contribution-grid-snake.svg
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark
      - uses: crazy-max/ghaction-github-pages@v3.1.0
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}`}
                  </pre>
                </div>

                <p className="text-xs text-slate-400">
                  The action runs automatically every 12 hours and renders an updated snake on your profile.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#090d16] py-6 px-4 text-center text-xs text-slate-500">
        <p>
          Configured for <span className="text-slate-300 font-medium">Bapan Ghosh (@{config.username})</span> · Synchronized with{" "}
          <a
            href={config.portfolioUrl}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:underline"
          >
            bapanghosh.netlify.app
          </a>
        </p>
      </footer>
    </div>
  );
}

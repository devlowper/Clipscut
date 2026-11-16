# Clipscut 🎬

> **AI Video Generation, Viral Clipping, Burned-in Caption Removal & Prompt Library**

Clipscut is a modern, light-themed creator platform engineered with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**. It combines AI text-to-short video synthesis, automated podcast/stream clipping, subtitle inpainting, and an interactive prompt library inspired by modern AI generative workflows.

---

## 🌟 Key Features

### 1. 🪄 The Wizard ("Make Something Today")
- **3-Panel Vertical Hook Previews**: Browse viral video ideas presented in multi-angle 9:16 vertical frames with bold kinetic subtitle hooks (`HE`, `THIS`, `NO`, `SOLID`, `WHAT`, etc.).
- **Quick Action Pills**: Switch instantly between *Clip a video*, *Make a video*, *Make images*, *Coloring book*, and *Remove captions*.
- **One-Click Studio Injection**: Clicking **`Use prompt`** on any video idea loads the style, aspect ratio, and prompt into the Studio editor.
- **Everyday Creator Tools**: Fast access to 16 specialized creator utilities (*Clip, Generator, Story, Image, Coloring book, Trending, Audio Fix, Jobs, Credits*).

### 2. 📹 Studio
- **Interactive 5-Card Fan Deck**: Visual curved card deck (*Security cam, Press test, Porch cam, Toybox 3D, Courtroom*) allowing one-click style switching with active scale and ring glows.
- **AI Prompt Enhancer**: Click the magic wand (`✨`) to enrich basic prompts with cinematic lighting, 35mm film grain, and high-retention hook phrasing.
- **Real-Time Render Presets**:
  - **Resolution**: `480p`, `720p`, `1080p`
  - **Duration**: `5s`, `8s`, `15s`, `30s`
  - **Models**: `Clipscut Shorts`, `Cinematic 4K`, `Fast Anime`
- **Render Engine**: Deducts credits, shows a real-time synthesis progress bar, and automatically stores the finished video in **Recent Projects**.
- **Templates Library**: 12+ searchable categories with instant *"Make one like this"* loading.

### 3. ✂️ Clip Dashboard
- **URL & File Ingestion**: Paste links from YouTube, Twitch, Kick, or upload local video files (`MP4`, `MOV`, `WebM`).
- **3-Stage Clipping Pipeline**:
  1. *Audio extraction & stream ingestion*
  2. *Speech transcription & high-retention hook grading*
  3. *9:16 vertical speaker tracking & dynamic animated subtitles*
- **Recent Projects Library**: Generated clips include viral score badges (`9.8/10`), duration tags, a built-in HD video modal player, one-click MP4 downloading, and shareable URLs.

### 4. 🧭 Explore Feed
- **12 Trending Categories**: Filter through *Podcasts, Interview, Business, Comedy, True crime, News, Education, Sports, Gaming, Fitness, Tech*.
- **Hourly Metric Badges**: Live views-per-hour acceleration tags (e.g. `↗ +780.5K views/hr`).
- **Direct Pipeline Loading**: Hover over any video card and click **"Get clips"** to immediately import it into the clipping engine.
- **Integrated Video Player**: Click any thumbnail to preview the video in a modal player.

### 5. 📄 Prompt Library
- **Curated Prompt Templates**: Explore ready-to-render prompts for footage stories, animated shorts, UGC product ads, nature scenes, and 3D explainers.
- **Inspiration & Resources**:
  - Main Site: [https://procraft.site/](https://procraft.site/)
  - Prompt Library: [https://procraft.site/prompt-library](https://procraft.site/prompt-library)
- **Instant "Make this"**: Copies the prompt, matches the visual template, and redirects to Studio.

### 6. ✂️ Caption Remover (Beta)
- **AI Temporal Inpainting**: Cleanly remove burned-in hardcoded subtitles from videos without quality degradation.
- **Drag & Drop Dropzone**: Supports `MP4`, `MOV`, or `WebM` files up to 60 seconds / 30 MB.
- **Export & Download**: Live preview of the clean cut with one-click `.mp4` download.
- **How It Works Drawer**: Visual guide detailing the 3-step *Detection*, *Inpainting*, and *Clean Cut* process.

### 7. 🤖 MCP Integration for Claude, ChatGPT & Cursor
- **Universal Model Context Protocol**: Connect Clipscut tools to LLMs via `https://Clipscut.ai/api/mcp`.
- **Platform Presets**:
  - **Claude Desktop & Web**: Custom connector setup.
  - **ChatGPT**: Custom GPT action schema integration.
  - **Claude Code & Cursor**: CLI terminal command:
    ```bash
    claude mcp add clipscut https://Clipscut.ai/api/mcp
    ```
- **Interactive Chat Sandbox**: Preview how Claude and ChatGPT clip videos and generate shorts directly within chat conversations.

### 8. 💳 Account & Credits System
- **Dynamic Balance**: Track real-time credits in the sidebar and profile popover.
- **Pricing Modal**: Choose between Free Starter Trial (50 free credits), Creator ($19/mo, 200 credits), and Pro Studio ($49/mo, 1000 credits).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Typography**: Inter & Inter Tight
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: Node.js / Vercel ready

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/devlowper/Clipscut.git
cd Clipscut
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### 4. Build for production
```bash
npm run build
npm start
```

---

## 🔗 References & Credits

- **Prompt Library Reference**: [ProCraft](https://procraft.site/)
- **ProCraft Prompt Library**: [ProCraft Prompt Library](https://procraft.site/prompt-library)
- **Brand & Theme**: Clipscut

---

## 📄 License

This project is licensed under the MIT License.

# Sanjay Makala — Developer & Founder Portfolio

A high-performance personal portfolio website for **Sanjay Makala** (Full-Stack Engineer, AI Product Builder & Founder), inspired by top indie builders and technical founders.

---

## ⚡ Features

- **Hero Device Frame Showcase**: Interactive browser frame with live rotating previews of your products.
- **Interactive `sanjay-cli` Terminal**: Browser terminal with command history, autocompletion, and commands (`projects`, `skills`, `cat leakwatch`, `matrix`, `stats`, `hire`).
- **Command Palette (`⌘K` / `Ctrl+K`)**: Keyboard-first modal for quick section navigation and actions.
- **Synthesized Audio Engine**: Zero-asset audio feedback using the native Web Audio API (sound effects for clicks, commands, and tabs with a mute toggle).
- **Interactive Global Radar Map**: Vector map displaying developer deployments and telemetry nodes with animated radar pulses.
- **Dual Theme System**: Obsidian Dark and Editorial Light themes with persistence in `localStorage`.
- **Architecture Deep-Dive Modals**: In-depth breakdowns of product architecture, problems solved, and technical models.
- **Zero Heavy Dependencies**: Pure HTML5, Vanilla CSS, and JavaScript. Blazing fast load times, 100/100 Lighthouse-ready.

---

## 🚀 Shipped Products Featured

1. **LeakWatch**: Automated secret detection for private GitHub repositories (Next.js, Octokit, Supabase, Vitest).
2. **ExitNote**: Cancellation survey widget & churn retention platform (Next.js, TypeScript, Shadow DOM, Supabase).
3. **LinkedIn Reply Assistant**: Contextual AI response extension for high-signal professional networking (Manifest V3, Chrome API, Claude 3.5 Sonnet).
4. **FormulaEngine**: Algorithmic mathematical formula publisher and KaTeX PDF cheat sheet compiler (Node.js, KaTeX, Puppeteer).

---

## 🛠️ Local Development

To run locally:

```bash
# Using npm
npm run dev

# Or with npx directly
npx serve -p 4173
```

Then visit `http://localhost:4173`.

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)
You can deploy directly with the Vercel CLI or via GitHub:

```bash
npx vercel
```

### Deploy to GitHub Pages
Push the repository to GitHub and enable **GitHub Pages** from `Settings > Pages > Branch: main / root`.

---

## 📝 Customization Guide

- **Change Social Handles & Email**: In [`index.html`](index.html), search for `sanjaymakala.dev@gmail.com` and social URLs to point to your live handles.
- **Update Products**: Add or modify cards in Section 02 (`#products`) and update the `ARCHITECTURE_DATA` object in [`script.js`](script.js).
- **Add CLI Commands**: Add new commands to `COMMAND_REGISTRY` in [`script.js`](script.js).
- **Update Assets**: Replace images in [`assets/`](assets/) with your latest product screenshots or updated photos.

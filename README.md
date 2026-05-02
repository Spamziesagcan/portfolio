# Spotify Portfolio

A Spotify-inspired portfolio built with React and Vite. The experience is designed like a music app, with a dark player UI, animated transitions, a custom cursor, and profile sections presented as albums, playlists, and a listening history.

## Features

- Animated landing page with a waveform hero, greeting, and featured cards.
- Projects section styled like an album browser with filters, project previews, and external links.
- Experience section presented as a career timeline with expandable entries.
- Shared Spotify-like shell with sidebar navigation, mobile bottom nav, player bar, and page transitions.
- Custom loading screen, top loader, and cursor treatment for a more immersive feel.

## Tech Stack

- React 19
- Vite
- React Router
- Framer Motion
- Tailwind CSS
- Lucide React
- Wavesurfer.js
- canvas-confetti

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Lint the codebase

```bash
npm run lint
```

## Project Structure

```text
src/
	App.jsx
	main.jsx
	components/
	hooks/
	pages/
```

## Pages

- Home: profile hero, greeting, and featured highlights.
- Projects: filterable project library with detailed preview panel.
- Experience: expandable timeline of roles and achievements.
- Skills: placeholder Spotify-style skills section.
- Contact: placeholder contact section.

## Future Scope

The current concept includes a future feature inspired by Spotify Blend: visitors will be able to upload their resume, compare it with the portfolio owner's resume, and receive a compatibility score with a matching tagline based on the percentage.

## Notes

The project is currently styled around placeholder content, so most names, projects, and links should be replaced with real portfolio data before publishing.

# Fusion Starter - Replit Configuration

## Overview
A production-ready full-stack React application template with integrated Express server, featuring React Router 6 SPA mode, TypeScript, Vitest, Zod and modern tooling.

**Current State:** Fully configured and running on Replit with proper port binding and deployment settings.

## Recent Changes
- **December 8, 2025:** Added NeuroLint as flagship project and fixed misleading content
  - Created dedicated NeuroLint flagship section with YouTube demo video embed
  - Added feature cards highlighting 700+ auto-fixes, deterministic AST transformations, React 19 support
  - Added terminal code block with installation and usage commands
  - Added links to neurolint.dev, GitHub repo, and npm package
  - Updated hero section: "Creator of NeuroLint & Developer Tools" as main tagline
  - Fixed misleading stats: removed false "50K+ Users" claim, now shows "700+ Code Fixes"
  - Updated Taxfy badges from "50,000+ Users" to "Beta" (honest labeling)
  - Updated SuperK53 badges from "Official Platform" to "Side Project"
  - Renamed Experience section to "Other Work" for side projects
  - Updated About section to focus on NeuroLint as main project
  - Added NeuroLint FAQ entry

- **October 11, 2025:** Enhanced blog with visual content and comprehensive debug logging
  - Fixed blog post images: replaced incorrect header images with appropriate stock photos
  - Added inline images throughout blog post content for better visual engagement and readability
  - Downloaded 13 professional stock images (students studying, road signs, tax documents, IT professionals, home offices, etc.)
  - All blog images now properly stored in `public/attached_assets/stock_images/` and displaying correctly
  - Added comprehensive debug logging to contact form (frontend and backend) with security compliance
  - Logging tracks all form submission steps without exposing sensitive user data (PII-safe)
  - Browser console and server logs now provide detailed debugging information for contact form troubleshooting

- **October 11, 2025:** Comprehensive blog implementation with SEO optimization and proper content structure
  - Created 3 comprehensive blog posts: K53 Learner's License Guide, SARS Tax Refund Optimization, and Remote IT Support
  - Fixed blog post rendering: Added @tailwindcss/typography plugin and custom prose styles for proper HTML structure
  - Blog posts now render correctly with headings (h2, h3), paragraphs, formatted links, and lists
  - Added blog navigation links to header, footer, and mobile navigation
  - Implemented SEO meta tags (title, description, keywords, Open Graph, Twitter Cards) for all blog pages
  - Added structured data (JSON-LD) for BlogPosting schema to improve search engine indexing
  - Created related posts section with internal linking for better SEO and user engagement
  - Updated sitemap.xml with all blog URLs and image metadata for search engines
  - Downloaded and configured blog post images (person studying, tax documents, IT professional)
  - Installed react-helmet-async for dynamic meta tag management in SPA
  - All blog posts include extensive internal links (to SuperK53, Taxfy, BurbGigz) and external authoritative links
  - Blog posts are 2,000-4,000 words each with comprehensive coverage and expert insights
  - Custom prose styles in client/global.css ensure proper typography, spacing, and link formatting

- **October 10, 2025:** UI/UX polish with smooth transitions, mobile optimization, and accessibility improvements
  - Added smooth transitions (300ms duration) to all interactive elements (buttons, links, cards)
  - Created mobile navigation menu with slide-in animation and backdrop
  - Improved touch targets to meet WCAG 44x44px minimum for better mobile usability
  - Enhanced theme toggle with smoother 500ms animation and scale effects
  - Added comprehensive focus states with ring indicators for keyboard navigation
  - Implemented skip navigation link for screen reader and keyboard users
  - Added tabIndex support to cards for better keyboard accessibility
  - Enhanced hover effects with translate-y animations and shadow elevation
  - Improved mobile spacing and responsive padding across all sections
  - Added reduced motion support for users with motion sensitivity preferences
  - Improved button states with active (pressed) feedback
  - Enhanced form inputs with better focus indicators
  - Made footer more responsive with adjusted spacing on mobile

- **October 10, 2025:** Enhanced UX with working contact form and interactive features
  - Integrated Resend email API for working contact form with full validation
  - Created backend API endpoint at `/api/contact` with Zod validation
  - Implemented form loading states, success/error messaging, and auto-reset
  - Added WhatsApp integration button with direct messaging link (+27 67 049 4876)
  - Created collapsible FAQ section with 6 common questions and answers
  - Added smooth scroll behavior for seamless navigation between sections
  - All features tested and verified working correctly

- **October 10, 2025:** Comprehensive SEO implementation and favicon setup
  - Downloaded and converted clive-profile.jpg to multiple favicon formats (ico, 16x16, 32x32, 180x180, 192x192, 512x512)
  - Implemented comprehensive SEO meta tags (title, description, keywords, author, robots, canonical)
  - Added Open Graph tags for Facebook and social media sharing with optimized image metadata
  - Added Twitter Card meta tags with @just_clive_sa attribution
  - Implemented structured data (JSON-LD) for Person and ProfessionalService schemas
  - Created site.webmanifest for PWA support with theme color and app icons
  - Created sitemap.xml with image metadata for search engine indexing
  - Updated robots.txt to reference sitemap and allow all crawlers
  - Updated Index.tsx to use local /clive-profile.jpg instead of external URL
  - Added geo-location meta tags for Johannesburg, South Africa

- **October 10, 2025:** Initial Replit setup completed
  - Configured Vite dev server to use port 5000 (required for Replit)
  - Added `allowedHosts` configuration for Replit proxy domains
  - Added Node types to TypeScript configuration
  - Set up development workflow with `pnpm dev`
  - Configured autoscale deployment with build and production commands
  - Removed Netlify-specific files (netlify.toml, netlify/ directory)
  - Fixed .gitignore to properly exclude .env files

## Project Architecture

### Tech Stack
- **Package Manager:** PNPM (v10.14.0)
- **Frontend:** React 18 + React Router 6 (SPA) + TypeScript + Vite
- **Backend:** Express 5 server integrated with Vite dev server
- **Testing:** Vitest
- **UI:** Radix UI + TailwindCSS 3 + Lucide React icons
- **Styling:** TailwindCSS 3 with custom theming in `client/global.css`

### Project Structure
```
client/                   # React SPA frontend
├── pages/                # Route components (Index.tsx = home)
├── components/ui/        # Pre-built UI component library
├── App.tsx              # App entry point with SPA routing setup
└── global.css           # TailwindCSS theming and global styles

server/                   # Express API backend
├── index.ts             # Main server setup (express config + routes)
├── routes/              # API handlers
└── node-build.ts        # Production server entry point

shared/                   # Types used by both client & server
└── api.ts               # Shared API interfaces
```

### Key Features
- **Single-port development:** Vite dev server with Express middleware integration
- **Full hot reload:** Both client and server code in development
- **API endpoints:** Prefixed with `/api/`
- **Path aliases:** `@/*` for client, `@shared/*` for shared code
- **Type-safe API:** Shared TypeScript interfaces between client and server

## Replit Configuration

### Development Setup
- **Port:** 5000 (configured in `vite.config.ts`)
- **Host:** `::` (IPv6/all-interface binding for Replit)
- **Workflow:** `pnpm dev` starts Vite dev server with Express middleware
- **HMR:** Auto-configured by Vite (no manual override needed)

### Deployment (Production)
- **Target:** Autoscale (stateless application)
- **Build:** `pnpm build` (builds client SPA + server bundle)
  - Client output: `dist/spa/`
  - Server output: `dist/server/`
- **Run:** `pnpm start` (runs Node server on PORT env var, defaults to 3000)
- **Server:** Serves API routes and static SPA files

### Environment Variables
Configure any required environment variables in Replit Secrets:
- `PORT` - Auto-set by Replit in production
- `PING_MESSAGE` - Example env var for `/api/ping` endpoint
- Add any additional API keys or secrets as needed

## Development Commands

```bash
pnpm dev        # Start dev server (client + server on port 5000)
pnpm build      # Production build (client + server)
pnpm start      # Start production server
pnpm typecheck  # TypeScript validation
pnpm test       # Run Vitest tests
```

## User Preferences
- **Package Manager:** Prefer PNPM for all package operations
- **Code Style:** TypeScript throughout, Tailwind for styling
- **Server Routes:** Only create API endpoints when strictly necessary (e.g., for private keys, DB operations)

## Important Notes

### Vite Configuration
- **Port 5000 is required** for Replit frontend workflow
- **Host `::`** preserves IPv4/IPv6 binding compatible with Replit
- **allowedHosts** - Must include `[".replit.dev", ".replit.app"]` to allow Replit's proxy domains
- **No HMR override** - Vite auto-negotiates WebSocket correctly with Replit's proxy

### TypeScript Configuration
- Node types added to `tsconfig.json` for server-side code
- `vite/client` types for Vite-specific features
- Path aliases configured for `@/` and `@shared/` imports

### Adding Features

#### New API Route
1. Create shared interface in `shared/api.ts` (optional)
2. Create route handler in `server/routes/`
3. Register route in `server/index.ts`
4. Use in React components with type safety

#### New Page Route
1. Create component in `client/pages/`
2. Add route in `client/App.tsx` before the catch-all `*` route

### Deployment Notes

#### Replit Deployment
- Autoscale deployment automatically handles scaling based on traffic
- Server binds to `process.env.PORT` in production (Replit sets this)
- All static SPA assets are served from `dist/spa/`
- API routes handled by Express server at `/api/*`

#### Vercel Deployment
- Project is configured for Vercel deployment with serverless functions
- See `VERCEL_DEPLOYMENT.md` for complete deployment guide
- Custom domain `justc.live` configuration included
- API routes handled by serverless function in `api/[...path].ts`

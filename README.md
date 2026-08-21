# VALTERA MOTORI

Premium Italian automotive dealership concept focused on immersive UX, vehicle discovery, transparent comparisons and conversion.

> **Status:** V0.1 — foundation. Valtera Motori is a fictional portfolio project. Third-party vehicle trademarks belong to their respective owners.

## Product direction

- Premium multi-brand cars and motorcycles
- Cinematic but performance-aware transitions
- Progressive 3D/WebGL experiences in later versions
- Vehicle and dealership comparisons backed by verifiable sources
- Conversion flows: test drive, trade-in, quote and advisor contact
- Mobile-first fallbacks for heavy visual experiences

## Stack

- Next.js 16.3.1
- React 19.2.8
- TypeScript
- GSAP 3.15.0
- CSS design system (minimal dependency surface in V0.1)
- Vercel target deployment

## Local development

```bash
npm install
npm run dev
```

Quality gate:

```bash
npm run check
```

## Security baseline

- No credentials or private API keys are required by V0.1.
- `.env*` is ignored except for the safe `.env.example` template.
- Never place secrets in `NEXT_PUBLIC_*`; those values are delivered to the browser.
- Security headers are configured in `next.config.ts`.
- GitHub CI checks lint, TypeScript and production build.
- Dependabot and CodeQL are enabled in the repository configuration files.
- Forms/backends are intentionally disabled until rate limiting, validation and abuse controls are designed.

See [SECURITY.md](./SECURITY.md).

## Images

Initial V0.1 visual references use remote Unsplash imagery under the Unsplash License. They are placeholders for a future curated/licensed asset library.

## Roadmap

- V0.1 Foundation + premium landing experience
- V0.2 Catalog and vehicle detail routes
- V0.3 Real comparison data layer + source timestamps
- V0.4 Conversion funnel and secure backend
- V0.5 3D showroom / progressive WebGL
- V0.6 Configurator
- V0.7 Performance, accessibility and SEO hardening
- V1.0 Portfolio production release

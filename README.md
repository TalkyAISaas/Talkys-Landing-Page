# Talkys website

Marketing site for Talkys AI: agents that answer phone calls, video calls and chats in Arabic and English and connect to any stack.

Next.js 15 (App Router, static export) + Tailwind CSS. English and Arabic (RTL), picked from the visitor's saved choice, then geo-IP, then browser language.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

- Demo form posts to Web3Forms: set `NEXT_PUBLIC_WEB3FORMS_KEY` in `.env.local` (see `.env.example`).
- Copy lives next to each component as `{ en, ar }` objects read with `useCopy()` from `src/i18n/LocaleContext.tsx`.
- Deploy: `.github/workflows/main.yml` builds and syncs `out/` to S3 + CloudFront.

# KLIA — Landing

## Project
Institutional website for KLIA.
Repository: dibrand-dev/klia-landing
Production: https://www.klia.com.ar

## Stack
- Next.js 14 App Router + TypeScript
- Tailwind CSS
- Supabase (read-only for pricing data)
- Vercel (CI/CD from main branch)

## Key rules
- Always run `npm run build` before committing
- Never modify these existing pages: /precios, /terminos, /privacidad
- Nav links: Precios → /precios, Ingresar → https://app.klia.com.ar/login, Probar gratis → https://app.klia.com.ar/registro
- Do not add reveal/opacity-0 animation classes to heading elements — causes overlapping
- Custom heading classes h-1, h-2, h-3 conflict with Tailwind height utilities — always add height: auto override

## Key files
- src/app/page.tsx — home page
- src/app/precios/page.tsx — pricing page (dynamic from Supabase)
- src/app/terminos/page.tsx — terms and conditions
- src/app/privacidad/page.tsx — privacy policy
- src/components/landing/ — all landing components
- src/app/globals.css — global styles including reveal animation fix
- src/components/landing/ClearInvalidSession.tsx — clears invalid Supabase tokens from localStorage

## Known issues fixed
- .h-2 and .h-3 custom classes conflict with Tailwind height utilities — fixed with `height: auto` in globals.css
- Invalid refresh token loop — fixed with ClearInvalidSession component in layout

## Supabase
- Read-only access to `configuracion` and `planes` tables for pricing
- Public read policy enabled on both tables

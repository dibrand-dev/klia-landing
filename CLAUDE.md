# KLIA — Landing

## Project
Institutional website for KLIA.
Repository: dibrand-dev/klia-landing
Production: https://www.klia.com.ar

## Stack
- Next.js 14 App Router + TypeScript
- Tailwind CSS
- Supabase (read-only for pricing and modules data)
- Vercel (CI/CD from main branch)
- Zoho SalesIQ (chat widget, before </body> in layout)
- Meta Pixel ID: 1330774269119331 (in <head> via dangerouslySetInnerHTML)
- GTM: GTM-NRJKS2G7 (in <head> via dangerouslySetInnerHTML)

## Key rules
- Always run `npm run build` before committing
- Never modify these existing pages: /terminos, /privacidad
- /precios CAN be modified — it's dynamic from Supabase
- Nav links: Precios → /precios, Ingresar → https://app.klia.com.ar/login, Probar gratis → https://app.klia.com.ar/registro
- Do not add reveal/opacity-0 animation classes to heading elements — causes overlapping
- Custom heading classes h-1, h-2, h-3 conflict with Tailwind height utilities — always add height: auto override
- Terminology: use "firma escaneada" NOT "firma digital" throughout all copy

## Key files
- src/app/layout.tsx — root layout with GTM, Meta Pixel, Zoho SalesIQ
- src/app/page.tsx — home page
- src/app/precios/page.tsx — pricing page (dynamic from Supabase: planes + modulos_config)
- src/app/terminos/page.tsx — terms and conditions (DO NOT MODIFY)
- src/app/privacidad/page.tsx — privacy policy (DO NOT MODIFY)
- src/app/prueba-gratis/page.tsx — CRO landing page (noindex, registration form)
- src/app/login/page.tsx — login page (renders AuthSplit with defaultMode="login")
- src/app/registro/page.tsx — register page (renders AuthSplit with defaultMode="register")
- src/components/landing/ — all landing components
- src/components/landing/Pricing.tsx — pricing component, types PlanData + ModuloItem
- src/components/auth/AuthSplit.tsx — auth component (login + register tabs, phone mockup)
- src/app/globals.css — global styles including reveal animation fix
- src/app/auth.css — styles for /login and /registro pages
- src/app/prueba-gratis/cro.css — styles for /prueba-gratis
- src/components/landing/ClearInvalidSession.tsx — clears invalid Supabase tokens from localStorage

## Auth pages
- AuthSplit accepts `defaultMode?: 'login' | 'register'` prop
- /login → defaultMode="login" (default)
- /registro → defaultMode="register" (tab pre-selected)
- Error handling: ?error=auth_callback_error shows orange banner (expired confirmation link)
- Apple OAuth button is hidden (style={{ display: 'none' }})
- Google OAuth redirects to https://app.klia.com.ar/auth/callback

## Pricing system (as of 2026-07-04)
- Source of truth: Supabase tables `planes` + `modulos_config`
- `planes`: id, nombre, descripcion, precio_mensual, es_ilimitado, es_publico, activo
- `modulos_config`: modulo_id, nombre, descripcion, planes (string[]), activo
- Each plan receives ALL active modules — component filters by `m.planes.includes(plan.id)`
- Plan IDs are 'esencial', 'profesional', 'premium' — used directly as keys (no normalization)
- Comparativa table is built dynamically from modulos_config (flat list ordered by modulo_id)
- NO hardcoded price fallbacks — if Supabase fails, pages show "Precios no disponibles" error state
- `src/lib/planes.ts` — shared `getPlanes(): Promise<PlanData[] | null>` used by /precios, /prueba-gratis, and home JSON-LD
- Annual price in /prueba-gratis computed as `Math.round(precio_mensual * 11 / 12)` (1 free month)
- revalidate = 3600 in /precios as fallback; pages are `ƒ Dynamic` due to cookies() in createClient()
- `src/lib/features.ts` was deleted — no longer used

## On-demand revalidation (POST /api/revalidate)
- Endpoint: `POST https://www.klia.com.ar/api/revalidate?secret=<REVALIDATE_SECRET>`
- Revalidates /precios and / (home JSON-LD) immediately
- Ops must call this after updating prices in the `planes` table
- Set `REVALIDATE_SECRET` env var in Vercel (project settings → Environment Variables)
- Returns `{ revalidated: true, paths: ['/precios', '/'] }` on success, 401 on invalid secret

## Known issues fixed
- .h-2 and .h-3 custom classes conflict with Tailwind height utilities — fixed with `height: auto` in globals.css
- Invalid refresh token loop — fixed with ClearInvalidSession component in layout
- Registration 400 error — fixed: apellido and matricula send null when empty
- /registro always opened with "Ingresar" tab — fixed with defaultMode="register" prop
- auth_callback_error on /login — fixed: shows orange banner with recovery link

## Supabase
- Read-only access from landing (browser client uses domain: '.klia.com.ar')
- Server client: src/lib/supabase/server.ts (uses cookies, SSR)
- Browser client: src/lib/supabase/client.ts (createBrowserClient, cookieDomain .klia.com.ar)
- Registration POSTs to https://app.klia.com.ar/api/auth/registro (external API)

## Third-party scripts (all in src/app/layout.tsx)
- GTM: inline in <head> via dangerouslySetInnerHTML
- Meta Pixel: inline in <head> via dangerouslySetInnerHTML, ID 1330774269119331
- Zoho SalesIQ: init inline + script src before </body>, widget wc=siq195479a499f719dd02043e3c9eb1e5e6

## Ultimos cambios
_Actualizado el 2026-07-22_

```
6f12c3d fix: usar precio_anual_mensual real en vez de calculo x11/12 en prueba-gratis
```

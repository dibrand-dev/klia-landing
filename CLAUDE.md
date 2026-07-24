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
- src/app/page.tsx — home page (force-dynamic)
- src/app/precios/page.tsx — pricing page (force-dynamic, reads planes + modulos_config)
- src/app/terminos/page.tsx — terms and conditions (DO NOT MODIFY)
- src/app/privacidad/page.tsx — privacy policy (DO NOT MODIFY)
- src/app/prueba-gratis/page.tsx — CRO landing page (noindex, registration form)
- src/app/login/page.tsx — login page (renders AuthSplit with defaultMode="login")
- src/app/registro/page.tsx — register page (renders AuthSplit with defaultMode="register")
- src/components/landing/ — all landing components
- src/components/landing/Pricing.tsx — pricing component, types PlanData + ModuloItem
- src/components/landing/Testimonials.tsx — testimonials carousel (reads from Supabase testimonios table, falls back to ITEMS_FALLBACK)
- src/components/auth/AuthSplit.tsx — auth component (login + register tabs, phone mockup)
- src/app/globals.css — global styles including reveal animation fix
- src/app/auth.css — styles for /login and /registro pages
- src/app/prueba-gratis/cro.css — styles for /prueba-gratis
- src/components/landing/ClearInvalidSession.tsx — clears invalid Supabase tokens from localStorage
- src/lib/planes.ts — getPlanes(): shared server-side query for planes + modulos_config
- src/lib/testimonios.ts — getTestimonios(): reads from testimonios table, returns [] on error

## Auth pages
- AuthSplit accepts `defaultMode?: 'login' | 'register'` prop
- /login → defaultMode="login" (default)
- /registro → defaultMode="register" (tab pre-selected)
- Error handling: ?error=auth_callback_error shows orange banner (expired confirmation link)
- Apple OAuth button is hidden (style={{ display: 'none' }})
- Google OAuth redirects to https://app.klia.com.ar/auth/callback

## Pricing system (as of 2026-07-24)
- Source of truth: Supabase tables `planes` + `modulos_config`
- `planes` columns used: id (UUID), slug (text), nombre, descripcion, precio_mensual, precio_anual_mensual, es_ilimitado, es_publico, activo
- `modulos_config` columns: modulo_id, nombre, descripcion, planes (text[]), activo
- `modulos_config.planes` contains slugs ('esencial', 'profesional', 'premium') — NOT UUIDs
- Comparativa and plan card features filter by `m.planes.includes(plan.slug)` — slug, NOT plan.id (UUID)
- NO hardcoded price fallbacks — if Supabase fails, pages show "Precios no disponibles" error state
- `src/lib/planes.ts` — shared `getPlanes(): Promise<PlanData[] | null>` used by /precios, /prueba-gratis, and home JSON-LD
- Annual price in /prueba-gratis reads `precio_anual_mensual` directly from Supabase (not computed)
- /precios uses `force-dynamic` — renders fresh on every request, no ISR
- MODULOS_FALLBACK in planes.ts is last-resort only (if modulos_config query fails); contains slugs
- `src/lib/features.ts` was deleted — no longer used

## On-demand revalidation (POST /api/revalidate)
- Endpoint: `POST https://www.klia.com.ar/api/revalidate?secret=<REVALIDATE_SECRET>`
- Revalidates /precios and / (home JSON-LD) immediately
- Set `REVALIDATE_SECRET` env var in Vercel (project settings → Environment Variables)
- Returns `{ revalidated: true, paths: ['/precios', '/'] }` on success, 401 on invalid secret
- The app also calls this server-to-server via `/api/ops/revalidate-landing` (no secret exposed to browser)

## Testimonios (as of 2026-07-24)
- Dynamic from Supabase table `testimonios`
- Columns: id, quote, nombre, rol, color_bg, iniciales, avatar_url (nullable), orden, activo
- If avatar_url is set: renders <img> (circular, 44x44). If null: renders color_bg + iniciales fallback
- If Supabase fails or returns empty: falls back to ITEMS_FALLBACK (5 hardcoded testimonials) — section never blank

## Analytics (GTM / GA4)
- All events via `window.dataLayer.push()` using helper `src/lib/analytics.ts`
- Three form sources: `auth_split`, `prueba_gratis`, `register_form`
- Events: `sign_up_attempt`, `sign_up`, `sign_up_failed`
- `sign_up_failed` includes `reason`: `email_already_exists` | `invalid_password` | `unknown_error`
- `sign_up_attempt` and `sign_up` always push `reason: undefined` to clear stale values from dataLayer

## Known issues fixed
- .h-2 and .h-3 custom classes conflict with Tailwind height utilities — fixed with `height: auto` in globals.css
- Invalid refresh token loop — fixed with ClearInvalidSession component in layout
- Registration 400 error — fixed: apellido and matricula send null when empty
- /registro always opened with "Ingresar" tab — fixed with defaultMode="register" prop
- auth_callback_error on /login — fixed: shows orange banner with recovery link
- /prueba-gratis HTTP 500 — toLocaleString on undefined: prices object had undefined values when plan slugs didn't match expected keys
- Tabla comparativa mostraba "—" en todas las celdas: doble causa — (1) comparaba plan.id (UUID) vs modulos_config.planes (slugs); (2) Next.js Data Cache retenía respuesta de Supabase de antes de que slug se agregara al SELECT. Fix: usar plan.slug en Pricing.tsx + force-dynamic en /precios

## Next.js Data Cache — lección aprendida
- `x-vercel-cache: MISS` confirma que la página se renderizó fresca (edge cache), pero NO garantiza que los fetch internos a Supabase estén frescos
- Con `revalidate = N`, Next.js Data Cache cachea los fetch() internos hasta N segundos — sobrevive redeploys
- Con `force-dynamic`, todos los fetch se ejecutan sin cache en cada request
- Si se agrega una columna nueva al SELECT de Supabase y la página tiene cache activo, el cache sirve la respuesta vieja sin esa columna hasta que expire o se invalide
- Para invalidar manualmente: `revalidatePath('/precios')` via el endpoint /api/revalidate

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
_Actualizado el 2026-07-24_

```
98cd249 chore: remover logs de debug en getPlanes tras confirmar fix de comparativa
ca88c9c fix: forzar dynamic rendering en /precios para evitar Data Cache stale en getPlanes
b7af4fb fix: corregir comparacion de planes por slug en vez de UUID en tabla comparativa
6f12c3d fix: usar precio_anual_mensual real en vez de calculo x11/12 en prueba-gratis
30355b2 feat: testimonios dinámicos con avatar por imagen o color+iniciales
```

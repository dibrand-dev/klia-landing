import { chromium } from 'playwright'

const BASE = 'https://www.klia.com.ar'
const TS   = Date.now()
const EMAIL_NEW   = `test-a-${TS}@dibrand.co`
const EMAIL_DUP   = `test-a-${TS - 1}@dibrand.co`  // will be registered first, then reused

async function events(page) {
  const dl = await page.evaluate(() => window.dataLayer ?? [])
  return dl.filter(e => e.event && e.event.startsWith('sign_up'))
}

async function waitForHydration(page, selector, timeout = 10000) {
  await page.waitForSelector(selector, { state: 'visible', timeout })
}

async function fillAuthSplit(page, { nombre='Test', apellido='Bot', email, password='TestPass123!', checkTerms=true } = {}) {
  await waitForHydration(page, 'input#nombre')
  await page.fill('input#nombre',   nombre)
  await page.fill('input#apellido', apellido)
  // email is in the EmailField component — find by type=email
  await page.fill('input[type="email"]', email)
  // especialidad select
  await page.locator('select#prof').selectOption({ index: 1 })
  // password — use the visible password input inside the PasswordField
  await page.fill('input[type="password"]', password)
  if (checkTerms) await page.locator('input[type="checkbox"]').last().check()
}

async function fillCRO(page, { email, password='TestPass123!', checkTerms=true } = {}) {
  await waitForHydration(page, 'input[placeholder="Nombre"]')
  await page.fill('input[placeholder="Nombre"]',   'Test')
  await page.fill('input[placeholder="Apellido"]',  'Bot')
  await page.fill('input[type="email"]',             email)
  await page.locator('select').first().selectOption({ index: 1 })
  await page.fill('input[type="password"]',          password)
  if (checkTerms) await page.locator('input[type="checkbox"]').first().check()
  await page.locator('.cro-form-submit').click()
}

async function run() {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium',
    headless: true,
    args: ['--ignore-certificate-errors'],
  })
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true })

  let pass = 0, fail = 0
  function check(label, condition, got) {
    if (condition) { console.log(`  ✅  ${label}`); pass++ }
    else           { console.log(`  ❌  ${label}  →  got: ${JSON.stringify(got)}`); fail++ }
  }

  // ── 1. AuthSplit: success (new email) ─────────────────────────────────────
  console.log(`\n[1] AuthSplit — sign_up + sign_up_attempt (${EMAIL_NEW})`)
  {
    const page = await ctx.newPage()
    await page.goto(`${BASE}/registro`, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await fillAuthSplit(page, { email: EMAIL_NEW })
    await page.locator('button[type="submit"]').click()
    await page.waitForTimeout(5000)
    const ev = await events(page)
    const attempt = ev.find(e => e.event === 'sign_up_attempt')
    const signup  = ev.find(e => e.event === 'sign_up')
    check('sign_up_attempt fired',                    !!attempt, ev)
    check('sign_up_attempt.form_source=auth_split',   attempt?.form_source === 'auth_split', attempt)
    check('sign_up fired',                            !!signup, ev)
    check('sign_up.form_source=auth_split',           signup?.form_source === 'auth_split', signup)
    check('no sign_up_failed',                        !ev.find(e => e.event === 'sign_up_failed'), ev)
    await page.close()
  }

  // ── 2. AuthSplit: 409 (duplicate email) ───────────────────────────────────
  console.log(`\n[2] AuthSplit — sign_up_failed(email_already_exists) same email`)
  {
    const page = await ctx.newPage()
    await page.goto(`${BASE}/registro`, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await fillAuthSplit(page, { email: EMAIL_NEW })
    await page.locator('button[type="submit"]').click()
    await page.waitForTimeout(5000)
    const ev = await events(page)
    const attempt = ev.find(e => e.event === 'sign_up_attempt')
    const failed  = ev.find(e => e.event === 'sign_up_failed')
    check('sign_up_attempt fired',                    !!attempt, ev)
    check('sign_up_failed fired',                     !!failed, ev)
    check('reason=email_already_exists',              failed?.reason === 'email_already_exists', failed)
    check('form_source=auth_split',                   failed?.form_source === 'auth_split', failed)
    check('no sign_up fired',                         !ev.find(e => e.event === 'sign_up'), ev)
    await page.close()
  }

  // ── 3. AuthSplit: network error (route abort) ──────────────────────────────
  console.log('\n[3] AuthSplit — sign_up_failed(unknown_error) network abort + error shown to user')
  {
    const page = await ctx.newPage()
    await page.goto(`${BASE}/registro`, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.route('**/api/auth/registro', r => r.abort('failed'))
    await fillAuthSplit(page, { email: 'nettest@dibrand.co' })
    await page.locator('button[type="submit"]').click()
    await page.waitForTimeout(3000)
    const ev = await events(page)
    const failed = ev.find(e => e.event === 'sign_up_failed')
    check('sign_up_attempt fired',       !!ev.find(e => e.event === 'sign_up_attempt'), ev)
    check('sign_up_failed fired',        !!failed, ev)
    check('reason=unknown_error',        failed?.reason === 'unknown_error', failed)
    // user sees error message
    const errVisible = await page.locator('[style*="FEE2E2"], .error, [class*="error"]').first().isVisible().catch(() => false)
    check('error UI shown to user',      errVisible, errVisible)
    await page.close()
  }

  // ── 4. PruebaGratis: success (new email) ──────────────────────────────────
  const CRO_EMAIL = `test-cro-${TS}@dibrand.co`
  console.log(`\n[4] PruebaGratis — sign_up + sign_up_attempt (${CRO_EMAIL})`)
  {
    const page = await ctx.newPage()
    await page.goto(`${BASE}/prueba-gratis`, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await fillCRO(page, { email: CRO_EMAIL })
    await page.waitForTimeout(5000)
    const ev = await events(page)
    const attempt = ev.find(e => e.event === 'sign_up_attempt')
    const signup  = ev.find(e => e.event === 'sign_up')
    check('sign_up_attempt fired',                   !!attempt, ev)
    check('form_source=prueba_gratis',               attempt?.form_source === 'prueba_gratis', attempt)
    check('sign_up fired',                           !!signup, ev)
    check('sign_up.form_source=prueba_gratis',       signup?.form_source === 'prueba_gratis', signup)
    await page.close()
  }

  // ── 5. PruebaGratis: 409 (duplicate email) ────────────────────────────────
  console.log('\n[5] PruebaGratis — sign_up_failed(email_already_exists)')
  {
    const page = await ctx.newPage()
    await page.goto(`${BASE}/prueba-gratis`, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await fillCRO(page, { email: EMAIL_NEW })  // reuse already-registered email
    await page.waitForTimeout(5000)
    const ev = await events(page)
    const failed = ev.find(e => e.event === 'sign_up_failed')
    check('sign_up_attempt fired',                   !!ev.find(e => e.event === 'sign_up_attempt'), ev)
    check('sign_up_failed fired',                    !!failed, ev)
    check('reason=email_already_exists',             failed?.reason === 'email_already_exists', failed)
    check('form_source=prueba_gratis',               failed?.form_source === 'prueba_gratis', failed)
    await page.close()
  }

  await browser.close()
  console.log(`\n=== RESULTS: ${pass} passed, ${fail} failed ===`)
  if (fail > 0) process.exit(1)
}

run().catch(err => { console.error(err); process.exit(1) })

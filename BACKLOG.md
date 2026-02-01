# Backlog — Not finished / To improve

Single list of incomplete or weak areas. Use this to prioritize and track work.

---

## Database

- [ ] **Move from SQLite to PostgreSQL** for production (concurrency, scale). Update `prisma/schema.prisma` provider, add migration, set `DATABASE_URL`.
- [ ] **Remove Prisma `(prisma as any)` casts** in newsletter subscribe route; ensure `Subscriber` is in generated client (run `prisma generate` after schema changes).

---

## Validation

- [ ] **Fix booking ID validation**: `schemas.booking.create` uses `.uuid()` for `activityId` and `slotId`, but Prisma uses CUIDs. Change to a string pattern that accepts CUIDs (e.g. `z.string().min(1)` or a CUID regex) so valid requests are not rejected.
- [ ] **Align validation across API and server actions**: Reuse the same Zod schemas (or a shared module) where the same entity is created/updated from both API routes and actions.

---

## Security

- [ ] **Add CSRF protection** for state-changing API routes and/or forms (e.g. double-submit cookie or framework recommendation for Next.js).
- [ ] **Extend rate limiting** to other sensitive routes: auth (login/register), payment create-intent, PayPal create/capture. Reuse or extend `rate-limit-middleware`.
- [ ] **Review error messages** so 4xx responses never leak internal details; keep generic messages for 5xx in production.

---

## Features

- [ ] **Forgot password flow**: Implement real reset (e.g. send email with token, reset-password page, secure token validation). Currently only a placeholder page exists.
- [ ] **Search**: Navbar search links to `/activities`. Add real search (query param + filters) on activities page, or a dedicated search UI, if required.
- [ ] **Reviews**: Add moderation or abuse handling (e.g. report, hide, or admin review queue) if reviews are public and user-generated.
- [ ] **Admin audit**: Log who did what for sensitive actions (e.g. booking status changes, delete destination/activity). Simple table + `createdBy` or audit log table is enough to start.

---

## API & backend consistency

- [ ] **Use `apiError()` everywhere**: Replace ad hoc `NextResponse.json({ error: ... }, { status })` in other API routes (newsletter, auth/register, payments, webhooks) with `apiError()` from `@/lib/errors` for a consistent `{ error, code? }` shape.
- [ ] **Use `logger` everywhere**: Replace remaining `console.error` / `console.log` in API routes and server actions with `logger` from `@/lib/logger`.
- [ ] **Optional — shared “service” layer**: Extract more business logic into `lib/services/` (e.g. newsletter subscribe, payment intent creation) and call from API routes (and optionally actions) to avoid duplication.

---

## Code quality

- [ ] **Remove `any` and tighten types**: Fix newsletter route Prisma usage; ensure all API request/response bodies use shared types from `src/types` where it helps.
- [ ] **Consistent error handling in server actions**: Return a shared shape (e.g. `{ success: true } | { error: string }`) and handle it uniformly in the UI.

---

## Production & observability

- [ ] **Error tracking**: Integrate an error reporting service (e.g. Sentry) so production errors are captured and alerted.
- [ ] **Structured logging**: Replace or wrap `logger` with a production-ready logger (e.g. Pino) and optionally ship logs to a service.
- [ ] **Health/readiness endpoint**: Add e.g. `GET /api/health` that checks DB (and optionally critical deps) for deployments and load balancers.

---

## Testing

- [ ] **E2E tests**: Add a few critical-path flows (e.g. browse activity → book → checkout, or login → dashboard) with Playwright or Cypress.
- [ ] **Integration/unit tests**: Cover at least `createBooking` service, validation helpers, and auth guards so refactors don’t break core behavior.

---

## Accessibility & UX

- [ ] **Full a11y pass**: Run axe or similar on key pages (home, activity detail, checkout, login); fix focus order, contrast, and ARIA where needed.
- [ ] **Keyboard navigation**: Ensure account dropdown and mobile menu can be fully used with keyboard (focus trap, Escape to close — partially done; verify and complete).

---

## Optional / later

- [ ] **Caching**: Add caching (e.g. for activity list or destination list) if pages become slow under load.
- [ ] **Email**: If `lib/mail` is not yet used, wire it for transactional emails (e.g. booking confirmation, password reset) when those features are implemented.
- [ ] **SEO**: Ensure critical pages have correct meta tags and locale alternates; refine `sitemap.ts` and `robots.ts` if needed.

---

*Last updated: framed from evaluation and codebase review. Check off items as you complete them.*

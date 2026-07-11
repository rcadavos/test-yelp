# Claude Guidelines — Next.js High-Performance App

## Required reading

- Read **`AGENTS.md`** in the repo root **together with** this file before making changes. It holds project-specific agent rules (e.g. Next.js version notes, git workflow) that may override or extend these guidelines.
- If `AGENTS.md` and `CLAUDE.md` conflict on a point, follow **`AGENTS.md`** for repo-local policy and **`CLAUDE.md`** for general architecture and patterns unless the user says otherwise.

## Core Stack

- Next.js (**App Router**)
- TypeScript
- Tailwind CSS
- @tanstack/react-query (v4)
- @tanstack/react-table
- Zustand (only when necessary)
- Zod (validation)

---

## Architecture Principles

### 1. Scalability & Structure

- Feature-based structure; organize under `src/`:

  - `src/app/` — routes, layouts, route handlers
  - `src/components/` — shared UI
  - `src/hooks/` — reusable hooks
  - `src/lib/` — utilities, clients, config
  - `src/services/` — domain logic and external integrations
  - `src/types/` — shared TypeScript types

- Separation of concerns:

  - UI → `src/components`
  - Logic → `src/services` (or `src/lib` for small apps)
  - Hooks → `src/hooks`
  - HTTP/API modules → `src/services/api` or `src/lib/api`

---

## 2. Reusable Components (MANDATORY)

All primitives must be reusable, for example:

- `src/components/ui/button.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/container.tsx`
- `src/components/ui/form.tsx`
- `src/components/ui/toast.tsx`

**Rules:**

- No duplicated UI
- No raw `<div>` for layout (use semantic / layout primitives)
- Fully typed
- Accessible (ARIA)

---

## 3. Forms (Hook-Based + Zod)

- Use reusable hooks
- Zod validation only
- Example pattern: `src/hooks/forms/useFormX.ts`

**Rules:**

- No inline validation
- Centralized error handling
- No duplicated UI; no raw `<div>` for layout
- Fully typed; accessible (ARIA)

---

## 4. Data Fetching (TanStack Query)

**Default query options:**

```ts
{
  staleTime: 1000 * 60 * 5,
  refetchOnWindowFocus: false,
  retry: 1,
}
```

**Rules:**

- Separate API logic from components
- Stable query keys
- Prefer `useSuspenseQuery` where appropriate
- Handle optimistic updates where applicable

---

## 5. Suspense & Streaming

- Use Suspense boundaries
- Prefer `useSuspenseQuery`
- Use skeleton loaders

---

## 6. State Management

- Prefer local state
- Zustand only if necessary (global / cross-feature)

---

## 7. Performance Rules

**Prevent re-renders:**

- `React.memo`
- `useMemo`
- `useCallback`

**Avoid:**

- Inline functions where they cause churn
- Unnecessary state

**Use:**

- Dynamic imports
- `next/image`

---

## 8. Search Optimization (MANDATORY)

All search inputs must use debounce.

**Rules:**

- 300–500ms delay
- Reusable hook: `src/hooks/useDebounce.ts`
- Use debounced value in query keys

---

## 9. Infinite Scroll (WHEN APPLICABLE)

- Use `useInfiniteQuery`

**Rules:**

- Intersection Observer only (no scroll listeners)
- Handle loading, end-of-list, and errors
- Example: `src/hooks/useInfiniteScroll.ts`

---

## 10. Tables

- Use `@tanstack/react-table`
- Memoize columns and data
- Prefer server-side pagination or infinite scroll

---

## 11. Toast Notifications (MANDATORY)

**Use toasts for:**

- API success / failure
- Actions (create / update / delete)
- System feedback

**Do not use toasts for:**

- Form validation errors (handle inline via Zod)

**Rules:**

- Centralized toast system
- Reusable component / hook: `src/components/ui/toast.tsx`, `src/hooks/useToast.ts`
- Toasts must be non-blocking, accessible (ARIA live region), and auto-dismissed

---

## Accessibility (A11y)

- Full ARIA compliance
- Keyboard accessible
- Semantic HTML
- Inputs must have labels
- Buttons must have accessible names

---

## SEO & Metadata

- Use the **App Router** `metadata` export (and/or `generateMetadata`) in `layout.tsx` / `page.tsx`
- Include title, description, Open Graph, and Twitter meta where needed
- Clean URLs; avoid duplicate metadata

---

## Web Vitals & Lighthouse

**Targets:**

- Performance ~100
- Accessibility 100
- Best Practices 100
- SEO 100

**Rules:**

- Optimize LCP, CLS, TBT
- Minimize JS
- Avoid layout shifts

---

## Security (Grade A Headers)

**Applied in middleware (`headers.ts` + `middleware.ts`):**

- HSTS (production)
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`
- `Permissions-Policy`
- COOP / CORP

**CSP:** Not sent in production. A nonce-based `Content-Security-Policy` blocked Next.js inline/bootstrap scripts (browser reported violations even for same-origin bundles). Re-enable only after following current Next.js CSP docs and end-to-end production testing. Helpers live in `src/lib/security/build-csp.ts` (unused).

**Verification:** Response headers (including CSP status) have been checked on **[securityheaders.com](https://securityheaders.com)** against the live deployment URL; the scan reports **grade A**.

Never trust client input.

---

## Styling (Tailwind)

- Tailwind only
- Avoid unnecessary inline styles

### Mobile responsiveness (MANDATORY)

- **Mobile-first:** Layouts and typography must work from small viewports up; use responsive breakpoints (`sm:`, `md:`, etc.) instead of desktop-only widths.
- **Touch-friendly:** Interactive targets (buttons, links, inputs) should be large enough and spaced to avoid mis-taps; avoid hover-only critical actions.
- **No horizontal trap:** Pages should not require horizontal scrolling at common phone widths unless intentional (e.g. wide tables with overflow scroll).
- **Readable:** Respect default font sizes and line length on narrow screens; test critical flows at ~375px width.
- **Viewport:** Use the standard responsive viewport meta (Next.js App Router provides this via metadata / defaults—do not override with fixed widths that break scaling).

---

## Testing

- Jest + React Testing Library

**Cover:**

- Components
- Hooks
- Utils

**Rules:**

- Test behavior
- Avoid excessive snapshots

---

## Code Quality

- Strict TypeScript
- No `any`
- Clean naming conventions

---

## Anti-Patterns

- Inline API calls in UI (use services / hooks + Query)
- Large, monolithic components
- Global state misuse
- Duplicate logic
- Direct DOM manipulation
- Non-debounced search
- Scroll listeners for infinite loading
- Toasts for form validation errors
- Desktop-only layouts (no responsive breakpoints; broken or clipped UI on mobile)

---

## Summary

The app must be:

- Performant (minimal re-renders)
- Scalable (modular)
- Accessible (ARIA compliant)
- **Mobile responsive** (usable on phones and tablets, mobile-first)
- SEO optimized
- Secure (strong baseline headers; CSP off until compatible with Next.js prod)
- UX optimized (debounce + infinite scroll + proper toasts)

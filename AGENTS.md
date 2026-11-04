<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project shape

- Single Next.js 16.4.5 App Router app, no workspaces. Package manager is **npm** (`package-lock.json`; ignore the yarn/pnpm/bun alternatives in README).
- All source is under `src/`; `@/*` → `./src/*`. Entry points: `src/app/layout.tsx` (root layout) and `src/app/page.tsx`.
- shadcn/ui primitives live in `src/components/ui/` (style `base-nova`, per `components.json`); app components in `src/components/`, hooks in `src/hooks/`, helpers in `src/lib/`.

## Commands

There is no test suite, CI, or formatter — verification is:

1. `npm run lint` (bare `eslint`, flat config)
2. `npx tsc --noEmit` (no npm script for this)
3. `npm run build` (also typechecks, so a type error fails the build)

Gotchas:

- Route type globals (`LayoutProps<"/">`, `PageProps`, …) are generated into `.next/types` and referenced by `next-env.d.ts` (both gitignored). On a fresh clone run `npx next typegen` (or `npm run dev`/`build`) first, or `tsc` fails with `Cannot find name 'LayoutProps'`.
- `npm run lint` fails out of the box: 2 pre-existing `react-hooks/set-state-in-effect` errors in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`. Not caused by your change.
- Add shadcn components with `npx shadcn add <name>` (CLI installed locally, configured by `components.json`).

## Conventions that differ from defaults

- **Base UI, not Radix.** Everything in `src/components/ui/` wraps `@base-ui/react`. There is **no `asChild` prop** — compose with `render={<Button … />}` instead (see `src/components/ui/dialog.tsx`), or `useRender()` for custom wrappers. Copying Radix/shadcn examples that use `asChild` fails typecheck (currently breaking: uncommitted `src/components/ModeToggle.tsx`, which fails both `tsc` and `next build`).
- **`cn` is the `cn` npm package**, not clsx + tailwind-merge; `src/lib/utils.ts` only re-exports it. Import as `import { cn } from "cn"`.
- **Tailwind v4, no `tailwind.config`.** Theme tokens/CSS vars live in `src/app/globals.css` (`@theme inline`, `:root`/`.dark`), and base shadcn styles come from the `shadcn/tailwind.css` import there. CSS is compiled by the `@tailwindcss/turbopack` loader rule in `next.config.ts`.
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`): components are auto-memoized — don't hand-roll `useMemo`/`React.memo` for performance.
- Dark mode is next-themes + a `.dark` class; keep `suppressHydrationWarning` on `<html>` or SSR hydration will warn.
- The root layout uses the generated global `LayoutProps<"/">` — no import needed; don't replace it with a hand-written `children` type.
- Code highlighting goes through `src/lib/highlighter.tsx`, which lazy-loads shiki against an explicit language allowlist — add new languages there, otherwise `loadHighlighter()` returns null.

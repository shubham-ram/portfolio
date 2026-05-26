# Portfolio Codebase Report

## 1. File Tree

```
src
├── App.jsx
├── index.css
├── main.jsx
├── assets
│   ├── avatar.webp
│   ├── materialui.svg
│   ├── mysql.svg
│   ├── nestjs.svg
│   ├── nextjs.svg
│   ├── nodejs.svg
│   ├── playwright.svg
│   ├── postgresql.svg
│   ├── reactjs.svg
│   ├── redux.svg
│   ├── socket.svg
│   ├── tailwindcss.svg
│   └── typescript.svg
├── components
│   ├── Background
│   │   └── Background.jsx
│   └── Navigation
│       └── FluidNav.jsx
├── constants
│   └── portfolio.js
├── hooks
│   └── useSoundEffect.js
├── lib
│   └── utils.js
└── sections
    ├── About.jsx
    ├── Contact.jsx
    ├── Experience.jsx
    ├── Hero.jsx
    └── Projects.jsx
```

Top-level config files: `vite.config.js`, `eslint.config.js`, `jsconfig.json`, `package.json`, `pnpm-lock.yaml`, `index.html`, `.env`, `.env.example`. There is **no** standalone `tailwind.config.js` or `postcss.config.js`; Tailwind v4 is wired through `@tailwindcss/vite` and theme tokens live inline in `src/index.css` via `@theme { ... }`.

## 2. Entry & Routing

- **`src/main.jsx`**: minimal — `createRoot(...).render(<App />)`, imports `./index.css`. No providers, no StrictMode.
- **`src/App.jsx`**: initializes a Lenis smooth-scroll instance in a `useEffect`, holds a `soundEnabled` state, and renders the layout. JSX return:

```jsx
return (
  <>
    <Background />
    <div className="relative z-10 w-full min-h-screen text-foreground selection:bg-primary/30 selection:text-white">
      <FluidNav
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
      />
      <main>
        <Hero soundEnabled={soundEnabled} />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  </>
);
```

- **Router**: not present. This is a single long-scroll SPA. Section render order: Hero → About → Experience → Projects → Contact (+ Footer rendered inside `Contact.jsx`). Note: `App.jsx` renders Experience **before** Projects, but the nav bar (`FluidNav`) lists items in the order Home, About, Work (=Projects), Experience, Contact — i.e. the nav order does not match the page order.

## 3. Sections / Pages

| # | Section | File | Content | Interactive |
|---|---|---|---|---|
| 1 | Hero | `src/sections/Hero.jsx` | Avatar, name, animated typewriter subtitle cycling through three role titles, "See My Work" + "Resume" CTAs. | Avatar hover scale + glow, dual rotating orbital rings around avatar, status dot pulse, typing/deleting role animation, "See My Work" smooth-scrolls to `#projects`. |
| 2 | About | `src/sections/About.jsx` | Bento-grid: bio card, "3+ Years of Experience" card, 12-icon tech stack grid, "India — Available for remote work" card. | Cards reveal on scroll-in-view via Framer Motion staggered variants; per-card hover gradients; tech-stack tiles have `whileHover` scale/lift. |
| 3 | Experience | `src/sections/Experience.jsx` | Vertical timeline with two roles: Instinct Innovations (current) and Cogoport. | Staggered slide-in on scroll-into-view. |
| 4 | Projects | `src/sections/Projects.jsx` | Two project cards (Barber Queue Tracking, JobPilot). | Mouse-following radial-gradient spotlight on each card (Framer `useMotionValue` + `useMotionTemplate`), staggered reveals. |
| 5 | Contact | `src/sections/Contact.jsx` | "Let's build something together." heading, "Say Hello" mailto button, 3 social icons (GitHub, LinkedIn, Email). Twitter icon commented out. Footer below. | Button + icon hover/tap scale. |

## 4. Projects Section — Verbatim Content

Project list is declared inline in `src/sections/Projects.jsx` (lines 10–37):

```js
const PROJECTS = [
  {
    id: 1,
    title: "Barber Queue Tracking",
    description:
      "A comprehensive Progressive Web App (PWA) that streamlines queue management for barbershops, offering real-time status tracking for customers and an intuitive dashboard for shopkeepers to manage their daily operations and services.",
    features: [
      "Role-based access control (RBAC) architecture securely separating shopkeeper administration and customer queue tracking interfaces.",
      "Dynamic queue and scheduling management, leveraging sophisticated state management and performant client-side form validation.",
    ],
    tech: ["React", "Vite", "Material UI", "PWA"],
    link: "https://barberqueue.in/",
    github: "https://github.com/vedantkirve/Barber-Queue-Management-Frontend",
  },
  {
    id: 2,
    title: "JobPilot",
    description:
      "A full-stack AI application that generates highly personalized, context-aware answers for job applications using Gemini AI, integrating user profile context and secure Turnstile bot protection.",
    features: [
      "Engineered a context-aware generation engine leveraging Gemini AI to dynamically synthesize user profiles with specific job descriptions for highly personalized application responses.",
      "Integrated Cloudflare Turnstile into a secure Express backend proxy to validate client-side interactions and prevent automated abuse of the LLM API.",
    ],
    tech: ["React", "Express", "IndexedDb", "TypeScript", "Gemini AI"],
    link: "#",
    github: "https://github.com/shubham-ram/JobPilot",
  },
];
```

Per-project audit:

| Project | Live link | GitHub link | Image |
|---|---|---|---|
| Barber Queue Tracking | `https://barberqueue.in/` — real URL | `github.com/vedantkirve/Barber-Queue-Management-Frontend` — real (note: not under the user's own GitHub account) | No image/screenshot referenced; component does not render any project thumbnail. |
| JobPilot | `"#"` — **placeholder, no live demo**; the "Live Demo" button is conditionally hidden when `link === "#"` | `github.com/shubham-ram/JobPilot` — real | No image/screenshot referenced. |

There is no `projects/` image folder in `public/` or `src/assets/`; the project cards are purely text + tech tags.

## 5. Hero / About — Verbatim Content

**Hero — name/role line** (rendered via `PORTFOLIO_INFO.name`):
```
Hi, I'm Shubham Ram
```

**Hero — typewriter subtitle** cycles these three strings (`src/sections/Hero.jsx:8`):
```js
const roles = ["Frontend Engineer", "UI Architect", "Creative Developer"];
```

**Hero — CTAs**: `See My Work` (scrolls to projects) and `Resume` (download).

**Hero — tooltip on avatar hover**: `👋 That's me!`

**About — heading + subtitle**:
```
About.
A bit about who I am and what I work with.
```

**About — bio card (verbatim, two paragraphs)**:
```
With over 3 years of experience in frontend engineering, I specialize in crafting pixel-perfect, performant web experiences. I love bridging the gap between design and engineering — turning complex interactions into smooth, intuitive interfaces.

Currently exploring WebXR, spatial UIs, and AI-powered developer tools. When I'm not coding, you'll find me exploring new design trends or tinkering with creative experiments.
```

**About — stat cards**: `3+` / `Years of Experience`; `India` / `Available for remote work`.

## 6. Contact Section

Contact data lives in `src/constants/portfolio.js`:

```js
export const PORTFOLIO_INFO = {
  name: "Shubham Ram",
  role: "Frontend Engineer",
  email: "shubhamram2k@gmail.com",
  github: "https://github.com/shubham-ram",
  linkedin: "https://www.linkedin.com/in/shubhamram/",
  resume:
    "https://drive.google.com/file/d/1ViGdXE9y0xPP9VFJhvLSUTWxF3xWsz4J/view?usp=sharing",
  resumeDownload:
    "https://drive.google.com/uc?export=download&id=1ViGdXE9y0xPP9VFJhvLSUTWxF3xWsz4J",
};
```

- Email: `mailto:shubhamram2k@gmail.com` (used by the "Say Hello" CTA and the email social icon).
- GitHub: `https://github.com/shubham-ram`
- LinkedIn: `https://www.linkedin.com/in/shubhamram/`
- Phone: **not present**.
- Twitter: present but commented out in `Contact.jsx`.
- **Contact form**: not present. The only contact path is a `mailto:` link.

## 7. Resume Link

Two surfaces use the resume:
- **Nav bar (`FluidNav.jsx`)** and **mobile menu**: open `PORTFOLIO_INFO.resume` (Google Drive *viewer* URL) in a new tab.
- **Hero "Resume" button**: uses `PORTFOLIO_INFO.resumeDownload` (Google Drive `uc?export=download` URL) with `download="Shubham_Ram_Resume.pdf"` attribute. Because this is a cross-origin URL the `download` filename hint will be ignored by the browser and a `view` page is more likely; the button essentially opens Drive.

Local PDF: `ShubhamRam_Resume.pdf` (61 KB) exists at the **repo root**, but it is **not** inside `public/`, so Vite will not serve it. Nothing in code references the local file. If the intent was a same-origin download, it is currently broken — the file needs to be moved to `public/` and referenced via `/ShubhamRam_Resume.pdf`.

## 8. Tech Stack — Actually Used vs Just Installed

| Dependency | Imported? | Where / What for |
|---|---|---|
| `framer-motion` | ✅ Yes | 7 files: `App` (none directly), `FluidNav`, `Background`, `Hero`, `About`, `Experience`, `Projects`, `Contact`. Core of all animation. |
| `gsap` | ❌ **No** | Zero imports anywhere in `src/`. Installed but unused; an unused `.reveal/.reveal.active` CSS class in `index.css` has a comment "Reveal animation class (GSAP adds this)" — leftover from a removed approach. |
| `lenis` | ✅ Yes | One file: `src/App.jsx`. Initializes global smooth scroll + RAF loop, imports `lenis/dist/lenis.css`. |
| `lucide-react` | ✅ Yes | 6 files (all sections + nav). Icons are named imports, so they tree-shake fine. |
| `use-sound` | ❌ **No** | Zero imports. `src/hooks/useSoundEffect.js` is a custom Web Audio API hook unrelated to the `use-sound` npm package. |
| `clsx` | ✅ Yes (indirectly) | Only `src/lib/utils.js` (in `cn`). |
| `tailwind-merge` | ✅ Yes (indirectly) | Only `src/lib/utils.js` (in `cn`). |

Two installed deps (`gsap`, `use-sound`) are **not used at all** — safe to remove.

## 9. Animations & Interactivity

- **Framer Motion**: pervasive — Hero (avatar reveal, orbital rings, typing cursor, CTA reveals), About (staggered bento cards, tech-tile hovers), Experience (timeline slide-ins), Projects (mouse-tracked radial spotlight using `useMotionValue` + `useMotionTemplate`, staggered reveals), Contact (button/icon hover/tap), FluidNav (`layoutId="nav-pill"` magic-pill active indicator, `AnimatePresence` mobile overlay), Background (mouse-following amber radial glow).
- **GSAP**: not used. No timelines, no ScrollTrigger.
- **Lenis**: enabled globally in `App.jsx` (duration 1.2, custom easing, `smoothWheel: true`). The CSS sets `html { scroll-behavior: auto; }` with the comment "Lenis handles this."
- **`use-sound` library**: not used. The custom `useSoundEffect` hook synthesizes `pop`/`click`/`tick`/`whoosh` via Web Audio oscillators; it respects `prefers-reduced-motion`. `soundEnabled` is initialized to `false` and the toggle UI is commented out in `FluidNav.jsx`, so in practice **no sounds ever play**.
- **Scroll behaviors**: `useInView({ once: true, margin: "-..." })` drives section reveals; `FluidNav` runs a `scroll` listener (passive) implementing scroll-spy that highlights the active section pill. No parallax.

## 10. Theming & Styling

- **Dark mode toggle**: none. The site is **dark-only**. Background is hard-coded `#0a0a0a`.
- **Tailwind config**: no `tailwind.config.js` file; Tailwind v4 reads tokens from `@theme { ... }` in `src/index.css`. Defined tokens include color CSS vars (`--primary: #f59e0b` amber, `--accent: #f97316` orange, plus background/foreground/muted/secondary/border/glass), radius vars, and two font families:
  - `--font-heading: "Space Grotesk", system-ui, sans-serif;`
  - `--font-body: "Inter", system-ui, sans-serif;`
- Custom utility classes in `index.css`: `.glass` (glassmorphism panel with blur), `.bg-dot-pattern`, `.bg-noise` (inline SVG fractal noise), `.text-gradient` (amber→orange→red linear gradient), `.section-padding`, and an unused `.reveal` class.
- **Fonts loaded**: Inter (300–700) + Space Grotesk (400–700) via Google Fonts `<link>` in `index.html` with `preconnect` hints.

## 11. Responsiveness

- 43 Tailwind responsive prefix occurrences (`sm:` / `md:` / `lg:` / `xl:`) across the source. Layouts genuinely adapt: Hero text sizes scale, About bento collapses to a single column on mobile, Experience uses `pl-12 md:pl-20`, Projects card header switches from row to column, etc.
- **Mobile navigation**: `FluidNav` hides the desktop pill nav below `md` and instead renders a hamburger button that opens a full-screen `AnimatePresence` overlay with stacked nav links and bottom-aligned socials. Background scroll is locked while open.

## 12. Accessibility

- Buttons and links use semantic `<button>`/`<a>` (Framer `motion.button`/`motion.a` underneath). No div-onClick handlers observed.
- `aria-label` attributes: **8** occurrences — mobile menu toggle, social icons in nav, social icons in Contact, project card GitHub/Source-Code icon buttons. The "See My Work" and "Say Hello" buttons rely on visible text.
- **Alt text**: 2 `alt=` occurrences — `avatar.webp` (`alt="Shubham's avatar"`) and the tech-stack `<img>` inside the `techStack.map` (`alt={tech.name}`, so all 12 icons get correct alt). No images are missing alt.
- **Focus styles**: none defined globally. The browser default focus ring is the only indicator; no `:focus-visible`, no ring utilities. Keyboard users will struggle to see focus on glass buttons.
- The `useSoundEffect` hook honors `prefers-reduced-motion`, but Framer Motion animations themselves are not gated on it.

## 13. Performance Concerns

- **Component files** in `src/`: 12 (`.js` + `.jsx` combined).
- **Star imports**: none — every import is named/default, so tree-shaking should work cleanly.
- **Assets** (all under 500 KB; largest is the avatar at 33 KB):
  - `src/assets/avatar.webp` — 33 KB (already WebP, good)
  - Tech icons — 12 SVGs, ~647 B – 6.6 KB each
  - `public/favicon.svg` — 545 B
  - `ShubhamRam_Resume.pdf` (root, 61 KB) — not served
  - No PNG/JPG bloat anywhere.
- **Code splitting / lazy loading**: none. No `React.lazy`, no dynamic `import()`, no `Suspense`. Everything ships as one bundle. For a 5-section landing page this is fine, but Framer Motion is large and the typing animation in Hero will block first paint on the main bundle.
- `App.jsx` does not wrap in `<StrictMode>`.

## 14. SEO

- `index.html` is the only HTML file; this is a pure CSR SPA (Vite + React, no SSR/SSG).
- No `react-helmet` / `next/head` / dynamic `<title>` management. The static `<title>` is `Shubham — Frontend Engineer`.
- Meta description present; keywords/author/theme-color present; OG + Twitter cards present.
- **Confirmed mismatch**: `og:url` and `twitter:url` both still point to `https://shubham-ram.github.io/`, and the commented-out sitemap line in `public/robots.txt` also references `shubham-ram.github.io`. Per the live URL the canonical host is `shubham-ram.com` — needs updating in both files.
- `og:image` / `twitter:image` both point to `/favicon.svg`, which is a 545 B icon and will look broken when LinkedIn/Twitter render a card preview. A real 1200×630 OG image is missing.
- Google Analytics + Microsoft Clarity script tags use Vite envs (`%VITE_GA_ID%`, `%VITE_CLARITY_ID%`) — these will only be substituted at build time; if the env vars aren't set, the literal token leaks into the HTML.

## 15. Dead Code / TODOs / Inconsistencies

- No `TODO` / `FIXME` / `HACK` comments anywhere.
- No `console.log` statements in `src/`.
- **Commented-out blocks longer than 5 lines**: two in `src/components/Navigation/FluidNav.jsx` — the desktop sound-toggle button (lines ~141–150) and the mobile sound-toggle button (lines ~258–266), plus commented `Volume2`/`VolumeX` imports at the top and a commented Twitter social in `Contact.jsx`. The whole sound feature is wired but UI-disabled, which matches the most recent commit message *"refactor: comment out sound toggle functionality and associated UI elements in FluidNav"*.
- **`gsap` and `use-sound`** are in `package.json` but imported nowhere. `gsap` even has a leftover `.reveal` CSS class with a comment claiming "GSAP adds this," but nothing does.
- **Section order mismatch**: page renders Experience → Projects; the nav lists Work (Projects) → Experience. Clicking nav links still works (smooth-scroll by id) but the scroll-spy will visually "jump backwards" when scrolling through.
- **JobPilot** has `link: "#"` — the Live Demo button is hidden, but the project is the only one of two without a demo, leaving the section visibly asymmetric.
- **Footer copyright** says `© 2026 Ram.` (just "Ram", not "Shubham Ram"). Probably intentional shorthand, worth flagging.
- **Avatar styling**: `className="... relative top-[30px] scale-125"` shifts and zooms the image inside a rounded container — looks like a hack to crop the avatar; brittle if the asset is ever swapped.
- **`.env`** is checked into the repo (50 bytes). Worth confirming it does not contain secrets; analytics IDs are not strictly secret but should typically not be committed.

## 16. Anything Notable

- **Custom Web Audio hook** (`useSoundEffect.js`) is genuinely clever — generates `pop`/`click`/`tick`/`whoosh` via oscillators + a band-passed white-noise burst, with a `prefers-reduced-motion` guard. But it's currently dead weight since `soundEnabled` defaults to `false` and the UI to toggle it is commented out.
- **Mouse-tracked radial spotlight** on Project cards using Framer's `useMotionValue` + `useMotionTemplate` is a nicely executed Aceternity-style effect.
- **`layoutId="nav-pill"` + `layoutId="nav-glow"`** on the active nav button is a clean magic-move implementation.
- **Dual counter-rotating orbital rings** around the Hero avatar plus a pulsing emerald status dot is the most visually distinctive flourish.
- **No StrictMode** in `main.jsx` and no error boundary anywhere.
- **`scroll-spy` implementation** in `FluidNav` runs on every `scroll` event (passive, but not throttled/RAF'd) and uses `offsetTop` reads inside the listener — fine at this scale but would jank with more sections.
- **Tailwind v4 setup is unusual**: design tokens live entirely inside `@theme {}` in `index.css` and there is no `tailwind.config.js`. This is the newest Tailwind pattern; worth knowing if the resume claims "Tailwind config" expertise — the project demonstrates the new directive-based config, not the JS config.
- **No tests** of any kind (no `__tests__`, no `*.test.*`, no Vitest/Playwright config), despite Playwright being listed in the About tech stack and Experience bullets.

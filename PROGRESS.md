# PROGRESS

## 2026-07-15

### Task Description

Add entrance and exit scroll transitions for all page sections.

### Files Modified

- [App.tsx](file:///Users/louis/coding/my-portfolio/src/App.tsx)
- [App.css](file:///Users/louis/coding/my-portfolio/src/App.css)
- [STATUS.md](file:///Users/louis/coding/my-portfolio/STATUS.md)
- [PROGRESS.md](file:///Users/louis/coding/my-portfolio/PROGRESS.md)
- [HANDOFF.md](file:///Users/louis/coding/my-portfolio/HANDOFF.md)

### Summary of Implementation

- Set up an `IntersectionObserver` React hook inside `src/App.tsx` to automatically listen and toggle `.section-in-view` and `.section-out-view` classes when a section becomes visible (at least 15% threshold).
- Styled internal headings, paragraphs, Technical Universe grids, polaroids, and experience timelines inside `src/App.css` to slide and fade in/out using premium staggered delays.
- Optimized scroll transitions inside `src/App.css` to use GPU-accelerated `translate3d` transforms and `will-change` properties, ensuring lag-free rendering at 60fps/120fps even during rapid scrolling.
- Configured the navbar Resume button to point to `/Louis_Tai_Yoong_Wei_Resume.pdf` (later updated to `/latest_resume.pdf`) and open in a new tab without forcing auto-download.
- Reverted the mobile responsive menu drawer changes, restoring the TopNavBar to its original layout configs.
- Verified build and linter cleanliness.

### Validation Performed

- Checked eslint and typescript compilations using `npm run lint`.
- Successfully compiled assets via `npm run build`.

## 2026-07-14

### Task Description

Remove grayscale class name filters from project card images, and configure the Visit Platform button for Ouch Core System to link to its website.

### Files Modified

- [App.tsx](file:///Users/louis/coding/my-portfolio/src/App.tsx)
- [STATUS.md](file:///Users/louis/coding/my-portfolio/STATUS.md)
- [PROGRESS.md](file:///Users/louis/coding/my-portfolio/PROGRESS.md)
- [HANDOFF.md](file:///Users/louis/coding/my-portfolio/HANDOFF.md)

### Summary of Implementation

- Removed `grayscale` classes and hover grayscale transformations from all project cards.
- Converted the Ouch Core card button to an anchor link pointing directly to `https://ouch.my/`.
- Integrated `FontAwesomeIcon` modules to render standard vector icons for email, github, linkedin, and instagram in the About Me and Get In Touch sections.
- Expanded the About Me slideshow component from `3` to `9` photos, creating the transition class `.polaroid-hidden` and clean indexing modulo logic to tuck inactive photos smoothly out of site.
- Removed staggered translation offsets and set opacity of background stack cards to 0 in `src/App.css` so they stack on top of each other and display a single card at a time.
- Migrated the polaroid list to a dynamic static array (`polaroidImages`) inside `src/App.tsx`, resolving indexing limitations and ensuring the loop length updates automatically based on content size.
- Corrected the `getPolaroidClass` position indexing map to cycle through all 9 photos sequentially forward.
- Cleaned up the unused `ouchImg` import block.
- Verified build and linter cleanliness.

### Validation Performed

- Checked eslint and typescript compilations using `npm run lint`.
- Successfully compiled assets via `npm run build`.

## 2026-07-13

### Task Description

Recreate the resume portfolio React application and configure a fixed top navigation bar that stays in viewport at all times.

### Files Modified

- [App.tsx](file:///Users/louis/coding/my-portfolio/src/App.tsx)
- [App.css](file:///Users/louis/coding/my-portfolio/src/App.css)
- [index.css](file:///Users/louis/coding/my-portfolio/src/index.css)
- [STATUS.md](file:///Users/louis/coding/my-portfolio/STATUS.md)
- [PROGRESS.md](file:///Users/louis/coding/my-portfolio/PROGRESS.md)
- [HANDOFF.md](file:///Users/louis/coding/my-portfolio/HANDOFF.md)

### Summary of Implementation

- Connected to the **Stitch MCP** server to discover user projects and retrieve screen assets.
- Recreated the entire Stitch design in React (`src/App.tsx`, `src/App.css`, `index.html`), converting Tailwind CSS configurations, Google Fonts, and custom design variables.
- Pinned the top navigation bar permanently (`position: fixed`) and configured a scroll spy effect to track active sections.
- Converted the polaroid stack inside the "About Me" section into an automatically looping slideshow using a custom interval timer and dynamic z-index / transform transitions.
- Applied the **Stitch Industrial Mono** preset configurations (warm-light body background `#fcf9f7`, carbon text `#1b1c1b`, Roboto Mono and Roboto Condensed typography).
- Centered the vertical timeline connector line horizontally under the "Work Experiences" section and configured it to connect dots cleanly.
- Verified build and linter cleanliness.

### Validation Performed

- Checked eslint and typescript compilations using `npm run lint`.
- Successfully compiled assets via `npm run build`.

## 2026-06-26

### Task Description

Move the portfolio UI into the sibling Vite app and make Vite the active project.

### Files Modified

- `src/App.tsx`
- `src/App.css`
- `src/index.css`
- `index.html`
- `package.json`
- `package-lock.json`
- `README.md`
- `STATUS.md`
- `PROGRESS.md`
- `HANDOFF.md`
- `docs/architecture.md`
- `docs/folder-structure.md`
- `docs/setup.md`

### Summary of Implementation

- Replaced the Vite starter UI with the portfolio intro section.
- Added Font Awesome React rendering with GitHub, LinkedIn, and envelope icons.
- Added `@fortawesome/react-fontawesome`.
- Downgraded Vite tooling from Vite 8 to Vite 6.4.3 and `@vitejs/plugin-react` 4.7.0 so the app runs on local Node `20.11.0`.
- Added Vite-focused project documentation.

### Validation Performed

- Ran `npm run lint` successfully.
- Ran `npm run build` successfully.

### Remaining Concerns

- Contact icons need real links.
- ESLint 10 dependencies still warn about preferring Node `20.19+`.
- The old Next.js project folder should be removed after confirming this Vite app is the final location.

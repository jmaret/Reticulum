# Reticulum

A public room that teaches R. The first page runs from the top of a script through copy-on-modify, `NA`, and errors. `/further` continues with S3 methods and tables. `/practice` covers packages that ship with R, plots, and summaries. Checks are graded in the browser. Try it runs that program with WebR in this browser, and shows a plot when the program draws one.

The product name is Reticulum.

## Layout

- `src/app` — the short lessons, `/further`, `/practice`, `/play`, the language, vision, architecture, releases
- `content/lessons.ts` — the first page
- `content/further.ts` — S3 methods through missing values
- `content/practice.ts` — packages, plots, and summaries
- `docs` — vision and architecture, rendered in summary on those pages
- `public/hero-bg.svg` — stars, math, and statistics

## Local checks

```sh
npm install
npm run dev
```

`npm run build` writes a static site to `out/`.

## Deploy

`npm run build` writes a static site to `out/`. GitHub Pages serves that export from `main` through `.github/workflows/pages.yml`. The public site is https://reticulum.aathira-services.com/, so the Pages build leaves asset paths at the site root. https://jmaret.github.io/Reticulum/ redirects there.

## Docs

A change under `src/` or `content/` also updates `docs/VISION_AND_REQUIREMENTS.md`, `docs/ARCHITECTURE_AND_DESIGN.md`, and `CHANGELOG.md`. The vision and architecture pages render the Summary of those files. The releases page renders the changelog. The architecture pictures and the Mermaid diagrams change together.

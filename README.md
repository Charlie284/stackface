# stackface

Generate a tech-stack SVG portrait from a photo.

Built with Vite, React, TypeScript, Tailwind CSS, React Router, Framer Motion, and Lenis. Existing content and core interactions are preserved in React components; browser and canvas work uses TypeScript modules.

## Run

Use Node.js 24 or newer.

```sh
npm ci
npm run dev
```

## Check and build

```sh
npm run typecheck
npm run build
```

`npm run preview` serves the production build locally. Publish the contents of `dist/`. The build emits HTML entry aliases for the former `.html` URLs and clean route URLs, plus a `404.html` fallback. `_redirects` supports hosts that understand SPA rewrites.

For a subdirectory deployment, set `VITE_BASE_PATH=/repository-name/` when building. Keep the trailing slash. React Router and local asset URLs use this base.

Lenis smooth scrolling and Framer Motion page transitions respect reduced-motion preferences. Tailwind utilities are enabled without a reset so the original styling remains intact.

Background removal lazily downloads a browser model through `@imgly/background-removal`. If unavailable, generation continues without removal. The photo stays in this browser tab. The generated dark/light SVGs and README snippet can be downloaded.

## License

See [LICENSE](LICENSE).

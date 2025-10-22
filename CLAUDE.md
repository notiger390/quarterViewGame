# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Angular 19 project using p5.js for canvas-based rendering and PrimeNG 19 for UI components. The application is designed to be deployed to GitHub Pages.

## Architecture

### Frontend Stack
- **Angular 19.2**: Standalone components architecture (no NgModules)
- **p5.js 2.0**: Canvas rendering library for graphics/game development
- **PrimeNG 19**: UI component library with Aura theme preset
- **TypeScript 5.7**: Type-safe development

### Key Architectural Patterns

**p5.js Integration Pattern:**
The project uses instance mode p5.js integrated with Angular components. See `src/app/components/p5-canvas/p5-canvas.component.ts` for the reference implementation:
- p5 instances are created in `ngOnInit()` and bound to component's `ElementRef`
- Cleanup happens in `ngOnDestroy()` by calling `p5Instance.remove()`
- The sketch function is passed to the p5 constructor with setup/draw callbacks

**PrimeNG Configuration:**
PrimeNG is configured globally in `app.config.ts` using the new providePrimeNG pattern:
- Theme: Aura preset from `@primeuix/themes`
- Dark mode is disabled (`darkModeSelector: false`)
- Animations are provided via `provideAnimationsAsync()`

**TypeScript Configuration:**
p5.js types are enabled in `tsconfig.app.json` by adding `"types": ["p5"]` to compilerOptions.

## Development Commands

All commands should be run from the `client/` directory:

```bash
# Development server (http://localhost:4200)
npm start

# Production build
npm run build

# Watch mode (rebuilds on file changes)
npm run watch

# Run tests
npm test

# Generate new component
ng generate component components/component-name
```

## Deployment

### GitHub Pages Deployment
The project uses GitHub Actions for automated deployment to GitHub Pages:
- Trigger: Push to `release` branch
- Workflow: `.github/workflows/deploy.yml`
- Base href: `/quarterViewGame/` (configured in build command)
- Output: `client/dist/client/browser/`

**Build Configuration Notes:**
- Budget limits have been increased to accommodate p5.js and PrimeNG (10MB max for initial bundle)
- Production builds use `--base-href=/quarterViewGame/` for GitHub Pages compatibility

### Manual Build for GitHub Pages
```bash
cd client
npm run build -- --base-href=/quarterViewGame/
```

## Project Structure

```
client/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── p5-canvas/     # p5.js canvas component
│   │   ├── app.component.ts   # Root component (minimal, just hosts p5-canvas)
│   │   ├── app.config.ts      # App-level providers (PrimeNG, animations, routing)
│   │   └── app.routes.ts      # Routing configuration
│   ├── styles.scss            # Global styles (includes PrimeIcons)
│   └── main.ts                # Bootstrap entry point
└── angular.json               # Angular CLI configuration
```

## Important Configuration Files

**angular.json:**
- Budget limits are set high (10MB) to accommodate p5.js and PrimeNG libraries
- Default configuration is `production`

**tsconfig.app.json:**
- Includes p5 types explicitly

**app.config.ts:**
- PrimeNG theme configuration
- Animation providers
- Zone.js configuration with event coalescing

## Dependencies Management

When adding new dependencies:
- Angular packages must be version 19.x
- PrimeNG must be version 19.x (not 20.x which requires Angular 20+)
- Use `@primeuix/themes` for PrimeNG theming (not legacy CSS imports)

## Common Gotchas

1. **PrimeNG Styles**: Don't import legacy CSS paths like `primeng/resources/themes/...`. Use the new `providePrimeNG` configuration in app.config.ts instead.

2. **p5.js Cleanup**: Always call `p5Instance.remove()` in `ngOnDestroy()` to prevent memory leaks and multiple sketch instances.

3. **GitHub Pages Base Href**: Production builds for GitHub Pages must include `--base-href=/quarterViewGame/` or routing will break.

4. **Bundle Size**: The budget limits have been intentionally increased. If you need to reduce bundle size, consider lazy loading PrimeNG components.

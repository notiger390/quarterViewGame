# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Angular 19 project using p5.js for canvas-based rendering and PrimeNG 19 for UI components. The application is a quarter-view game where users can freely move around in rooms and customize their avatars. The application is designed to be deployed to GitHub Pages.

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

## Coding Standards

### TypeScript Best Practices
- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

### Angular Best Practices
- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images (does not work for inline base64 images)

### Components
- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead

### State Management
- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

### Templates
- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

### Services
- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

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

## Documentation Management

This project maintains multiple documentation files for different purposes:

### Documentation Structure

- **`docs/todo.md`**: Task management, development progress, and technical notes (Japanese)
  - Tracks current and planned tasks
  - Records technical decisions and discoveries
  - Maintained collaboratively with Claude Code

- **`CLAUDE.md`** (this file): Technical instructions for Claude Code and coding standards (English)
  - Architectural patterns and conventions
  - Development commands and workflows
  - Configuration details

- **`README.md`**: Project overview and setup instructions (Japanese)
  - High-level project description
  - Getting started guide
  - Links to other documentation

### Update Guidelines

- When adding new tasks or features, update `docs/todo.md` first
- Technical decisions and architectural changes should be reflected in `CLAUDE.md`
- Keep `README.md` focused on user-facing information and setup
- All communication with Claude Code regarding tasks should be documented in `docs/todo.md` (in Japanese)

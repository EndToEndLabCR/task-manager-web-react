# Current Implementation

> A constructive, positive description of what has been built and how it is structured.

---

## Architecture Overview

### Folder / Module Structure

The project follows a **domain-driven feature structure** under `src/`:

```
src/
├── assets/             # Static asset re-exports
├── features/           # Domain modules (auth, dashboard, home, projects, tasks)
│   └── <domain>/
│       ├── components/ # Presentational components
│       ├── hooks/      # Business-logic hooks
│       ├── mocks/      # Static fixture data
│       ├── pages/      # Route-level components
│       ├── services/   # Service stubs (ready for API integration)
│       └── types/      # TypeScript interfaces and type aliases
├── infrastructure/     # Cross-cutting infrastructure stub
├── routing/            # Centralised router definition
├── shared/             # Shared UI components, hooks, and utilities
│   ├── components/     # AppLayout, Sidebar, AppNavbar, AppFooter
│   ├── hooks/          # Shared hook stubs
│   └── utils/          # Pure utility functions (date formatting, etc.)
├── store/              # Global state placeholder
└── styles/             # Global SCSS: _variables.scss, global.scss
```

This structure makes it easy to navigate to any concern by domain. A new engineer can open `src/features/projects/` and find everything related to projects in one place without grepping the whole repository.

### Component Hierarchy

```
App (ConfigProvider)
└── AppRouter (BrowserRouter + Suspense)
    ├── Home               (public landing page, lazy-loaded)
    ├── Login              (lazy-loaded)
    ├── Register           (lazy-loaded)
    ├── PasswordReset      (lazy-loaded)
    └── AppLayout          (shared shell)
        ├── Sidebar
        ├── Dashboard       (lazy-loaded)
        ├── Projects        (lazy-loaded)
        │   ├── ProjectsHeader
        │   ├── ProjectGrid → ProjectCard (×N)
        │   ├── ProjectListItem (×N, list mode)
        │   ├── ProjectFormModal → ProjectColorPicker
        │   └── ProjectFilterDrawer
        ├── ProjectDetail   (lazy-loaded)
        └── Tasks           (lazy-loaded)
```

### Separation of Concerns

The Projects feature — the most complete module — demonstrates clean three-layer separation:

| Layer     | Location                          | Responsibility                              |
|-----------|-----------------------------------|---------------------------------------------|
| UI        | `components/`, `pages/`           | Render and capture user input               |
| Logic     | `hooks/useProjects.ts` etc.       | State transitions, derived data, navigation |
| Data      | `mocks/projects.mock.ts`          | Static fixture data (ready to swap for API) |

The `Projects.tsx` page component is a thin orchestrator: it calls three hooks, wires their outputs to sub-components, and contains no business logic of its own.

---

## State Management

### Current Approach

State is managed entirely at the feature level using React's built-in primitives:

- **`useProjects`** — owns the `projects[]` array (initialised from mock data), a `sortBy` cursor, and a derived `sortedProjects` list computed with `useMemo`.
- **`useProjectModal`** — owns modal open/close state and the `editingProject` reference; delegates mutation to the `updateProject` callback it receives from `useProjects`.
- **`useProjectFilters`** — owns filter drawer state and the `ProjectFilters` object; exposes a pure `applyFilters(projects)` function.

This pattern cleanly separates three orthogonal concerns (data, modal UI state, filter state) into three composable hooks.

### Global vs. Local State Balance

All current state is local to the Projects feature. There is a `src/store/` directory that serves as a prepared placeholder for a future global store (Redux RTK, Zustand, etc.), which makes the transition to shared state a structural decision rather than a refactor.

---

## Component Design

### Reusability

Presentational components in the `projects` feature all accept typed props and have no internal data fetching. `ProjectCard`, `ProjectGrid`, `ProjectListItem`, `ProjectColorPicker`, `ProjectFormModal`, and `ProjectFilterDrawer` are all stateless and reusable in any context that can supply the required props.

Shared components (`Sidebar`, `AppLayout`, `AppNavbar`, `HomeNavbar`, `AppFooter`) are similarly stateless and configurable via props.

### Composition Patterns

The `Projects` page composes the feature from small, purpose-built pieces rather than building a single monolithic component. Each sub-component owns its own visual concern:

- `ProjectsHeader` — toolbar (sort, filter, view toggle, new project button).
- `ProjectGrid` — grid-layout wrapper around `ProjectCard` instances.
- `ProjectListItem` — single-row list renderer (list-mode counterpart to `ProjectCard`).
- `ProjectFormModal` — create/edit form wrapped in a modal.
- `ProjectFilterDrawer` — filter panel in an Ant Design `Drawer`.
- `ProjectsEmpty` — zero-state placeholder.

### Smart vs. Dumb Components

Pages are *smart* (orchestrate hooks, own view-mode state). All components under `components/` are *dumb*: they receive props and emit events via callbacks. The hooks form the middle tier — they are smart in terms of logic but unaware of rendering.

---

## Styling Approach

### SCSS Structure

Each component has a co-located `.scss` file that uses **BEM methodology** consistently:

```
.project-card { ... }
.project-card__header { ... }
.project-card__name { ... }
.project-card--highlighted { ... }   // modifier pattern
```

This keeps styles component-scoped by convention even without CSS Modules.

### SCSS Variables

A single `src/styles/_variables.scss` file centralizes all design tokens:

- **Colors**: `$primary-color`, `$secondary-color`, `$text-primary`, `$text-secondary`, `$text-muted`, `$border-color`, `$error-color`, `$success-color`.
- **Spacing**: `$spacing-xs` through `$spacing-xxl` (4 px–48 px scale).
- **Typography**: `$font-family`, `$font-size-sm` through `$font-size-xxl`.
- **Border radius**: `$radius-sm`, `$radius-md`, `$radius-lg`.
- **Shadows**: `$shadow-card`, `$shadow-elevated`.
- **Breakpoints**: `$breakpoint-xs` through `$breakpoint-xl`.

This variable set maps closely to the Ant Design theme tokens configured in `App.tsx`, providing a single source of truth for design decisions.

### Ant Design Integration

`App.tsx` wraps the entire application in `ConfigProvider` with theme token overrides (`colorPrimary`, `borderRadius`, `fontFamily`) and the `esES` locale. This ensures all Ant Design components share the same visual baseline without per-component overrides.

---

## Readability

### Naming Conventions

- Components: `PascalCase` (`ProjectCard`, `ProjectsHeader`).
- Hooks: `camelCase` with `use` prefix (`useProjects`, `useProjectModal`).
- SCSS classes: BEM kebab-case (`.projects-header__actions`).
- Constants: `SCREAMING_SNAKE_CASE` (`MOCK_PROJECTS`, `NAV_ITEMS`, `DEFAULT_FILTERS`).
- Type/interface names: `PascalCase` (`ProjectFormValues`, `ProjectFilters`, `ViewMode`).

These conventions are consistent throughout the implemented code, making the project predictable to navigate.

### Component Clarity

Page components read like high-level descriptions of the UI: `Projects.tsx` is approximately 80 lines long and clearly shows what sections exist and which hook drives each one. Sub-components are short (most under 60 lines) with a single visual responsibility.

### Code Simplicity

The `useProjects` hook uses `useMemo` for the sort derivation — a straightforward and idiomatic React optimization. The `applyFilters` function in `useProjectFilters` is a pure array filter, easy to read and test in isolation.

---

## Maintainability

### Modularity

Because every feature is self-contained under its own folder, adding a new domain (e.g., `calendar`) requires only creating a new folder and registering the route — no changes to unrelated modules.

### Ease of Extending Components

`ProjectsHeader` accepts an `isEmpty` flag and an `activeFilterCount` badge count via props, allowing the calling page to control disabled states and indicators without the header needing to know about the data. This makes the component easy to extend with new toolbar actions.

`ProjectFormModal` is driven by `initialValues`, making the create/edit duality a single component rather than two.

### Clear Boundaries

The `types/project.types.ts` file exports all domain types in one place, including `DEFAULT_FILTERS`. Any component or hook that needs project domain knowledge imports from this single module, reducing duplication.

---

## Scalability

### State Structure

The hook-based state architecture is well-positioned for an upgrade to a proper global store. The `updateProject` callback pattern used between `useProjects` and `useProjectModal` would translate directly to a Redux action dispatch or a React Query mutation, with minimal changes to the consuming components.

### Component Reuse

The presentational components (`ProjectCard`, `ProjectFormModal`, etc.) have no internal dependencies on the mock data layer — they receive everything they need via props. This means they will remain unchanged when real API data replaces the mocks.

### Code Splitting / Lazy Loading

All route-level components are wrapped in `React.lazy`:

```tsx
const Projects = lazy(() => import("../features/projects/pages/projects/Projects"));
const ProjectDetail = lazy(() => import("../features/projects/pages/project-detail/ProjectDetail"));
// ...
```

A single `Suspense` boundary at the router level displays a full-screen `Spin` loader while any page chunk loads. This provides automatic per-route code splitting with zero runtime overhead.

---

## TypeScript Usage

### Type Safety

TypeScript is used throughout. All component props interfaces are explicitly typed, all hook return values are implicitly inferred from typed state, and all event handler parameters are typed.

### Interfaces and Generics

The `Form.useForm<RegisterFormValues>()` generic call in `RegisterForm` is a good example of type-safe Ant Design form usage — field access will be typed and IDE-completing.

`ProjectFormValues` and `ProjectFormModalProps` are defined in the same `types/` file as the `Project` entity, making the domain type model self-contained and discoverable.

### Strictness

TypeScript is configured with `tsc -b` in the build script; all files use `.tsx`/`.ts` extensions. `any` does not appear anywhere in the codebase, which is a meaningful signal of typing discipline.

---

## API / Data Layer

### Data Fetching Patterns

Each feature includes a `services/` directory (currently stubs with empty exports) and a `mocks/` directory with typed fixture data. This two-folder pattern is intentional: the hooks import from mocks today, but the substitution path to importing from services is already architecturally clear.

### Separation from UI

`useProjects` owns data loading logic — even though it currently just initialises from a static array, it exposes a `setLoading` function and a `loading` state, signaling the intent to wire it to an async fetch call. The UI (`Projects.tsx`) already consumes `loading` to show skeleton cards.

---

## Testing Strategy

The repository does not yet have a test suite. The `src/features/projects/hooks/` and `src/shared/utils/` directories contain pure logic functions (`applyFilters`, `formatRelativeDate`, `getPasswordStrength`) that are well-suited for unit testing with Vitest and do not require DOM rendering.

---

## Performance Considerations

- **`useMemo` for sorting**: `sortedProjects` in `useProjects` is only recomputed when `sortBy` or `projects` changes, avoiding unnecessary re-sorts on unrelated renders.
- **Route-level code splitting**: the `React.lazy` pattern ensures each page's JavaScript is fetched only when the user navigates to it.
- **`destroyOnClose` on `ProjectFormModal`**: the modal's internal DOM is destroyed when closed, preventing hidden form state from persisting between sessions.

---

## What Should Be Preserved and Reinforced

- Feature-based folder structure with co-located types, hooks, mocks, and services.
- BEM SCSS methodology and centralized variable tokens.
- Custom hooks as the logic layer between pages and data.
- TypeScript `interface`-based prop definitions on every component.
- `React.lazy` + `Suspense` for all route-level components.
- `ConfigProvider`-level Ant Design theming in `App.tsx`.
- Pure, props-driven presentational components.
- `DEFAULT_FILTERS` constant exported alongside the `ProjectFilters` type.

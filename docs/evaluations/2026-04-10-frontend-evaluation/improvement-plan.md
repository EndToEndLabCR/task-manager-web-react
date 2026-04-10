# Improvement Plan

> A phased roadmap for moving from the current prototype state to a production-ready application.

---

## Phase 1 – Quick Wins

**Goal:** Eliminate obvious bugs, clean up dead code, and improve readability with minimal risk of regressions.
**Estimated effort:** 1–2 days

---

### Tasks

#### 1.1 Fix the `LoginForm` missing `onFinish` handler
- Add `onFinish={handleSubmit}` to the `<Form>` component in `LoginForm.tsx`.
- Implement `handleSubmit` as a typed callback that calls a stub auth service and navigates on success.
- Mirror the pattern already established in `RegisterForm.tsx`.

**Benefit:** The login form will no longer silently swallow submissions.

---

#### 1.2 Remove `console.log(values)` from `RegisterForm.handleSubmit`
- Delete or replace the `console.log` with a `// TODO: call auth service` comment.

**Benefit:** Prevents credential exposure in the browser console.

---

#### 1.3 Remove the unused `Button` import from `App.tsx`
- Delete `import { Button } from "antd";` from `App.tsx`.
- Enable `@typescript-eslint/no-unused-vars` in `eslint.config.js` to catch similar issues going forward.

**Benefit:** Cleaner entry point; lint enforcement prevents recurrence.

---

#### 1.4 Fix array-index keys in `HeroSection`
- Replace `key={i}` with `key={item}` in the task-row list.

**Benefit:** Correct React list key usage; no visible change.

---

#### 1.5 Rename the `Sidebar` interface to `SidebarUser`
- Update `sidebar.types.ts`: rename `interface Sidebar` → `interface SidebarUser`.
- Update all import sites: `Sidebar.tsx`, `auth.mock.ts`, `sidebar.types.ts` (re-export), `SidebarProps.user`.

**Benefit:** Eliminates naming confusion; the `Sidebar` component name and the `SidebarUser` data type are now distinct.

---

#### 1.6 Align password minimum length with strength scoring
- Change the Ant Design validation rule in `RegisterForm` from `{ min: 6 }` to `{ min: 8 }`.
- This aligns the form rule with the first scoring condition in `getPasswordStrength`.

**Benefit:** Eliminates the contradiction between the validation pass threshold and the "WEAK" strength indicator.

---

#### 1.7 Remove `@types/react-router-dom` from `devDependencies`
- Run `npm uninstall @types/react-router-dom`.
- `react-router-dom` v6+ bundles its own types; the v5 `@types` package may conflict.

**Benefit:** Eliminates potential type conflicts; reduces dependency count.

---

#### 1.8 Fix the `dasboard` folder typo
- Rename `src/features/dashboard/pages/dasboard/` → `src/features/dashboard/pages/dashboard/`.
- Update the import in `AppRouter.tsx`.

**Benefit:** Consistent, correctly spelled folder path.

---

#### 1.9 Consolidate global stylesheets
- Move rules from `src/App.css` into `src/styles/global.scss`.
- Remove the `App.css` file and its import from `App.tsx`.

**Benefit:** Single global stylesheet entry point; clearer cascade.

---

#### 1.10 Fix the duplicate wildcard route in `AppRouter`
- Remove the first `<Route path="*" element={<Navigate to="/" replace />} />` that appears before the protected route block (it is unreachable and shadows the second one).

**Benefit:** Removes dead code; prevents future confusion about route matching order.

**Suggested tools/patterns:** Standard file rename, `npm uninstall`, direct code edits. No new dependencies.

---

## Phase 2 – Maintainability

**Goal:** Establish a test suite, fix data consistency bugs, improve separation of concerns, and eliminate structural anti-patterns.
**Estimated effort:** 3–5 days

---

### Tasks

#### 2.1 Introduce Vitest and React Testing Library
- Install: `npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom`.
- Add a `vitest.config.ts` with `environment: "jsdom"` and the `@testing-library/jest-dom` setup file.
- Add a `test` script to `package.json`: `"test": "vitest run"`.

**Benefit:** Enables all subsequent test tasks.

---

#### 2.2 Write unit tests for pure utility functions
- `formatRelativeDate`: test boundary cases (< 1 min, < 1 hr, < 1 day, < 30 days, > 30 days).
- `getPasswordStrength`: test all four scoring levels and the empty-string edge case.

**Benefit:** These are the highest-confidence tests to write; no DOM or mock complexity.

---

#### 2.3 Write hook tests for `useProjectFilters`
- Use `renderHook` from `@testing-library/react`.
- Test `applyFilters` with each filter condition: color filter, hasTasks=true, hasTasks=false, combined filters.
- Test `handleFilterChange` and `handleResetFilters`.

**Benefit:** Critical business logic (filtering) is now verifiable without manual UI testing.

---

#### 2.4 Write component tests for `ProjectCard` and `ProjectFormModal`
- `ProjectCard`: test that clicking the card calls `onView`, that the dropdown menu items call `onEdit` and `onDelete`, and that the task count renders correctly.
- `ProjectFormModal`: test that submitting with a valid name calls `onSubmit`, that the form is reset on close, and that `initialValues` populates the form in edit mode.

**Benefit:** The highest-risk user-facing interactions are protected by regression tests.

---

#### 2.5 Move `RegisterFormValues` (and a new `LoginFormValues`) to `features/auth/types/index.ts`
- Define form value types in the types module, not inside component files.
- Import them into the components.

**Benefit:** Auth form types are reusable by services, hooks, and tests without importing from component files.

---

#### 2.6 Move the default user fallback out of `Sidebar.tsx`
- Remove the `MOCK_USER` import from `Sidebar.tsx`.
- Define a `DEFAULT_SIDEBAR_USER` constant in `sidebar.types.ts` and use it as the prop default.

**Benefit:** Shared component no longer depends on a feature-level module; correct dependency direction restored.

---

#### 2.7 Refactor Settings into a bottom nav array in `Sidebar`
- Create a `BOTTOM_NAV_ITEMS` array with the settings item using the same `NavItem` type.
- Render it with the same `map` pattern as `NAV_ITEMS`.
- This removes the duplicated JSX structure for the settings button.

**Benefit:** Consistent rendering pattern; easy to add more bottom-bar items.

---

#### 2.8 Replace inline `style` with CSS class in `RegisterForm` password strength label
- Define `.register-form__strength-label--weak/medium/strong/very-strong` in `RegisterForm.scss` using SCSS color variables.
- Apply the appropriate class name based on `passwordStrength.level` (add `level` to the `PasswordStrength` interface).
- Remove the `style={{ color: ... }}` prop.

**Benefit:** Password strength colors are driven by the design token system, not hardcoded hex values.

**Suggested tools/patterns:** Vitest, React Testing Library, `renderHook`. No additional runtime dependencies.

---

## Phase 3 – State & Structure

**Goal:** Introduce a global state layer, fix the ProjectDetail data-consistency bug, and add meaningful content to stub pages.
**Estimated effort:** 5–8 days

---

### Tasks

#### 3.1 Choose and install a state management library
- **Recommended option A:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`) — aligns with the existing `src/store/` directory placeholder and is well-suited to a growing multi-feature app.
- **Recommended option B:** Zustand — lighter API, easier initial setup, good for smaller teams.
- For server state (API data): add React Query (`@tanstack/react-query`) or RTK Query to handle caching and loading states declaratively.

**Benefit:** Projects, Tasks, and Dashboard features can share data without prop drilling or context soup.

---

#### 3.2 Implement a `projectsSlice` (RTK) or `useProjectsStore` (Zustand)
- Migrate the `useProjects` hook state (`projects[]`, `sortBy`) into the global store.
- Keep the `useProjects` hook as a thin selector/action dispatcher to preserve the component API.
- Ensure `ProjectDetail` reads from the same store, resolving the data-consistency bug (AI-2).

**Benefit:** Projects list and detail page are in sync; sets the pattern for Tasks and Dashboard.

---

#### 3.3 Implement minimal stub pages for Dashboard, Tasks, and Calendar
- Dashboard: display a summary card row (project count, task count, recent activity) using mock data.
- Tasks: display a flat list of tasks (from a `MOCK_TASKS` array) with status badges.
- Calendar: render a month grid (Ant Design's `Calendar` component is ready to use).

**Benefit:** All sidebar navigation items lead to real screens; the application no longer looks broken.

---

#### 3.4 Add a route for `/settings`
- Create `src/features/settings/pages/Settings.tsx` with at least a heading and a placeholder profile card.
- Register the route in `AppRouter.tsx` under the `AppLayout` group.

**Benefit:** The Settings sidebar entry no longer silently redirects to `/`.

---

#### 3.5 Memoize the filtered result in `useProjectFilters`
- Replace the `applyFilters` function return with a `useMemo`-computed `filteredProjects` value.
- Update `Projects.tsx` to consume `filteredProjects` directly instead of calling `applyFilters(sortedProjects)`.

**Benefit:** Filtering is computed only when `projects` or `filters` change; no performance regression as data grows.

**Suggested tools/patterns:** `@reduxjs/toolkit` + `react-redux`, or `zustand`. `@tanstack/react-query` for async data fetching. Ant Design `Calendar` for the calendar stub.

---

## Phase 4 – Architectural Improvements

**Goal:** Implement a real authentication flow, enforce clear layering (UI / hooks / services), add route guards, and decouple business logic fully from UI.
**Estimated effort:** 1–2 weeks

---

### Tasks

#### 4.1 Implement a real auth service layer
- Create `features/auth/services/authService.ts` with typed functions: `login`, `register`, `resetPassword`, `logout`.
- Initially back these with mock implementations that return `Promise<void>` after a small delay.
- Connect `LoginForm.handleSubmit` and `RegisterForm.handleSubmit` to these service functions.

**Benefit:** Auth forms have real behavior; the swap to a real API is a single-file change.

---

#### 4.2 Implement an auth context or store slice
- Create an `authSlice` (RTK) or `useAuthStore` (Zustand) that holds `isAuthenticated`, `user`, and `loading`.
- Expose a `useAuth` hook that components and route guards can consume.

**Benefit:** Authentication state is available across the entire application without prop drilling.

---

#### 4.3 Add a `ProtectedRoute` component
- Implement `ProtectedRoute` that reads `isAuthenticated` from `useAuth` and redirects to `/login` if false.
- Wrap the `AppLayout` route group with `ProtectedRoute`.

**Benefit:** Unauthenticated users cannot access protected pages; the security perimeter is enforced at the frontend layer.

---

#### 4.4 Implement the projects service layer
- Create `features/projects/services/index.ts` with typed functions: `getProjects`, `createProject`, `updateProject`, `deleteProject`.
- Initially return mock data from these functions.
- Update `useProjects` to call service functions instead of reading directly from the mock array.

**Benefit:** The data layer is abstracted behind a service interface; the component layer is unchanged when a real API is connected.

---

#### 4.5 Add keyboard event handlers to logo buttons
- Add `onKeyDown` handlers (or replace with `<button>`) to the logo `div` elements in `Sidebar` and `HomeNavbar`.
- Add `aria-label` to color filter buttons in `ProjectFilterDrawer`.

**Benefit:** Keyboard and screen-reader accessibility baseline is met (WCAG 2.1 SC 2.1.1).

---

#### 4.6 Set per-page document titles
- Install `react-helmet-async`.
- Wrap `App` in `<HelmetProvider>`.
- Add `<Helmet><title>TaskFlow – Projects</title></Helmet>` to each page component.
- Update the base title in `index.html` to "TaskFlow".

**Benefit:** Each browser tab and browser history entry shows a meaningful title.

**Suggested tools/patterns:** `react-helmet-async` for document titles. Custom `ProtectedRoute` wrapper component. Service functions as `async` returning typed `Promise<T>`.

---

## Phase 5 – Scalability & Performance

**Goal:** Optimize rendering, improve caching and data fetching, harden the test suite, and prepare the codebase for team-scale development.
**Estimated effort:** 2–3 weeks (ongoing)

---

### Tasks

#### 5.1 Connect the service layer to a real API
- Replace mock return values in each service function with `fetch` (or `axios`) calls to the backend API.
- Use React Query (`useQuery`, `useMutation`) or RTK Query endpoints to manage loading, error, and cache states automatically.
- Remove the `mocks/` directories (or keep them for test fixtures only).

**Benefit:** The application uses real data; loading and error states are handled uniformly.

---

#### 5.2 Add error boundaries
- Create a reusable `ErrorBoundary` component using React's class-based `componentDidCatch` or the `react-error-boundary` library.
- Wrap each feature page with an `<ErrorBoundary fallback={<ErrorPage />}>`.

**Benefit:** A single failing component or API error will not crash the entire application.

---

#### 5.3 Expand the test suite to cover new features
- Write tests for all auth hooks and service functions.
- Write tests for the projects store slice / mutations.
- Add smoke tests for each page component (renders without crashing, correct page title).
- Target ≥ 70% statement coverage as a baseline.

**Benefit:** Continuous regression protection as the team scales.

---

#### 5.4 Add component memoization where profiling shows benefit
- Use `React.memo` on `ProjectCard` and `ProjectListItem` to prevent re-renders when sibling project items change.
- Use `useCallback` on event handlers passed down from `Projects.tsx` to child components.

**Benefit:** As the project list grows (50+ items), list rendering performance is maintained.

---

#### 5.5 Introduce Storybook for component documentation
- Install Storybook with the Vite + React preset.
- Write stories for `ProjectCard`, `ProjectFormModal`, `ProjectsEmpty`, and `Sidebar`.
- This creates a living component catalogue for designers and QA.

**Benefit:** Components are visually testable in isolation; onboarding new engineers is faster.

---

#### 5.6 Configure Ant Design tree-shaking
- Verify that Vite's `@vitejs/plugin-react` and `antd`'s built-in ESM exports are correctly tree-shaken.
- Audit the final bundle with `vite-bundle-visualizer` and remove any unexpectedly large dependencies.

**Benefit:** Smaller JavaScript bundle; faster time-to-interactive on first load.

---

#### 5.7 Add end-to-end tests for critical user flows
- Install Playwright or Cypress.
- Cover: register → login → create project → edit project → delete project.
- Run as part of CI on pull requests.

**Benefit:** Critical user journeys are protected against regressions at the integration level.

**Suggested tools/patterns:** `@tanstack/react-query` or RTK Query for server state. `react-error-boundary` for error boundaries. `React.memo` + `useCallback` for rendering optimization. `Storybook` (Vite preset) for component documentation. `vite-bundle-visualizer` for bundle analysis. `Playwright` or `Cypress` for E2E tests.

---

## Summary Timeline

| Phase | Focus                        | Effort   | Key Outcome                                         |
|-------|------------------------------|----------|-----------------------------------------------------|
| 1     | Quick Wins                   | 1–2 days | No obvious bugs or dead code; lint enforced         |
| 2     | Maintainability              | 3–5 days | Test suite started; structural anti-patterns fixed  |
| 3     | State & Structure            | 5–8 days | Global store in place; stub pages replaced          |
| 4     | Architecture                 | 1–2 weeks| Real auth; service layer; route guards; a11y baseline|
| 5     | Scalability & Performance    | 2–3 weeks| Real API; error handling; bundle optimized; E2E tests|

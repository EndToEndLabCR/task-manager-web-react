# Issues and Improvements

> A critical, structured analysis of current weaknesses, risks, and remediation directions.

---

## Architecture Issues

---

### AI-1 · Stub pages shipped as application routes

**Description:**
`Dashboard`, `Tasks`, and `Calendar` route targets each render a single `<h1>` heading inside a `<div>`. They are registered in the router and listed in the sidebar navigation, giving users the impression that these features exist.

**Why it matters:**
Navigating to these routes produces a near-empty screen. Any QA pass, stakeholder demo, or real user session immediately reveals incomplete work. It also creates surface area that future engineers must audit before knowing what is real.

**Impact:** High

**Suggested direction:**
Either implement minimal but meaningful content (a `[WIP]` card with a coming-soon message and an estimated date) or gate these routes behind a feature flag so they are invisible until ready.

---

### AI-2 · `ProjectDetail` reads from a static mock, bypassing the state layer

**Description:**
`ProjectDetail.tsx` imports and reads directly from `MOCK_PROJECTS` — the same static array the `useProjects` hook initialises from. When a user edits a project name on the Projects page and then opens its detail page, the old name is displayed.

```tsx
// ProjectDetail.tsx
import { MOCK_PROJECTS } from "../../mocks/projects.mock";
const project = MOCK_PROJECTS.find((p) => p.id === id); // reads static snapshot
```

**Why it matters:**
This is a data consistency bug visible in normal usage. It also breaks the encapsulation principle: the detail page should read from the same state layer as the list page.

**Impact:** High

**Suggested direction:**
Lift project state to a shared context or store, or pass the project through the router's `state` object on `navigate`. With a future API, both pages will fetch from the same endpoint; the architectural fix is the same either way.

---

### AI-3 · Broken and missing routes

**Description:**
Several navigation paths defined in the UI do not have matching route entries in `AppRouter.tsx`:

| Navigation Source          | Target Path   | Route Defined? |
|----------------------------|---------------|----------------|
| Sidebar `NAV_ITEMS`        | `/calendar`   | No             |
| Sidebar bottom button      | `/settings`   | No             |
| `AppRouter` (duplicate)    | `*` wildcard  | Defined twice  |

**Why it matters:**
Clicking Calendar or Settings in the sidebar silently redirects to `/` due to the wildcard fallback, with no user-facing error. The duplicate `path="*"` entry is dead code that signals incomplete refactoring.

**Impact:** Medium

**Suggested direction:**
Add placeholder route components for `/calendar` and `/settings`, or remove the sidebar entries. Remove the first wildcard `<Route path="*">` from `AppRouter` (it is unreachable before the protected route block and shadows the second one).

---

### AI-4 · `MOCK_USER` imported from the `auth` feature into a shared component

**Description:**
`src/shared/components/side-bar/Sidebar.tsx` imports its default user from `src/features/auth/mocks/auth.mock.ts`:

```tsx
import { MOCK_USER } from "../../../features/auth/mocks/auth.mock";
```

**Why it matters:**
Shared components should not depend on feature-level modules — this inverts the dependency direction. It also means the sidebar cannot be used, tested, or rendered in isolation without the auth feature being present.

**Impact:** Medium

**Suggested direction:**
Move the default user fallback into the sidebar's own file, or pass it as a prop default in the shared types. When real auth exists, the user will be read from an auth context or store — the mock should be the caller's responsibility, not the sidebar's.

---

### AI-5 · Folder name typo: `dasboard`

**Description:**
The dashboard page lives at `src/features/dashboard/pages/dasboard/Dashboard.tsx` — `dasboard` is missing the letter `h`.

**Why it matters:**
The typo exists in the import path in `AppRouter.tsx`. It will be copied forward by any engineer who follows the folder structure convention, and it makes the path hard to type correctly.

**Impact:** Low

**Suggested direction:**
Rename the folder to `dashboard` and update the import in `AppRouter.tsx`.

---

## Readability Issues

---

### RI-1 · `Sidebar` interface is named after the component, not the data it models

**Description:**
`sidebar.types.ts` exports an interface named `Sidebar` that represents a *user profile*, not the sidebar UI component:

```ts
export interface Sidebar {   // actually describes a user
  name: string;
  role: string;
  avatarUrl?: string;
}
```

The `auth.mock.ts` file compounds this by importing `Sidebar` as a type for `MOCK_USER`:

```ts
import type { Sidebar } from "../../../shared/components/side-bar/sidebar.types";
export const MOCK_USER: Sidebar = { name: "Eleanor Vance", role: "Product Manager" };
```

**Why it matters:**
A developer reading `const user: Sidebar` must open the type definition to understand that `Sidebar` is a user, not a component. This slows comprehension and is likely to cause type reuse mistakes.

**Impact:** Low

**Suggested direction:**
Rename the interface to `SidebarUser` or `UserProfile` and update all import sites.

---

### RI-2 · Array index used as `key` in `HeroSection` task-row list

**Description:**
```tsx
{["Database Setup & Sync", ..., "Team Sync"].map((item, i) => (
  <div key={i} className="hero__mockup-task-row">
```

**Why it matters:**
Using array index as `key` suppresses React's ability to track list element identity, causing subtle rendering bugs if the list is ever filtered, sorted, or reordered. Even for a static decorative list, it sets a bad precedent.

**Impact:** Low

**Suggested direction:**
Use `item` as the key since the strings are unique:
```tsx
{[...].map((item) => (
  <div key={item} className="hero__mockup-task-row">
```

---

### RI-3 · Unused `Button` import in `App.tsx`

**Description:**
`App.tsx` imports `Button` from `antd` but does not use it anywhere:

```tsx
import { Button } from "antd"; // unused
```

**Why it matters:**
Unused imports add noise and can confuse engineers into thinking the component is used somewhere (e.g., conditionally rendered). Linters should catch this, but the lint configuration may not include an `no-unused-vars` rule for imports.

**Impact:** Low

**Suggested direction:**
Remove the import. Enable `@typescript-eslint/no-unused-vars` in the ESLint config.

---

### RI-4 · `SettingOutlined` imported but only used inline in `Sidebar`

**Description:**
`SettingOutlined` is imported at the top of `Sidebar.tsx` alongside the nav icons, but unlike them, it is not stored in the `NAV_ITEMS` array — it is inlined directly in the JSX further down. The nav icons and the settings icon are handled inconsistently.

**Why it matters:**
The settings button behaves identically to nav items but is constructed differently. A future engineer adding another bottom-of-sidebar item will be confused about which pattern to follow.

**Impact:** Low

**Suggested direction:**
Add Settings to a separate `BOTTOM_NAV_ITEMS` array using the same `NavItem` shape, and render it with the same mapping pattern. This also makes it trivial to add more bottom-bar items later.

---

## Maintainability Risks

---

### MR-1 · No test suite

**Description:**
The repository contains zero test files. There are no unit tests, no component tests, and no integration tests.

**Why it matters:**
Without tests, every refactor is a manual regression risk. The three custom hooks in `features/projects/hooks/` contain logic (sort, filter, modal state transitions, project CRUD) that cannot be verified to work correctly without executing the full UI manually. Pure utilities like `formatRelativeDate` and `getPasswordStrength` are also untested.

**Impact:** High

**Suggested direction:**
Introduce Vitest and React Testing Library. Start with:
1. Unit tests for `formatRelativeDate` and `getPasswordStrength` (pure functions, no DOM).
2. Hook tests for `useProjectFilters.applyFilters` using `renderHook`.
3. Component tests for `ProjectCard` and `ProjectFormModal` (highest user-visible risk).

---

### MR-2 · `loading` state in `useProjects` is always `false`

**Description:**
```ts
const [loading, setLoading] = useState<boolean>(false);
// ...
return { loading, setLoading, ... };
```
`setLoading` is exported but never called anywhere in the hook or in `Projects.tsx`. The skeleton loader (`Skeleton` in `Projects.tsx`) is therefore never shown.

**Why it matters:**
The loading UX is silently broken. Engineers using this hook will not discover the bug until they wire up real async data and observe that the loading state has no effect.

**Impact:** Medium

**Suggested direction:**
When implementing real data fetching, wrap the fetch call with `setLoading(true)` / `setLoading(false)`. Until then, document the intent with a comment or remove `setLoading` from the public return to avoid false expectations.

---

### MR-3 · Login form has no `onFinish` handler

**Description:**
The Ant Design `<Form>` in `LoginForm.tsx` has no `onFinish` prop:

```tsx
<Form layout="vertical" requiredMark={false} autoComplete="off">
  {/* ... */}
  <Button type="primary" htmlType="submit" ...>Log in</Button>
</Form>
```

Submitting the form does nothing — validation runs, but the submit callback is a no-op.

**Why it matters:**
The login page is the entry point of the application. A silent no-op on form submission will confuse every user who attempts to log in, and every engineer who tries to wire authentication will have to discover this gap first.

**Impact:** High

**Suggested direction:**
Add `onFinish={handleSubmit}` to the Form component. Implement `handleSubmit` to call the auth service (even if it is a mock for now) and navigate on success, following the same pattern already in `RegisterForm.tsx`.

---

### MR-4 · `console.log` left in `RegisterForm.handleSubmit`

**Description:**
```ts
const handleSubmit = (values: RegisterFormValues): void => {
  setLoading(true);
  console.log(values);   // ← debug statement
  setLoading(false);
};
```

**Why it matters:**
`console.log` in a form submit handler prints user credentials (email, username, potentially password) to the browser console. This is a privacy risk in any environment where DevTools are accessible, and it is a clear signal that the handler was not intended to be shipped.

**Impact:** High

**Suggested direction:**
Remove the `console.log`. Replace the handler body with a call to the auth service (or a clearly labeled `// TODO: call auth service` comment).

---

### MR-5 · Password minimum length rule is 6 characters

**Description:**
The `RegisterForm` validates password length with `{ min: 6, ... }`. Modern security standards recommend a minimum of 8 characters, and the `getPasswordStrength` helper itself starts scoring at 8:

```ts
if (password.length >= 8) score++;
```

**Why it matters:**
The form allows a 6-character password to submit successfully while the strength indicator simultaneously shows it as `WEAK`. This is a contradictory UX and a security gap.

**Impact:** Medium

**Suggested direction:**
Align the Ant Design validation rule with the strength logic: raise the minimum to 8 characters.

---

## Scalability Risks

---

### SR-1 · No global state management

**Description:**
The `src/store/index.ts` file exists but contains no store. All application state is local React state in hooks. Currently the only stateful feature is Projects, so this is tolerable — but Dashboard, Tasks, and Calendar will all need to share user context, project data, and task data.

**Why it matters:**
As features grow, passing data through props across route boundaries becomes impractical. Project data needed by both the Projects list and the ProjectDetail page already demonstrates this limitation (see AI-2).

**Impact:** High

**Suggested direction:**
Introduce Redux Toolkit or Zustand as the global store. For server state (API data), consider React Query or RTK Query to handle caching, loading, and error states declaratively. The existing hook structure maps well onto RTK slices or React Query query hooks.

---

### SR-2 · No authentication guards on protected routes

**Description:**
The `AppLayout` route group wraps Dashboard, Projects, Tasks, and ProjectDetail — but there is no check that the user is authenticated before rendering these routes. Any unauthenticated user can navigate directly to `/projects`.

**Why it matters:**
Without auth guards, the application has no security perimeter at the frontend layer. Once a real backend is connected, unguarded routes will leak authenticated-only data to unauthenticated sessions.

**Impact:** High

**Suggested direction:**
Create a `ProtectedRoute` component that reads from an auth context or store:

```tsx
const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
```

Wrap the protected routes in this component instead of (or in addition to) `AppLayout`.

---

### SR-3 · No API service layer

**Description:**
The `services/` directories (in `auth`, `home`, `projects`, `tasks`) all export empty modules. All data comes from `mocks/` files imported directly in hooks.

**Why it matters:**
When the application connects to a real API, every hook that currently reads from mocks will need to be modified. The service layer is the intended abstraction point for this change, but its emptiness means the abstraction is not yet providing any protection.

**Impact:** High

**Suggested direction:**
Define typed service functions that return `Promise<T>`:

```ts
// features/projects/services/index.ts
export const fetchProjects = (): Promise<Project[]> => {
  return fetch("/api/projects").then((r) => r.json());
};
```

Update `useProjects` to call `fetchProjects()` inside a `useEffect` (or React Query hook), replacing the static initializer. The switch from mock to real can then be made by replacing the single service function.

---

## State Management Issues

---

### SMI-1 · No clear boundary between transient UI state and persistent data state

**Description:**
`viewMode` (grid/list toggle) is stored in `useState` in `Projects.tsx`. The modal open/close state lives in `useProjectModal`. The actual project data lives in `useProjects`. These three hooks are all called at the same level with no formal boundary distinguishing UI state (ephemeral) from data state (persistent).

**Why it matters:**
When a global store is introduced, engineers must decide which state belongs in the store and which stays local. Without a clear documented intention, this often leads to over-storing (putting UI state like `viewMode` into Redux) or under-storing (keeping server data in local hooks long after it should be shared).

**Impact:** Low

**Suggested direction:**
Adopt an explicit policy: only data that crosses component or route boundaries belongs in the global store; ephemeral UI state (modal visibility, view mode) stays local. Document this convention in a `docs/architecture.md` or in a code comment at the store entry point.

---

## TypeScript Issues

---

### TI-1 · `@types/react-router-dom` v5 installed alongside `react-router-dom` v7

**Description:**
`package.json` has:
```json
"@types/react-router-dom": "^5.3.3"   // v5 types
"react-router-dom": "^7.13.1"          // v7 runtime
```

Starting from v6, `react-router-dom` ships its own type declarations — `@types/react-router-dom` is only needed for v5.

**Why it matters:**
The v5 `@types` package may conflict with the v6+ built-in types, causing confusing TypeScript errors or silently overriding correct type signatures (e.g., the `useNavigate` return type, `Route` element prop types).

**Impact:** Medium

**Suggested direction:**
Remove `@types/react-router-dom` from `devDependencies`. The correct types are already bundled with `react-router-dom` v7.

---

### TI-2 · `RegisterFormValues` is defined locally inside `RegisterForm.tsx`

**Description:**
```tsx
// RegisterForm.tsx
interface RegisterFormValues {
  email: string;
  username: string;
  password: string;
}
```

This type is defined inside the component file rather than in `features/auth/types/index.ts`.

**Why it matters:**
If the register form values need to be used by an auth service function, a test, or a hook, they must either be re-defined (duplication) or the import must reach into a component file (bad coupling).

**Impact:** Low

**Suggested direction:**
Move `RegisterFormValues` (and its login equivalent) to `src/features/auth/types/index.ts` and import them back into the components.

---

## Styling Problems

---

### SP-1 · Inline `style` prop used for dynamic colors in `RegisterForm`

**Description:**
```tsx
<Text style={{ color: passwordStrength.color }}>
  {passwordStrength.label}
</Text>
```

The `passwordStrength.color` value is a raw hex string set inside the `getPasswordStrength` function.

**Why it matters:**
Inline styles bypass the SCSS theming layer and are not overridable via CSS class hierarchy. If the design system changes `$error-color`, the inline hex value (`#ff4d4f`) will drift out of sync with the token.

**Impact:** Low

**Suggested direction:**
Map strength levels to CSS class names instead:

```tsx
<Text className={`register-form__strength-label register-form__strength-label--${passwordStrength.level}`}>
```

Define `.register-form__strength-label--weak`, `--medium`, `--strong`, `--very-strong` in the SCSS file using `$error-color`, `$warning-color`, `$success-color`, and `$primary-color`.

---

### SP-2 · `App.css` and `src/index.css` coexist with `src/styles/global.scss`

**Description:**
The project has three global style entry points:
- `src/App.css` (imported in `App.tsx`)
- `src/index.css` (imported in `main.tsx`)
- `src/styles/global.scss` (imported in `main.tsx`)

**Why it matters:**
Global styles spread across three files make it hard to reason about the cascade. A rule in `App.css` can override a rule in `global.scss` without any obvious reason.

**Impact:** Low

**Suggested direction:**
Consolidate all global styles into `src/styles/global.scss`. Delete `App.css` (it only contains minimal scoping for `#root`) and move its content to `global.scss`. Optionally merge `index.css` as well.

---

## Performance Issues

---

### PI-1 · `applyFilters` is a new function reference on every render of `Projects`

**Description:**
`useProjectFilters` returns `applyFilters` as a plain function defined inside the hook body. `Projects.tsx` calls it in the render path:

```tsx
const filteredProjects = applyFilters(sortedProjects);
```

`applyFilters` is recreated on every render of `useProjectFilters`.

**Why it matters:**
For the current data size (6 mock projects) this is imperceptible. However, with hundreds of projects or complex filter logic, this becomes an unnecessary computation on every keystroke or unrelated state update elsewhere in `Projects.tsx`.

**Impact:** Low

**Suggested direction:**
Memoize the filtered result using `useMemo` inside `useProjectFilters`:

```ts
const filteredProjects = useMemo(
  () => applyFilters(projects),
  [projects, filters]
);
```

Return `filteredProjects` directly from the hook instead of `applyFilters`.

---

## Testing Gaps

---

### TG-1 · Zero test coverage across the entire codebase

**Description:**
There are no `*.test.ts`, `*.test.tsx`, `*.spec.ts`, or `*.spec.tsx` files anywhere in the repository. Vitest is not installed.

**Impact:** High

**Priority test targets (in order):**

| Target                              | Type            | Rationale                                              |
|-------------------------------------|-----------------|--------------------------------------------------------|
| `formatRelativeDate`                | Unit            | Pure function, multiple edge cases (minutes, hours, days, months) |
| `getPasswordStrength`               | Unit            | Pure function, security-sensitive scoring logic        |
| `useProjectFilters` (applyFilters)  | Hook (renderHook)| Core filter logic, multiple filter combinations       |
| `ProjectCard`                       | Component       | User-visible card with menu actions                    |
| `ProjectFormModal`                  | Component       | Critical create/edit form with validation              |

---

## Accessibility (a11y) Concerns

---

### A11Y-1 · Clickable `div` elements without keyboard support

**Description:**
The logo in both `Sidebar` and `HomeNavbar` is a `div` with `onClick`, `role="button"`, and `tabIndex={0}`, but has no `onKeyDown` handler. Keyboard users pressing `Enter` or `Space` on the logo will not trigger navigation.

```tsx
<div
  className="sidebar__logo"
  onClick={() => navigate("/")}
  role="button"
  tabIndex={0}   // focusable but not keyboard-activatable
>
```

**Why it matters:**
WCAG 2.1 Success Criterion 2.1.1 requires all interactive UI to be operable via keyboard. `role="button"` creates a user expectation of `Enter`/`Space` activation.

**Impact:** Medium

**Suggested direction:**
Replace the `div` with a semantic `<button>` (or `<a href="/">`) to get keyboard handling for free, or add:
```tsx
onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") navigate("/"); }}
```

---

### A11Y-2 · Color filter buttons have no accessible label

**Description:**
In `ProjectFilterDrawer`, color filter buttons are rendered as colored `<button>` elements with no text content or `aria-label`:

```tsx
<button
  className="project-filter-drawer__color-btn ..."
  style={{ backgroundColor: PROJECT_COLORS[color] }}
  onClick={...}
/>
```

**Why it matters:**
Screen reader users will hear "button, button, button" six times with no indication of which color each button represents.

**Impact:** Medium

**Suggested direction:**
Add `aria-label={color}` (e.g., `aria-label="blue"`) and optionally `aria-pressed={filters.colors.includes(color)}` to communicate selection state.

---

## UX Inconsistencies

---

### UX-1 · `ProjectCard` uses a native `<button>` for the menu while Ant Design `<Button>` is used elsewhere

**Description:**
The three-dot menu trigger in `ProjectCard` is a plain `<button>` element, while all toolbar buttons in `ProjectsHeader`, `ProjectFormModal`, etc. use Ant Design's `<Button>`. The visual appearance relies on custom SCSS rather than the design system.

**Why it matters:**
Minor visual drift between the custom button and Ant Design's button tokens (hover state, focus ring, active color) creates subtle inconsistency that accumulates as the component count grows.

**Impact:** Low

**Suggested direction:**
Use `<Button type="text" icon={<MoreOutlined />} />` from Ant Design for the menu trigger to align with the design system's interactive states.

---

### UX-2 · Page title is hardcoded as "Template Web React"

**Description:**
`index.html` contains:
```html
<title>Template Web React</title>
```

**Why it matters:**
Every browser tab shows "Template Web React" regardless of the current page, making multi-tab workflows confusing and making the application feel unfinished to any user.

**Impact:** Low

**Suggested direction:**
Update the base title to "TaskFlow" and set per-page titles using `document.title` or a library like `react-helmet-async`.

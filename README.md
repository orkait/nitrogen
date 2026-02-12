# Nitrogen - Design System

Three-tier component architecture for building scalable React design systems.

## Architecture Hierarchy

```
@repo/ui (Base Components)
    ↓
@repo/blocks (Composite Components)
    ↓
@repo/composites (Complex Layouts)
    ↓
@repo/docs (Storybook)
```

### Layer Breakdown

| Layer | Package | Purpose | Dependencies |
|-------|---------|---------|--------------|
| **UI** | `@repo/ui` | Atomic base components | `@repo/ui-utils` |
| **Blocks** | `@repo/blocks` | Components combining multiple UI components | `@repo/ui`, `@repo/ui-utils` |
| **Composites** | `@repo/composites` | Full layouts using multiple blocks | `@repo/blocks`, `@repo/ui` |
| **Utils** | `@repo/ui-utils` | Shared utilities | - |
| **Docs** | `apps/docs` | Storybook documentation | All packages |

## Adding a New Component

### 0. Installation (for monorepo workspaces)
```bash
# hard clear cache and install everything 
npm run setup
```

### 1. Create Base Component in `@repo/ui`

Create `packages/ui/src/my-component.tsx`:

```tsx
import * as React from "react";
import { cn } from "@repo/ui-utils";

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "alt";
}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div ref={ref} className={cn("base-styles", className)} {...props} />
  )
);

MyComponent.displayName = "MyComponent";
export { MyComponent };
```

### 2. Update `@repo/ui` Build Config

Edit `packages/ui/tsup.config.ts`:

```ts
entry: {
  "my-component": "src/my-component.tsx",
}
```

Edit `packages/ui/package.json`:

```json
"exports": {
  "./my-component": {
    "types": "./dist/my-component.d.ts",
    "import": "./dist/my-component.js",
    "require": "./dist/my-component.cjs"
  }
}
```

### 3. Create Block (Optional)

Create `packages/blocks/src/my-block.tsx`:

```tsx
import { MyComponent } from "@repo/ui/my-component";

export interface MyBlockProps {
  title?: string;
}

export function MyBlock({ title, ...props }: MyBlockProps) {
  return (
    <div>
      <MyComponent {...props} />
      {title && <h3>{title}</h3>}
    </div>
  );
}
```

Update `packages/blocks/tsup.config.ts` and `package.json` (same pattern as UI).

### 4. Create Composite (Optional)

Create `packages/composites/src/my-composite.tsx`:

```tsx
import { MyBlock } from "@repo/blocks/my-block";

export function MyComposite({ count = 3 }) {
  return (
    <div className="grid gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <MyBlock key={i} title={`Item ${i + 1}`} />
      ))}
    </div>
  );
}
```

Update `packages/composites/tsup.config.ts` and `package.json` (same pattern).

### 5. Add Storybook Story

Create `apps/docs/stories/my-component.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "@repo/ui/my-component";

const meta: Meta<typeof MyComponent> = {
  title: "UI/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = { args: { variant: "default" } };
```

### 6. View in Storybook

```bash
bun run dev
```

Visit <http://localhost:6006/>

## Commands

```bash
bun install        # Install dependencies
bun run dev        # Start Storybook dev server
bun run build      # Build all packages
bun run clean      # Clean all packages
```

## Key Conventions

- Use `React.forwardRef` for base components
- Always export component prop types (`MyComponentProps`)
- Use `cn()` utility for className merging
- Add `displayName` to forwardRef components
- Update both `tsup.config.ts` and `package.json` when exporting components

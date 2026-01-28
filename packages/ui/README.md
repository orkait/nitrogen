# @repo/ui

Standard shadcn UI components for the Orka UI component library.

## Purpose

This package contains all **standard shadcn components** that can be installed via the shadcn CLI. These are production-ready, accessible components built on top of Radix UI primitives.

## Current Components

- **Button** - Interactive button component with multiple variants
- **Card** - Container component for content cards
- **Dialog** - Modal dialog component
- **Input** - Text input field component
- **Label** - Form label component

## Usage

Import components from their specific paths:

```tsx
import { Button } from "@repo/ui/button"
import { Card, CardContent, CardHeader } from "@repo/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@repo/ui/dialog"
import { Input } from "@repo/ui/input"
import { Label } from "@repo/ui/label"
```

Import styles in your app:

```tsx
import "@repo/ui/styles"
```

## Adding New Components

Use the shadcn CLI to add new components:

```bash
cd packages/ui
pnpm add:component
```

This will:
1. Add the component to `src/`
2. Install any required dependencies
3. You'll need to manually update `package.json` exports and `tsup.config.ts` entry points

## Building

```bash
pnpm build
```

## Architecture

- Built with TypeScript and React
- Uses Radix UI primitives for accessibility
- Styled with Tailwind CSS
- Built with tsup for fast bundling
- Exports both ESM and CJS formats

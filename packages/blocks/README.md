# @repo/blocks

This package is reserved for **custom block components** only.

## Purpose

Standard shadcn components have been moved to `@repo/ui`. This package should only contain:
- Custom block components built from scratch
- Specialized input components with unique behavior
- Custom primitives that are NOT part of the standard shadcn library

## Current Status

Empty - ready for future custom block components.

## Adding Components

When adding custom primitives:
1. Update `package.json` exports
2. Update `tsup.config.ts` entry points
3. Add the component to `src/`
4. Run `pnpm build` to verify

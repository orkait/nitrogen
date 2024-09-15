# Orka Design System

Tailwind CSS based design system for React applications.
Orka Design sytem uses Turborepo to manage a monorepo with multiple packages and applications. It includes a core React component library, a shared utilities package, and a Storybook documentation site.

## Technologies

-   🏎 [Turborepo](https://turbo.build/repo) — High-performance build system for Monorepos
-   🚀 [React](https://reactjs.org/) — JavaScript library for user interfaces
-   🛠 [Tsup](https://github.com/egoist/tsup) — TypeScript bundler powered by esbuild
-   📖 [Storybook](https://storybook.js.org/) — UI component environment powered by Vite
-   📦 [pnpm](https://pnpm.io/) — Fast, disk space efficient package manager
-   💅 [tailwindCSS] - utility-first CSS framework

## Features

-   [TypeScript](https://www.typescriptlang.org/) for static type checking
-   [ESLint](https://eslint.org/) for code linting
-   [Prettier](https://prettier.io) for code formatting
-   [Changesets](https://github.com/changesets/changesets) for managing versioning and changelogs
-   [GitHub Actions](https://github.com/changesets/action) for fully automated package publishing

## Versioning & Publishing Packages

This example uses [Changesets](https://github.com/changesets/changesets) to manage versions, create changelogs, and publish to npm. It's preconfigured so you can start publishing packages immediately.

You'll need to create an `NPM_TOKEN` and `GITHUB_TOKEN` and add it to your GitHub repository settings to enable access to npm. It's also worth installing the [Changesets bot](https://github.com/apps/changeset-bot) on your repository.

### Generating the Changelog

To generate your changelog, run `pnpm changeset` locally:

1. **Which packages would you like to include?** – This shows which packages and changed and which have remained the same. By default, no packages are included. Press `space` to select the packages you want to include in the `changeset`.
1. **Which packages should have a major bump?** – Press `space` to select the packages you want to bump versions for.
1. If doing the first major version, confirm you want to release.
1. Write a summary for the changes.
1. Confirm the changeset looks as expected.
1. A new Markdown file will be created in the `changeset` folder with the summary and a list of the packages included.

### Releasing

When you push your code to GitHub, the [GitHub Action](https://github.com/changesets/action) will run the `release` script defined in the root `package.json`:

```bash
turbo run build --filter=docs^... && changeset publish
```

Turborepo runs the `build` script for all publishable packages (excluding docs) and publishes the packages to npm. By default, this example includes `repo` as the npm organization. To change this, do the following:

-   Rename folders in `packages/*` to replace `repo` with your desired scope
-   Search and replace `repo` with your desired scope
-   Re-run `pnpm install`

To publish packages to a private npm organization scope, **remove** the following from each of the `package.json`'s

```diff
- "publishConfig": {
-  "access": "public"
- },
```

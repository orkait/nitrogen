const { execSync } = require("child_process");
const semver = require("./semver");

const isWindows = process.platform === "win32";

const REQUIRED_NODE = ">=22.0.0 <=25.0.0";
const REQUIRED_NPM = ">=11.0.0 <=12.0.0";

function run(cmd) {
    execSync(cmd, { stdio: "inherit" });
}

function getNpmVersion() {
    return execSync(`npm --version`, { encoding: "utf8" }).trim();
}

function verifyVersions() {
    const nodeVersion = process.versions.node;
    const npmVersion = getNpmVersion();

    if (!semver.satisfies(nodeVersion, REQUIRED_NODE)) {
        console.error(`
❌ Unsupported Node.js version detected

Current: ${nodeVersion}
Required: ${REQUIRED_NODE}

Fix:
  - nvm use
  - or install a compatible Node.js version
`);
        process.exit(1);
    }

    if (!semver.satisfies(npmVersion, REQUIRED_NPM)) {
        console.error(`
❌ Unsupported npm version detected

Current: ${npmVersion}
Required: ${REQUIRED_NPM}

Fix:
  - npm install -g npm@latest
  - or use corepack / volta
`);
        process.exit(1);
    }

    console.log(`
✅ Environment check passed
   Node.js: ${nodeVersion}
   npm:     ${npmVersion}
`);
}

try {
    verifyVersions();

    console.log(`🧹 Cleaning workspace...`);
    run(`npx turbo run clean`);

    run(
        `npx rimraf node_modules apps/**/node_modules node_modules/.cache apps/docs/.storybook/.cache .turbo`
    );

    console.log(`⚙️  Running platform setup...`);

    if (isWindows) {
        run(`powershell -ExecutionPolicy Bypass -File "./easy-resolve.ps1"`);
    } else {
        run(`bash "./easy-resolve.bash"`);
    }

    console.log(`✅ Setup complete`);
} catch (err) {
    console.error(`❌ Setup failed`);
    console.error(err.message);
    process.exit(1);
}
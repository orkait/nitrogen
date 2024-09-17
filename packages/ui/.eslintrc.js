/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: ["@repo/eslint-config/react.js"],
	rules: {
		"unicorn/filename-case": "off",
		"@typescript-eslint/no-unsafe-assignment": "off",
	},
	"import/no-extraneous-dependencies": [
		"error",
		{ devDependencies: false, optionalDependencies: false, peerDependencies: false },
	],
};

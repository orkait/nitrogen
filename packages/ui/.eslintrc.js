/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: ["@repo/eslint-config/react.js"],
	rules: {
		"unicorn/filename-case": "off",
	},
};

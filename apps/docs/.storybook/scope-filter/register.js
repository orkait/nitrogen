import * as React from "react";
import { addons, types } from "@storybook/manager-api";
import { useGlobals, useStorybookApi } from "@storybook/manager-api";

const ADDON_ID = "scope-filter";
const TOOL_ID = `${ADDON_ID}/tool`;

const ScopeFilterTool = () => {
	const api = useStorybookApi();
	const [globals] = useGlobals();
	const scope = globals.scope;

	React.useEffect(() => {
		api.experimental_setFilter(ADDON_ID, (item) => {
			if (!scope || scope === "all") return true;
			const entry = item;
			if (entry.type === "story" || entry.type === "docs") {
				const tags = entry.tags ?? [];
				return tags.indexOf(scope) !== -1;
			}
			return true;
		});

		return () => {
			api.experimental_setFilter(ADDON_ID, null);
		};
	}, [api, scope]);

	return null;
};

addons.register(ADDON_ID, () => {
	addons.add(TOOL_ID, {
		type: types.TOOL,
		title: "Scope Filter",
		match: () => true,
		render: () => React.createElement(ScopeFilterTool),
	});
});

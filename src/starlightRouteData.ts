import { defineRouteMiddleware } from "@astrojs/starlight/route-data";

export const onRequest = defineRouteMiddleware((context) => {
	const sidebarlessPages = new Set([
		"terms-of-service",
		"privacy-policy",
		"refund-policy",
		"imprint",
	]);
	if (sidebarlessPages.has(context.locals.starlightRoute.id)) {
		context.locals.starlightRoute.hasSidebar = false;
	}

	const titleTag = context.locals.starlightRoute.head.find(
		(tag) => tag.tag === "title",
	);
	if (titleTag?.content) {
		const parts = titleTag.content.split(" | ");
		if (parts.length === 2 && parts[0] === parts[1]) {
			titleTag.content = parts[0];
		}
	}
});

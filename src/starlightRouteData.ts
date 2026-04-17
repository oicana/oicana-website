import { defineRouteMiddleware } from "@astrojs/starlight/route-data";

export const onRequest = defineRouteMiddleware((context) => {
	const sidebarlessPages = new Set([
		"terms-of-service",
		"privacy-policy",
		"refund-policy",
	]);
	if (sidebarlessPages.has(context.locals.starlightRoute.id)) {
		context.locals.starlightRoute.hasSidebar = false;
	}
});

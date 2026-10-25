const SITE_HOST = "oicana.com";

function isExternal(href) {
	if (typeof href !== "string" || !/^https?:\/\//.test(href)) return false;
	const { hostname } = new URL(href);
	return hostname !== SITE_HOST && !hostname.endsWith(`.${SITE_HOST}`);
}

function visit(node) {
	if (
		node.type === "element" &&
		node.tagName === "a" &&
		isExternal(node.properties?.href)
	) {
		node.properties.target = "_blank";
		node.properties.rel = ["noopener"];
	}
	for (const child of node.children ?? []) visit(child);
}

/** Opens links that leave the website in a new tab. */
export default function rehypeExternalLinks() {
	return (tree) => visit(tree);
}

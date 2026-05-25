import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

const entries = await getCollection("docs");

const pages = Object.fromEntries(entries.map(({ data, id }) => [id, { data }]));

export const { getStaticPaths, GET } = await OGImageRoute({
	pages,
	param: "slug",
	getImageOptions: (_id, page: (typeof pages)[string]) => ({
		title: page.data.hero?.title ?? page.data.title,
		description: page.data.hero?.tagline ?? page.data.description,
		bgGradient: [
			[20, 24, 40],
			[12, 14, 24],
		],
		border: { color: [99, 102, 241], width: 12 },
		padding: 80,
		font: {
			title: { color: [255, 255, 255], weight: "Bold" },
			description: { color: [200, 200, 220], weight: "Normal" },
		},
		logo: {
			path: "./src/assets/oicana_1024.png",
			size: [96],
		},
	}),
});

import { defineRouteMiddleware } from "@astrojs/starlight/route-data";
import { TIERS } from "./config/creem";

const SITE_URL = "https://oicana.com";

const COMMERCIAL_OFFERS = TIERS.map((tier) => ({
	"@type": "Offer" as const,
	name: tier.name,
	description: `${tier.description} (${tier.criteria})`,
	price: Number.parseFloat(tier.prices.monthly.replace(/[^0-9.]/g, "")).toFixed(
		2,
	),
	priceCurrency: "EUR",
	availability: "https://schema.org/InStock",
}));

const NON_COMMERCIAL_OFFER = {
	"@type": "Offer" as const,
	name: "Non-commercial",
	description: "Free for non-commercial use",
	price: "0",
	priceCurrency: "EUR",
	availability: "https://schema.org/InStock",
};

const ALL_OFFERS = [NON_COMMERCIAL_OFFER, ...COMMERCIAL_OFFERS];
const HIGH_PRICE = Math.max(
	...COMMERCIAL_OFFERS.map((o) => Number.parseFloat(o.price)),
).toFixed(2);

export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	const id = route.id;

	const sidebarlessPages = new Set([
		"terms-of-service",
		"privacy-policy",
		"refund-policy",
		"imprint",
	]);
	if (sidebarlessPages.has(id)) {
		route.hasSidebar = false;
	}

	const titleTag = route.head.find((tag) => tag.tag === "title");
	if (titleTag?.content) {
		const parts = titleTag.content.split(" | ");
		if (
			parts.length === 2 &&
			parts[1] === "Oicana" &&
			parts[0].startsWith("Oicana")
		) {
			titleTag.content = parts[0];
		}
	}

	const ogImageUrl = new URL(
		`/og/${id || "index"}.png`,
		context.site ?? SITE_URL,
	).href;

	route.head.push(
		{
			tag: "meta",
			attrs: { property: "og:image", content: ogImageUrl },
		},
		{
			tag: "meta",
			attrs: { property: "og:image:width", content: "1200" },
		},
		{
			tag: "meta",
			attrs: { property: "og:image:height", content: "630" },
		},
		{
			tag: "meta",
			attrs: { property: "og:image:alt", content: route.entry.data.title },
		},
		{
			tag: "meta",
			attrs: { name: "twitter:image", content: ogImageUrl },
		},
	);

	const isHome = id === "";
	const isNewsPost = id.startsWith("news/") && id !== "news";

	if (isHome) {
		const ogType = route.head.find(
			(tag) =>
				tag.tag === "meta" &&
				(tag.attrs?.property === "og:type" || tag.attrs?.name === "og:type"),
		);
		if (ogType?.attrs) {
			ogType.attrs.content = "website";
		}
	}

	const jsonLd: Record<string, unknown>[] = [];

	if (isHome) {
		jsonLd.push({
			"@context": "https://schema.org",
			"@type": "Organization",
			name: "Oicana",
			url: SITE_URL,
			logo: `${SITE_URL}/oicana.svg`,
			sameAs: [
				"https://github.com/oicana/oicana",
				"https://bsky.app/profile/oicana.com",
				"https://www.linkedin.com/company/oicana",
			],
		});
		jsonLd.push({
			"@context": "https://schema.org",
			"@type": ["SoftwareApplication", "Product"],
			name: "Oicana",
			description: route.entry.data.description,
			url: SITE_URL,
			image: `${SITE_URL}/og/index.png`,
			applicationCategory: "DeveloperApplication",
			operatingSystem: "Linux, macOS, Windows, Web browser",
			offers: {
				"@type": "AggregateOffer",
				url: `${SITE_URL}/#pricing`,
				priceCurrency: "EUR",
				lowPrice: "0",
				highPrice: HIGH_PRICE,
				offerCount: ALL_OFFERS.length,
				availability: "https://schema.org/InStock",
				offers: ALL_OFFERS,
			},
		});
	}

	if (isNewsPost) {
		const data = route.entry.data as typeof route.entry.data & {
			date?: Date | string;
		};
		const datePublished =
			data.date instanceof Date
				? data.date.toISOString()
				: typeof data.date === "string"
					? data.date
					: undefined;
		jsonLd.push({
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			headline: data.title,
			description: data.description,
			image: ogImageUrl,
			datePublished,
			mainEntityOfPage: new URL(`/${id}/`, context.site ?? SITE_URL).href,
			publisher: {
				"@type": "Organization",
				name: "Oicana",
				logo: { "@type": "ImageObject", url: `${SITE_URL}/oicana.svg` },
			},
		});
	}

	for (const data of jsonLd) {
		route.head.push({
			tag: "script",
			attrs: { type: "application/ld+json" },
			content: JSON.stringify(data),
		});
	}
});

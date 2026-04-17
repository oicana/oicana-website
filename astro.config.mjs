// @ts-check

import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightBlog from "starlight-blog";

export default defineConfig({
	site: "https://oicana.com",
	integrations: [
		starlight({
			title: "Oicana",
			favicon: "/oicana.svg",
			disable404Route: true,
			routeMiddleware: "./src/starlightRouteData.ts",
			plugins: [
				starlightBlog({ title: "News", prefix: "news", navigation: "none" }),
			],
			components: {
				SocialIcons: "./src/components/SocialIcons.astro",
				SiteTitle: "./src/components/SiteTitle.astro",
			},
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/oicana/oicana",
				},
				{
					icon: "blueSky",
					label: "BlueSky",
					href: "https://bsky.app/profile/oicana.com",
				},
			],
			sidebar: [
				{ label: "Introduction", slug: "docs" },
				{
					label: "Getting Started",
					items: [
						{
							label: "Installation and Setup",
							slug: "docs/getting-started/1-setup",
						},
						{
							label: "Create a Template",
							slug: "docs/getting-started/2-first-template",
						},
						{
							label: "Defining Inputs",
							slug: "docs/getting-started/3-defining-inputs",
						},
						{
							label: "Choose Your Integration",
							items: [
								{
									label: "Overview",
									slug: "docs/getting-started/4-integrations",
								},
								{
									label: "Browser / React",
									slug: "docs/getting-started/4-1-browser",
								},
								{
									label: "C# / ASP.NET",
									slug: "docs/getting-started/4-2-csharp",
								},
								{
									label: "Java / Spring Boot",
									slug: "docs/getting-started/4-3-java",
								},
								{
									label: "Node.js / NestJS",
									slug: "docs/getting-started/4-4-nodejs",
								},
								{ label: "Rust / Axum", slug: "docs/getting-started/4-5-rust" },
								{
									label: "Python / FastAPI",
									slug: "docs/getting-started/4-6-python",
								},
								{ label: "PHP / Slim", slug: "docs/getting-started/4-7-php" },
							],
						},
					],
				},
				{
					label: "Templating",
					items: [
						{ label: "Inputs", slug: "docs/templates/inputs" },
						{ label: "Dependencies", slug: "docs/templates/dependencies" },
						{
							label: "Helpful Packages",
							slug: "docs/templates/helpful-packages",
						},
						{ label: "Fonts", slug: "docs/templates/fonts" },
						{ label: "Export", slug: "docs/templates/export" },
						{ label: "Testing", slug: "docs/templates/tests" },
					],
				},
				{
					label: "Comparisons",
					items: [
						{
							label: "vs HTML-to-PDF",
							slug: "docs/comparisons/vs-html-to-pdf",
						},
						{
							label: "vs PDF Libraries",
							slug: "docs/comparisons/vs-pdf-libraries",
						},
						{ label: "vs LaTeX", slug: "docs/comparisons/vs-latex" },
						{
							label: "vs Commercial Services",
							slug: "docs/comparisons/vs-commercial-services",
						},
					],
				},
				{ label: "CLI", slug: "docs/cli" },
				{ label: "Integrations", slug: "docs/integrations" },
				{
					label: "Guides",
					items: [
						{ label: "Overview", slug: "docs/guides" },
						{ label: "Cache Management", slug: "docs/guides/cache-management" },
						{ label: "Styled Inputs", slug: "docs/guides/styled-inputs" },
					],
				},
				{ label: "Credits", slug: "docs/credits" },
			],
		}),
	],
});

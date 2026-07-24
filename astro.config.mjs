// @ts-check

import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightBlog from "starlight-blog";
import starlightLlmsTxt from "starlight-llms-txt";

export default defineConfig({
	site: "https://oicana.com",
	integrations: [
		starlight({
			title: "Oicana",
			favicon: "/oicana.svg",
			disable404Route: true,
			routeMiddleware: "./src/starlightRouteData.ts",
			customCss: ["./src/styles/custom.css"],
			head: [
				{
					tag: "script",
					content:
						"(()=>{const l=r=>{for(const b of (r||document).querySelectorAll('.expressive-code .copy button')){if(!b.hasAttribute('aria-label')&&b.title)b.setAttribute('aria-label',b.title);}};l();document.addEventListener('astro:page-load',()=>l());})();",
				},
			],
			plugins: [
				starlightBlog({ title: "News", prefix: "news", navigation: "none" }),
				starlightLlmsTxt({
					projectName: "Oicana",
					description:
						"Oicana is self-hosted PDF generation. Define templates with the open source typesetter Typst, then generate print-ready PDFs inside your own application from the browser or server-side with Node.js, Python, Java, C#, Rust, or PHP. No headless Chrome, no per-document fees, no data leaving your infrastructure.",
					details: [
						"Key facts for writing Oicana code:",
						"",
						"- Templates are plain `.typ` files written in [Typst](https://typst.app) and can use any Typst package.",
						"- Dynamic data is passed as typed inputs declared in the template and provided at compile time by the integration.",
						"- The same template compiles across every integration; only the host-language glue differs.",
						"- Every integration has an open source example project at https://github.com/oicana.",
						"",
						"Writing the Typst template is usually the larger half of the work. Target Typst 0.15.1 and consult the Typst references linked below before writing template markup.",
					].join("\n"),
					customSets: [
						{
							label: "Developer documentation",
							description:
								"Getting started, integrations for 7 languages, Typst templating, guides, and CLI reference",
							paths: ["docs/**"],
						},
					],
					optionalLinks: [
						{
							label: "Typst reference (0.15.1)",
							url: "https://typst.app/docs/reference/",
							description:
								"Canonical reference for Typst syntax, scripting, styling, and the standard library. Server-rendered, so it can be fetched directly",
						},
						{
							label: "Typst tutorial",
							url: "https://typst.app/docs/tutorial/",
							description:
								"Start here for markup basics, set and show rules, and building reusable templates",
						},
						{
							label: "Typst guides",
							url: "https://typst.app/docs/guides/",
							description:
								"Focused guides including the table guide, page setup, accessibility, and a guide for LaTeX users",
						},
						{
							label: "Complete Typst documentation (PDF, v0.15.1)",
							url: "https://github.com/typst/typst/releases/download/v0.15.1/typst-documentation.pdf",
							description:
								"The entire official Typst documentation as a single file, for loading the full language reference into context at once",
						},
						{
							label: "Typst Universe",
							url: "https://typst.app/universe/",
							description:
								"Searchable index of Typst packages. Oicana templates can depend on any of them, see the helpful packages page",
						},
						{
							label: "typst-author agent skill",
							url: "https://github.com/apcamargo/typst-skills",
							description:
								"Community agent skill with idiomatic Typst patterns and common LLM pitfalls. Useful as a system prompt or skill for coding agents",
						},
						{
							label: "typst-mcp",
							url: "https://github.com/johannesbrandenburger/typst-mcp",
							description:
								"Community MCP server that exposes the Typst docs to an agent and can validate and render Typst code, plus convert LaTeX to Typst",
						},
					],
					promote: ["index*", "docs/index*", "docs/getting-started/**"],
					demote: [
						"imprint",
						"privacy-policy",
						"terms-of-service",
						"refund-policy",
					],
					exclude: [
						"index",
						"imprint",
						"privacy-policy",
						"terms-of-service",
						"refund-policy",
						"compare/**",
						"news/**",
						"pdf-generation/**",
					],
				}),
			],
			components: {
				SocialIcons: "./src/components/SocialIcons.astro",
				SiteTitle: "./src/components/SiteTitle.astro",
				Footer: "./src/components/Footer.astro",
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
				{
					icon: "linkedin",
					label: "LinkedIn",
					href: "https://www.linkedin.com/company/oicana",
				},
				{
					icon: "x.com",
					label: "X",
					href: "https://x.com/oicana_com",
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
						{
							label: "Async Node.js Compilation",
							slug: "docs/guides/nodejs-async",
						},
						{ label: "Styled Inputs", slug: "docs/guides/styled-inputs" },
						{
							label: "ZUGFeRD and Factur-X e-invoices",
							slug: "docs/guides/zugferd-factur-x",
						},
						{
							label: "Deploying the Browser WASM",
							slug: "docs/guides/browser-deployment",
						},
					],
				},
				{ label: "Credits", slug: "docs/credits" },
			],
		}),
	],
});

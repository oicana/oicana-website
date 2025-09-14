// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://oicana.com",
  integrations: [
    starlight({
      title: "Oicana",
      favicon: '/oicana.svg',
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
    }),
  ],
});

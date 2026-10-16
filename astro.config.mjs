// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
// A plain static build into dist/, which Cloudflare Pages serves as it is.
// Every page is made at build time, so no adapter is needed.
export default defineConfig({
  site: "https://modworks.tf",
});

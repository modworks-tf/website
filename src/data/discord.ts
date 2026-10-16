/** The Discord side: client mods and themes. */

import type { ToolLink } from "./types";

export const tools: ToolLink[] = [
  {
    name: "Vencord",
    description: "A Discord client mod that blocks tracking, adds plugins, theme support and more.",
    href: "https://vencord.dev/",
    tag: "client mod",
    action: "Open",
  },
  {
    name: "BetterDiscord",
    description: "Extends what Discord can do with new features.",
    href: "https://betterdiscord.app/",
    tag: "client mod",
    action: "Open",
  },
  {
    name: "OpenAsar",
    description: "A rewrite of part of Discord's desktop code, faster and with more features.",
    href: "https://openasar.dev/",
    tag: "speed",
    action: "Open",
  },
  {
    name: "Custom CSS",
    description: "CSS snippets that restyle the Discord client. Use them with Vencord, OpenAsar or BetterDiscord.",
    tag: "themes",
    modal: "customcss-modal",
    action: "Snippets",
  },
];

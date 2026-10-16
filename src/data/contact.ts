/** Ways to get in touch, for the contact page. */

export const DISCORD = "https://discord.gg/XFDn8bbC7Q";
export const EMAIL = "support@modworks.tf";

export interface Contact {
  name: string;
  description: string;
  href: string;
  action: string;
  icon: "chat" | "mail" | "code" | "external";
  /** Shown as the button text, kept away from Cloudflare's email obfuscation. */
  email?: boolean;
  external?: boolean;
}

export const contacts: Contact[] = [
  {
    name: "Discord",
    description: "The quickest way to reach us. Ask a question, share a setup, or hear about updates first.",
    href: DISCORD,
    action: "Join the server",
    icon: "chat",
    external: true,
  },
  {
    name: "Email",
    description: "For anything that doesn't fit in a chat message.",
    href: `mailto:${EMAIL}`,
    action: EMAIL,
    icon: "mail",
    email: true,
  },
  {
    name: "Cryptic issues",
    description: "Found a bug in Cryptic or want a feature? Open an issue on GitHub so it can be tracked.",
    href: "https://github.com/WhyiMicro/cryptic/issues",
    action: "Open an issue",
    icon: "code",
    external: true,
  },
  {
    name: "Steam",
    description: "The creator of modworks.tf on Steam.",
    href: "https://steamcommunity.com/profiles/76561198344765754",
    action: "View profile",
    icon: "external",
    external: true,
  },
];

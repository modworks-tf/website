/** The TF2 side: mods, other tools and ways to get in touch. */

export interface Tf2Mod {
  name: string;
  description: string;
  creator: string;
  version: string;
  href: string;
  tags?: string[];
  private?: boolean;
}

export const mods: Tf2Mod[] = [
  {
    name: "lilith",
    description: "A customizable, useful UI in TF2, toggled with Right Shift.",
    creator: "iMicro",
    version: "1.4.1",
    href: "https://github.com/WhyiMicro/lilith/releases/download/1.4.1/lilith.vpk",
    private: true,
  },
  {
    name: "Venom Crosshairs",
    description: "A tool to create highly customizable, weapon-specific crosshairs.",
    creator: "hbivnm",
    version: "beta 17.0",
    href: "https://github.com/hbivnm/Venom-Crosshairs/releases/download/beta17/VenomCrosshairs_b17.0.zip",
    tags: ["tool"],
  },
  {
    name: "Flat Textures",
    description: "Overhauls TF2's textures with smooth new ones.",
    creator: "flewvar",
    version: "2.5",
    href: "https://gamebanana.com/dl/677961",
  },
  {
    name: "No Hats",
    description: "Stops the game loading cosmetics, but keeps each merc's default headgear.",
    creator: "pvs",
    version: "latest",
    href: "https://pevhs.ch/tf2/vpk/nhbgum/no_hats_bgum.vpk",
  },
  {
    name: "Yttrium's Competitive Viewmodels",
    description: "A customizable tool to hide weapon viewmodels selectively.",
    creator: "Yttrium",
    version: "1.4.1",
    href: "https://github.com/Yttrium-tYcLief/CompVMInstaller/releases/download/v1.4.1/CompVMInstaller_1.4.1.exe",
    tags: ["tool"],
  },
];

export interface Tf2Link {
  name: string;
  description: string;
  href?: string;
  tag: string;
  tagKind?: "discord";
  /** Opens a modal instead of a link. */
  modal?: string;
  action: string;
}

export const others: Tf2Link[] = [
  {
    name: "OpenAsar",
    description: "A rewrite of part of Discord's desktop code, faster and with more features.",
    href: "https://openasar.dev/",
    tag: "Discord",
    tagKind: "discord",
    action: "Open",
  },
  {
    name: "Vencord",
    description: "A Discord client mod that blocks tracking, adds plugins, theme support and more.",
    href: "https://vencord.dev/",
    tag: "Discord",
    tagKind: "discord",
    action: "Open",
  },
  {
    name: "BetterDiscord",
    description: "Extends what Discord can do with new features.",
    href: "https://betterdiscord.app/",
    tag: "Discord",
    tagKind: "discord",
    action: "Open",
  },
  {
    name: "Equalizer APO",
    description: "A parametric and graphic equalizer for Windows.",
    href: "https://sourceforge.net/projects/equalizerapo/",
    tag: "sfx",
    action: "Open",
  },
  {
    name: "Custom CSS",
    description: "CSS snippets that restyle the Discord client. Use them with Vencord, OpenAsar or BetterDiscord.",
    tag: "Discord",
    tagKind: "discord",
    modal: "customcss-modal",
    action: "Snippets",
  },
];

export const contacts = [
  {
    name: "Discord",
    description: "Join the modworks.tf Discord server.",
    href: "https://discord.gg/XFDn8bbC7Q",
    action: "Join",
    icon: "chat" as const,
  },
  {
    name: "Steam",
    description: "The creator of modworks.tf on Steam.",
    href: "https://steamcommunity.com/profiles/76561198344765754",
    action: "Open",
    icon: "external" as const,
  },
  {
    name: "Mail",
    description: "Send us an email.",
    href: "mailto:support@modworks.tf",
    action: "support@modworks.tf",
    icon: "mail" as const,
  },
];

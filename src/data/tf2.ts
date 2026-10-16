/** The TF2 side: the mods. */

export interface Tf2Mod {
  name: string;
  description: string;
  creator: string;
  version: string;
  href: string;
  tags?: string[];
}

export const mods: Tf2Mod[] = [
  {
    name: "lilith",
    description: "A customizable, useful UI in TF2.",
    creator: "iMicro",
    version: "1.4.1",
    href: "https://github.com/WhyiMicro/lilith/releases/download/1.4.1/lilith.vpk",
  },
  {
    name: "Venom Crosshairs",
    description: "A tool to create highly customizable, weapon-specific crosshairs.",
    creator: "hbivnm",
    version: "beta 18.0",
    href: "https://github.com/hbivnm/Venom-Crosshairs/releases/download/beta18/VenomCrosshairs_b18.0.zip",
    tags: ["tool"],
  },
  {
    name: "Flat Textures",
    description: "Overhauls TF2's textures to be a flat color.",
    creator: "flewvar, JarateKing & Eduardobiscoito100",
    version: "2.5",
    href: "https://gamebanana.com/dl/1658611",
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

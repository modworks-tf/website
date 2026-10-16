/** What Cryptic does, grouped the way its menu is, for the Cryptic page. */

export interface FeatureGroup {
  id: string;
  title: string;
  icon: "skull" | "crown" | "gem" | "sparkles" | "eye" | "sliders";
  blurb: string;
  features: { name: string; text: string }[];
}

export const featureGroups: FeatureGroup[] = [
  {
    id: "dungeons",
    title: "Dungeons",
    icon: "skull",
    blurb: "Everything from the first room to the Croesus chest.",
    features: [
      { name: "Dungeon Map", text: "The map on screen with rooms, checkmarks, door keys and the score underneath." },
      { name: "Secrets & waypoints", text: "Every room's secrets marked, plus your own waypoints and packs." },
      { name: "Puzzle Solver", text: "Water Board, teleport maze, Ice Path, Tic Tac Toe and the rest, solved." },
      { name: "Blood Camp", text: "Where each blood mob will land, measured from the server's own position." },
      { name: "Spirit Leap Overlay", text: "A four-corner leap menu that faces you the way your teammate does." },
      { name: "Croesus Helper", text: "Which chests are worth a key, remembered across sessions." },
    ],
  },
  {
    id: "floor7",
    title: "Floor 7",
    icon: "crown",
    blurb: "Terminals, devices and the bosses in between.",
    features: [
      { name: "Terminal Solver", text: "Solves all six terminals, with its own click sound." },
      { name: "Terminal Simulator", text: "Practise every terminal off a run, with personal bests." },
      { name: "Device Solver", text: "Simon Says, Lights On, Arrow Align and Sharp Shooter." },
      { name: "Terminal Order & ESP", text: "Your section's terminals, numbered and boxed through walls." },
      { name: "F7/M7 QOL", text: "Maxor crystal timers, gate and wither callouts, cleaner titles." },
      { name: "Boss tools", text: "Livid finder, Spirit Bear, terracotta timers and boss waypoints." },
    ],
  },
  {
    id: "mining",
    title: "Crystal Hollows",
    icon: "gem",
    blurb: "Nucleus runs without the guesswork.",
    features: [
      { name: "Metal Detector solver", text: "Finds the Mines of Divan treasure from a couple of still readings." },
      { name: "Treasure chests", text: "Timers, a tracer through them, and the next lock to pick." },
      { name: "Crystal Hollows map", text: "The places found this lobby, from the sidebar, chat and Skyblocker." },
      { name: "Missing crystals", text: "Which crystals are still to be placed, as gems or written out." },
      { name: "Crystal outlines", text: "The nucleus slots and every crystal's spot, in each crystal's colour." },
      { name: "Run alerts", text: "All four tools found, a full inventory, and the Mole pet reminder." },
    ],
  },
  {
    id: "everyday",
    title: "Everyday",
    icon: "sparkles",
    blurb: "The small things that come up every session.",
    features: [
      { name: "Daily Rewards", text: "Hypixel's three reward cards, turned over and claimed in game." },
      { name: "Booster Cookie", text: "A check on every lobby and a countdown through its last minute." },
      { name: "Party Features", text: "Invites you can answer with a key, and !dt handled for you." },
      { name: "Etherwarp", text: "Smooth teleports, an overlay where you'll land, and no rotate." },
      { name: "Experiment Solver", text: "The experimentation table's games, solved and played through." },
      { name: "Slot Binds & more", text: "Shift-click slot swaps, gyro and spring boots helpers, better chat." },
    ],
  },
  {
    id: "visual",
    title: "Visual",
    icon: "eye",
    blurb: "Make the game look the way you want it to.",
    features: [
      { name: "Crosshair Editor", text: "Draw your own crosshair pixel by pixel, sharp at any scale." },
      { name: "Block Overlay", text: "Gradients, rainbow, cut corners and gliding block outlines." },
      { name: "Animations", text: "Restyle your held item and how it swings." },
      { name: "Players", text: "Resize, recolour or hide the players crowding you, and their name tags." },
      { name: "Render Optimizer", text: "Skips drawing the clutter a dungeon run piles up." },
      { name: "World", text: "Hold the time of day, darken the screen, or see lava as water." },
    ],
  },
  {
    id: "menu",
    title: "Menu & tools",
    icon: "sliders",
    blurb: "A menu built to stay out of the way.",
    features: [
      { name: "Card menu", text: "Search, favourites and every setting explained right where it is." },
      { name: "Profiles", text: "Save setups, switch between them, and share one with a friend." },
      { name: "HUD editor", text: "Drag and scale every HUD element, with the others faded back." },
      { name: "Keybinds & aliases", text: "Keys and short commands that run whatever you need." },
      { name: "Sound Manager", text: "Turn any sound in the game up or down, one by one." },
      { name: "Auto updates", text: "The next version installed when you close the game." },
    ],
  },
];

export const highlights = [
  { value: "75+", label: "modules in one mod" },
  { value: "26.2", label: "Minecraft, on Fabric" },
  { value: "Vulkan", label: "or OpenGL, whichever you play on" },
  { value: "Auto", label: "updates for your Minecraft version" },
];

export const faq = [
  {
    q: "What do I need to run it?",
    a: "Minecraft 26.2 with Fabric Loader 0.19.5 or newer, Java 25, Fabric API and Fabric Language Kotlin. Put the Cryptic jar in your mods folder next to them.",
  },
  {
    q: "How do I open the menu?",
    a: "Right Shift. You can change the key in Minecraft's Controls, or from Click GUI inside the menu itself.",
  },
  {
    q: "Does it work alongside Skyblocker, SkyHanni or Odin?",
    a: "Yes. Cryptic is played with them installed, and where two mods draw the same thing you can switch off whichever copy you don't want.",
  },
  {
    q: "How do updates work?",
    a: "Update Checker tells you when a new version is out. Turn on Install updates automatically and the new jar is swapped in after you close the game. Only a release built for your Minecraft version is ever installed.",
  },
  {
    q: "Is it allowed on Hypixel?",
    a: "Most of Cryptic reads what Hypixel already shows you and draws it more clearly. A few modules (Auto GFS, Auto Requeue, Aliases, Keybinds, Experiment Solver and Talk before they load) send commands or clicks for you. Hypixel's rules are yours to weigh, so use those knowing that.",
  },
  {
    q: "Where do the features come from?",
    a: "Many are ported from open-source mods such as Odin, Skyblocker, SkyHanni and NoammAddons, under their licences. Every one is credited in the README, with its licence alongside.",
  },
];

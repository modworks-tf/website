/**
 * Cryptic's releases on GitHub, read when the site is built.
 *
 * The page also asks GitHub again in the browser (see LatestRelease.astro),
 * so a release published after the last deploy still shows on the download
 * button. If GitHub cannot be reached at build time, the page falls back to
 * linking the releases page itself.
 */

export const REPO = "WhyiMicro/cryptic";
export const RELEASES_URL = `https://github.com/${REPO}/releases`;

export interface Release {
  tag: string;
  version: string;
  name: string;
  date: string;
  url: string;
  jarUrl: string | null;
  jarName: string | null;
  jarSize: number | null;
  minecraft: string | null;
  html: string;
}

interface GitHubAsset {
  name: string;
  size: number;
  browser_download_url: string;
}

interface GitHubRelease {
  tag_name: string;
  name: string | null;
  published_at: string;
  html_url: string;
  body: string | null;
  draft: boolean;
  prerelease: boolean;
  assets: GitHubAsset[];
}

/** "v0.34.1-26.2" → { version: "0.34.1", minecraft: "26.2" }. */
function splitTag(tag: string) {
  const match = /^v?(\d+\.\d+\.\d+)(?:-(.+))?$/.exec(tag);
  return { version: match?.[1] ?? tag.replace(/^v/, ""), minecraft: match?.[2] ?? null };
}

export function toRelease(raw: GitHubRelease): Release {
  const { version, minecraft } = splitTag(raw.tag_name);
  const jar = raw.assets.find((a) => a.name.endsWith(".jar") && !a.name.includes("sources")) ?? null;
  return {
    tag: raw.tag_name,
    version,
    name: raw.name ?? raw.tag_name,
    date: raw.published_at,
    url: raw.html_url,
    jarUrl: jar?.browser_download_url ?? null,
    jarName: jar?.name ?? null,
    jarSize: jar?.size ?? null,
    minecraft,
    html: markdown(raw.body ?? ""),
  };
}

export async function getReleases(count = 5): Promise<Release[]> {
  try {
    const response = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=${count + 5}`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "modworks.tf" },
    });
    if (!response.ok) return [];
    const list = (await response.json()) as GitHubRelease[];
    return list
      .filter((r) => !r.draft && !r.prerelease)
      .slice(0, count)
      .map(toRelease);
  } catch {
    return [];
  }
}

export function formatSize(bytes: number | null): string {
  if (!bytes) return "";
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// ---------------------------------------------------------------------------
// The release notes are Markdown. This covers what they use: headings, lists,
// bold and italics, inline code, links, paragraphs and GitHub's alert boxes.
// ---------------------------------------------------------------------------

function escape(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(text: string) {
  return escape(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

export function markdown(source: string): string {
  const out: string[] = [];
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  let list: string[] | null = null;
  let paragraph: string[] = [];
  let alert: { kind: string; lines: string[] } | null = null;

  const flushParagraph = () => {
    if (paragraph.length) out.push(`<p>${inline(paragraph.join(" "))}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (list) out.push(`<ul>${list.map((item) => `<li>${inline(item)}</li>`).join("")}</ul>`);
    list = null;
  };
  const flushAlert = () => {
    if (alert) out.push(`<div class="note note-${alert.kind}">${inline(alert.lines.join(" "))}</div>`);
    alert = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const quote = /^>\s?(.*)$/.exec(line);
    if (quote) {
      flushParagraph();
      flushList();
      const kind = /^\[!(\w+)\]$/.exec(quote[1].trim());
      if (kind) alert = { kind: kind[1].toLowerCase(), lines: [] };
      else (alert ??= { kind: "note", lines: [] }).lines.push(quote[1]);
      continue;
    }
    flushAlert();

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }
    const heading = /^(#{1,4})\s+(.*)$/.exec(line);
    if (heading) {
      flushParagraph();
      flushList();
      const level = Math.min(heading[1].length + 2, 5);
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }
    const item = /^\s*[-*]\s+(.*)$/.exec(line);
    if (item) {
      flushParagraph();
      (list ??= []).push(item[1]);
      continue;
    }
    if (list && /^\s{2,}\S/.test(raw)) {
      // A wrapped list item.
      list[list.length - 1] += ` ${line.trim()}`;
      continue;
    }
    flushList();
    paragraph.push(line.trim());
  }
  flushParagraph();
  flushList();
  flushAlert();
  return out.join("\n");
}

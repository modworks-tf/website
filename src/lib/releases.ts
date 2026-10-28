/**
 * Cryptic's releases on GitHub, read when the site is built.
 *
 * The page also asks GitHub again in the browser (see LatestRelease.astro),
 * so a release published after the last deploy still shows on the download
 * button. GitHub's API turns Cloudflare's builders away when they've used up
 * its hourly limit, so the releases' Atom feed, which has no such limit, is
 * read instead. If neither answers, the page links the releases page itself.
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
    if (response.ok) {
      const list = (await response.json()) as GitHubRelease[];
      return list
        .filter((r) => !r.draft && !r.prerelease)
        .slice(0, count)
        .map(toRelease);
    }
  } catch {
    // The feed below.
  }
  return getReleasesFromFeed(count);
}

function unescapeXml(text: string) {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

/**
 * The same releases from GitHub's Atom feed. Its notes are already HTML, rendered by GitHub. The
 * feed has no assets, so the jar's link is built from the name every release uses, and its size
 * is left out.
 */
async function getReleasesFromFeed(count: number): Promise<Release[]> {
  try {
    const response = await fetch(`${RELEASES_URL}.atom`, { headers: { "User-Agent": "modworks.tf" } });
    if (!response.ok) return [];
    const xml = await response.text();
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => m[1]);
    return entries.slice(0, count).flatMap((entry) => {
      const tag = /<id>[^<]*\/([^/<]+)<\/id>/.exec(entry)?.[1];
      if (!tag) return [];
      const { version, minecraft } = splitTag(tag);
      const jarName = minecraft ? `cryptic-${version}-${minecraft}.jar` : null;
      return [{
        tag,
        version,
        name: unescapeXml(/<title>([\s\S]*?)<\/title>/.exec(entry)?.[1] ?? tag),
        date: /<updated>([^<]+)<\/updated>/.exec(entry)?.[1] ?? "",
        url: /<link[^>]*href="([^"]+)"/.exec(entry)?.[1] ?? `${RELEASES_URL}/tag/${tag}`,
        jarUrl: jarName ? `${RELEASES_URL}/download/${tag}/${jarName}` : null,
        jarName,
        jarSize: null,
        minecraft,
        html: unescapeXml(/<content[^>]*>([\s\S]*?)<\/content>/.exec(entry)?.[1] ?? ""),
      }];
    });
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
// The release notes are Markdown. This covers what they use: headings, lists
// (one level of nesting), bold and italics, inline code, links, paragraphs and
// GitHub's alert boxes.
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
  // Each item with the indented items under it.
  let list: { text: string; children: string[] }[] | null = null;
  let paragraph: string[] = [];
  let alert: { kind: string; lines: string[] } | null = null;

  const flushParagraph = () => {
    if (paragraph.length) out.push(`<p>${inline(paragraph.join(" "))}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (list) {
      const items = list.map((item) => {
        const nested = item.children.length
          ? `<ul>${item.children.map((child) => `<li>${inline(child)}</li>`).join("")}</ul>`
          : "";
        return `<li>${inline(item.text)}${nested}</li>`;
      });
      out.push(`<ul>${items.join("")}</ul>`);
    }
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
    const item = /^(\s*)[-*]\s+(.*)$/.exec(line);
    if (item) {
      flushParagraph();
      const last = list?.[list.length - 1];
      // Indented under an item: a sub-item of it.
      if (last && item[1].length >= 2) last.children.push(item[2]);
      else (list ??= []).push({ text: item[2], children: [] });
      continue;
    }
    if (list && /^\s{2,}\S/.test(raw)) {
      // A wrapped list item, or a wrapped sub-item.
      const last = list[list.length - 1];
      if (last.children.length) last.children[last.children.length - 1] += ` ${line.trim()}`;
      else last.text += ` ${line.trim()}`;
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

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

function getLastAssistantText(entries: any[]): string {
	for (let i = entries.length - 1; i >= 0; i--) {
		const e = entries[i];
		if (e?.type !== "message" || e.message?.role !== "assistant") continue;
		const content = e.message.content;
		const text = Array.isArray(content)
			? content.map((c: any) => (typeof c === "string" ? c : c?.text ?? "")).join("\n")
			: String(content ?? "");
		if (text.trim()) return text;
	}
	return "";
}

function expandPath(p: string, cwd: string): string {
	if (p.startsWith("~/")) return path.join(homedir(), p.slice(2));
	if (path.isAbsolute(p)) return p;
	return path.resolve(cwd, p);
}

function extractCandidates(text: string, cwd: string): string[] {
	const seen = new Set<string>();
	const out: string[] = [];
	// Match backticked/quoted/plain paths; capture optional :line suffix.
	const re = /`([^`]+)`|'([^']+)'|"([^"]+)"|(?<!\S)(~?\/?[A-Za-z0-9_./-]+\.[A-Za-z0-9]+)(?::(\d+))?(?!\S)/g;
	let m: RegExpExecArray | null;
	while ((m = re.exec(text)) !== null) {
		const raw = (m[1] ?? m[2] ?? m[3] ?? m[4] ?? "").trim().replace(/[.,;:)]+$/, "");
		if (!raw) continue;
		const lineSuffix = m[5];
		const candidate = lineSuffix ? `${raw}:${lineSuffix}` : raw;
		const resolved = expandPath(raw.split(":")[0], cwd);
		if (!existsSync(resolved)) continue;
		if (seen.has(resolved)) continue;
		seen.add(resolved);
		out.push(candidate);
	}
	return out;
}

function openInZellij(file: string, line?: string) {
	const args = ["edit", "--floating", "--width", "80%", "--height", "80%"];
	if (line) args.push("--line-number", line);
	args.push(file);
	execFileSync("zellij", args, { stdio: "ignore" });
}

export default function editExtension(pi: ExtensionAPI) {
	pi.registerCommand("edit", {
		description: "Open a file path from the last assistant message in a floating zellij pane",
		handler: async (args, ctx) => {
			const explicit = args.trim();
			const cwd = ctx.cwd ?? process.cwd();
			let candidates: string[] = [];
			if (explicit) {
				const resolved = expandPath(explicit, cwd);
				if (existsSync(resolved)) candidates = [explicit];
				else {
					ctx.ui.notify(`File not found: ${explicit}`, "error");
					return;
				}
			} else {
				const text = getLastAssistantText(ctx.sessionManager.getBranch());
				candidates = extractCandidates(text, cwd);
			}
			if (candidates.length === 0) {
				ctx.ui.notify("No file path found", "error");
				return;
			}
			let chosen = candidates[0];
			if (candidates.length > 1) {
				const sel = await ctx.ui.select("Select file to edit", candidates);
				if (!sel) return;
				chosen = sel;
			}
			const [file, line] = chosen.split(":");
			const resolved = expandPath(file, cwd);
			try {
				openInZellij(resolved, line);
				ctx.ui.notify(`Opened ${resolved}`, "info");
			} catch (e) {
				ctx.ui.notify(`Failed to open ${resolved}: ${String(e)}`, "error");
			}
		},
	});
}
"""Renders the self-hosted profile cards (activity, languages, quote of the day).

Runs daily from .github/workflows/profile.yml and publishes the SVGs to the
`output` branch, so the README never depends on a third-party stats service.
Standard library only.
"""
from __future__ import annotations

import argparse
import datetime as dt
import html
import json
import os
import re
import urllib.request

USER = os.environ.get("PROFILE_USER", "bapanghosh0812")
TOKEN = os.environ.get("GITHUB_TOKEN", "")
IST = dt.timezone(dt.timedelta(hours=5, minutes=30))


def today_ist() -> dt.date:
    return dt.datetime.now(IST).date()

BG = "#0A0A0C"
LINE = "#D4AF37"
IVORY = "#EFE8D6"
MUTED = "#9C9482"
SANS = "'Segoe UI',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif"
SERIF = "Georgia,'Times New Roman',serif"
HEAT = ["#17150F", "#4A3B17", "#7C6224", "#B8922E", "#F1D98B"]
IGNORED_LANGUAGES = {"HTML", "CSS", "SCSS", "Dockerfile", "Shell", "Batchfile", "PowerShell", "Makefile"}
LANG_COLORS = ["#F1D98B", "#D4AF37", "#A8862F", "#7C6224", "#E8E2D0", "#6B6455"]


def fetch(url: str, api: bool = False) -> bytes:
    headers = {"User-Agent": f"{USER}-profile-cards"}
    if api:
        headers["Accept"] = "application/vnd.github+json"
        if TOKEN:
            headers["Authorization"] = f"Bearer {TOKEN}"
    with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=30) as res:
        return res.read()


# ----------------------------------------------------------------------------- data
def contribution_calendar() -> list[tuple[dt.date, int, int]]:
    """Returns (date, level, count) for the last year from the public calendar."""
    page = fetch(f"https://github.com/users/{USER}/contributions").decode("utf-8")
    cells = {}
    for tag in re.findall(r"<td[^>]*data-date=\"[^\"]+\"[^>]*>", page):
        date = re.search(r'data-date="([^"]+)"', tag).group(1)
        level = int(re.search(r'data-level="(\d)"', tag).group(1))
        cid = re.search(r'id="([^"]+)"', tag).group(1)
        cells[cid] = [dt.date.fromisoformat(date), level, 0]
    for cid, text in re.findall(r'<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)</tool-tip>', page):
        m = re.match(r"\s*([\d,]+) contributions?", text)
        if cid in cells and m:
            cells[cid][2] = int(m.group(1).replace(",", ""))
    return sorted((tuple(v) for v in cells.values()), key=lambda c: c[0])


def streaks(days: list[tuple[dt.date, int, int]]) -> tuple[int, int]:
    longest = run = 0
    for _, _, count in days:
        run = run + 1 if count else 0
        longest = max(longest, run)
    current = 0
    rev = list(reversed(days))
    if rev and rev[0][2] == 0:  # today may simply not have activity yet
        rev = rev[1:]
    for _, _, count in rev:
        if not count:
            break
        current += 1
    return current, longest


def repositories() -> list[dict]:
    data = json.loads(fetch(f"https://api.github.com/users/{USER}/repos?per_page=100&type=owner", api=True))
    return [r for r in data if not r["fork"] and r["name"].lower() != USER.lower()]


def languages(repos: list[dict]) -> list[tuple[str, float]]:
    totals: dict[str, int] = {}
    for repo in repos:
        try:
            langs = json.loads(fetch(repo["languages_url"], api=True))
        except Exception:
            continue
        for name, size in langs.items():
            if name not in IGNORED_LANGUAGES:
                totals[name] = totals.get(name, 0) + size
    total = sum(totals.values()) or 1
    ranked = sorted(totals.items(), key=lambda kv: kv[1], reverse=True)
    top = [(k, v / total * 100) for k, v in ranked[:5]]
    rest = 100 - sum(p for _, p in top)
    if rest > 0.5:
        top.append(("Other", rest))
    return top


# ----------------------------------------------------------------------------- svg helpers
def shell(w: int, h: int, body: str, title: str) -> str:
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-label="{html.escape(title)}">
  <defs>
    <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F6E2A0"/><stop offset=".55" stop-color="#D4AF37"/><stop offset="1" stop-color="#9C7424"/>
    </linearGradient>
    <radialGradient id="glow" cx=".5" cy="0" r=".9">
      <stop offset="0" stop-color="#D4AF37" stop-opacity=".10"/><stop offset="1" stop-color="#D4AF37" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="{w}" height="{h}" fill="{BG}"/>
  <rect width="{w}" height="{h}" fill="url(#glow)"/>
  <rect x="10.5" y="10.5" width="{w - 21}" height="{h - 21}" fill="none" stroke="{LINE}" stroke-opacity=".45"/>
  <path d="M6 26V6h20M{w - 26} 6h20v20M6 {h - 26}v20h20M{w - 26} {h - 6}h20v-20" fill="none" stroke="{LINE}" stroke-width="2"/>
{body}
</svg>
"""


def label(x: float, y: float, text: str, size: int = 11, fill: str = LINE, anchor: str = "start", spacing: float = 2.2) -> str:
    return (f'<text x="{x}" y="{y}" fill="{fill}" font-family="{SANS}" font-size="{size}" font-weight="600" '
            f'letter-spacing="{spacing}" text-anchor="{anchor}">{html.escape(text)}</text>')


# ----------------------------------------------------------------------------- cards
def activity_card(days, repo_count: int) -> str:
    w, h = 880, 300
    total = sum(c for _, _, c in days)
    active = sum(1 for _, _, c in days if c)
    current, longest = streaks(days)
    metrics = [(f"{total:,}", "CONTRIBUTIONS"), (str(active), "ACTIVE DAYS"), (str(current), "CURRENT STREAK"),
               (str(longest), "LONGEST STREAK"), (str(repo_count), "PUBLIC PROJECTS")]
    body = [label(40, 46, "ACTIVITY  ·  LAST TWELVE MONTHS"),
            label(w - 40, 46, f"AUTO-UPDATED  ·  {today_ist():%d %b %Y}".upper(), fill=MUTED, anchor="end", spacing=1.6)]
    col = (w - 80) / len(metrics)
    for i, (value, name) in enumerate(metrics):
        cx = 40 + col * i + col / 2
        body.append(f'<text x="{cx:.1f}" y="104" fill="url(#gold)" font-family="{SERIF}" font-size="34" text-anchor="middle">{value}</text>')
        body.append(label(cx, 126, name, size=10, fill=MUTED, anchor="middle", spacing=1.8))
        if i:
            x = 40 + col * i
            body.append(f'<line x1="{x:.1f}" y1="72" x2="{x:.1f}" y2="128" stroke="{LINE}" stroke-opacity=".35"/>')

    cell, gap = 11, 3
    weeks: list[list] = []
    for d in days:
        if not weeks or d[0].weekday() == 6:  # calendar columns start on Sunday
            weeks.append([])
        weeks[-1].append(d)
    grid_w = len(weeks) * (cell + gap) - gap
    x0 = (w - grid_w) / 2
    y0 = 176
    last_month = None
    for wi, week in enumerate(weeks):
        for d, level, count in week:
            row = (d.weekday() + 1) % 7
            x = x0 + wi * (cell + gap)
            y = y0 + row * (cell + gap)
            tip = f"{count} contribution{'s' if count != 1 else ''} on {d:%d %b %Y}"
            body.append(f'<rect x="{x:.1f}" y="{y}" width="{cell}" height="{cell}" rx="2" fill="{HEAT[level]}"><title>{tip}</title></rect>')
        first = week[0][0]
        if first.month != last_month and first.day <= 7:
            body.append(label(x0 + wi * (cell + gap), y0 - 10, first.strftime("%b").upper(), size=9, fill=MUTED, spacing=1.2))
            last_month = first.month
    lx = x0 + grid_w - 5 * (cell + gap) - 40
    body.append(label(lx - 6, h - 22, "LESS", size=9, fill=MUTED, anchor="end", spacing=1.2))
    for i, colr in enumerate(HEAT):
        body.append(f'<rect x="{lx + i * (cell + gap):.1f}" y="{h - 31}" width="{cell}" height="{cell}" rx="2" fill="{colr}"/>')
    body.append(label(lx + 5 * (cell + gap) + 4, h - 22, "MORE", size=9, fill=MUTED, spacing=1.2))
    return shell(w, h, "\n".join("  " + b for b in body), "GitHub activity")


def languages_card(langs) -> str:
    w, h = 430, 250
    body = [label(32, 46, "LANGUAGES  ·  BY CODE VOLUME")]
    x, bar_w = 32, w - 64
    for i, (name, pct) in enumerate(langs):
        seg = bar_w * pct / 100
        body.append(f'<rect x="{x:.1f}" y="66" width="{max(seg - 2, 1):.1f}" height="8" fill="{LANG_COLORS[i % len(LANG_COLORS)]}"/>')
        x += seg
    for i, (name, pct) in enumerate(langs):
        cx = 32 + (i % 2) * 190
        cy = 112 + (i // 2) * 40
        body.append(f'<rect x="{cx}" y="{cy - 9}" width="10" height="10" fill="{LANG_COLORS[i % len(LANG_COLORS)]}"/>')
        body.append(f'<text x="{cx + 20}" y="{cy}" fill="{IVORY}" font-family="{SANS}" font-size="14">{html.escape(name)}</text>')
        body.append(f'<text x="{cx + 168}" y="{cy}" fill="url(#gold)" font-family="{SERIF}" font-size="15" text-anchor="end">{pct:.1f}%</text>')
    return shell(w, h, "\n".join("  " + b for b in body), "Most used languages")


QUOTES = [
    ("Make it work, make it right, make it fast.", "Kent Beck"),
    ("Simplicity is prerequisite for reliability.", "Edsger W. Dijkstra"),
    ("Programs must be written for people to read, and only incidentally for machines to execute.", "Harold Abelson"),
    ("Talk is cheap. Show me the code.", "Linus Torvalds"),
    ("First, solve the problem. Then, write the code.", "John Johnson"),
    ("Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", "Martin Fowler"),
    ("The best way to predict the future is to invent it.", "Alan Kay"),
    ("Simple things should be simple, complex things should be possible.", "Alan Kay"),
    ("Real artists ship.", "Steve Jobs"),
    ("Design is not just what it looks like and feels like. Design is how it works.", "Steve Jobs"),
    ("Controlling complexity is the essence of computer programming.", "Brian Kernighan"),
    ("Debugging is twice as hard as writing the code in the first place.", "Brian Kernighan"),
    ("Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.", "Antoine de Saint-Exupéry"),
    ("The most damaging phrase in the language is: it's always been done this way.", "Grace Hopper"),
    ("Testing shows the presence, not the absence of bugs.", "Edsger W. Dijkstra"),
    ("The only way to go fast is to go well.", "Robert C. Martin"),
    ("Truth can only be found in one place: the code.", "Robert C. Martin"),
    ("Optimism is an occupational hazard of programming: feedback is the treatment.", "Kent Beck"),
    ("Measuring programming progress by lines of code is like measuring aircraft building progress by weight.", "Bill Gates"),
    ("Deleted code is debugged code.", "Jeff Sickel"),
    ("Fix the cause, not the symptom.", "Steve Maguire"),
    ("Code is like humor. When you have to explain it, it's bad.", "Cory House"),
    ("Done is better than perfect.", "Sheryl Sandberg"),
    ("Premature optimization is the root of all evil.", "Donald Knuth"),
    ("Walking on water and developing software from a specification are easy if both are frozen.", "Edward V. Berard"),
    ("Software is a great combination between artistry and engineering.", "Bill Gates"),
]


def wrap(text: str, width: int) -> list[str]:
    lines, cur = [], ""
    for word in text.split():
        if len(cur) + len(word) + 1 > width and cur:
            lines.append(cur)
            cur = word
        else:
            cur = f"{cur} {word}".strip()
    return lines + [cur]


def quote_card(today: dt.date) -> str:
    w, h = 430, 250
    text, author = QUOTES[today.toordinal() % len(QUOTES)]
    lines = wrap(text, 36)
    size = 19 if len(lines) <= 3 else 16
    lh = size + 9
    top = 104 if len(lines) <= 3 else 96
    body = [label(32, 46, "QUOTE OF THE DAY"),
            f'<text x="{w - 34}" y="92" fill="url(#gold)" fill-opacity=".35" font-family="{SERIF}" font-size="96" text-anchor="end">&#8221;</text>']
    for i, line in enumerate(lines[:5]):
        body.append(f'<text x="32" y="{top + i * lh}" fill="{IVORY}" font-family="{SERIF}" font-style="italic" font-size="{size}">{html.escape(line)}</text>')
    ay = top + min(len(lines), 5) * lh + 12
    body.append(f'<line x1="32" y1="{ay - 4}" x2="56" y2="{ay - 4}" stroke="{LINE}"/>')
    body.append(label(66, ay, author.upper(), size=10, spacing=2))
    return shell(w, h, "\n".join("  " + b for b in body), "Quote of the day")


def trophies_card(days, repo_count: int) -> str:
    w, h = 880, 175
    total = sum(c for _, _, c in days)
    items = [
        ("PLAY STORE", "Rescuen Live", "Production Android"),
        ("FULL-STACK", f"{repo_count}+ Repositories", "Web · Mobile · TV"),
        ("SECURITY R&D", "Fortress UPI", "StrongBox · BLE/NFC"),
        ("AGENTIC AI", "Bedrock & Gemini", "Multi-Agent Systems"),
        ("VERIFIED", "8+ Credentials", "Oracle · Azure · IBM"),
        ("CONSISTENCY", f"{total}+ Commits", "Active Builder"),
    ]
    body = [label(32, 42, "ENGINEERING MILESTONES  ·  VERIFIED HONORS")]
    col = (w - 64) / len(items)
    for i, (tier, title, sub) in enumerate(items):
        x = 32 + col * i
        cx = x + col / 2
        body.append(f'<rect x="{x + 4:.1f}" y="58" width="{col - 8:.1f}" height="94" rx="3" fill="#0E0E12" stroke="{LINE}" stroke-opacity=".38"/>')
        body.append(f'<polygon points="{cx:.1f},70 {cx + 6:.1f},76 {cx:.1f},82 {cx - 6:.1f},76" fill="url(#gold)"/>')
        body.append(label(cx, 100, tier, size=9, fill=LINE, anchor="middle", spacing=1.6))
        body.append(f'<text x="{cx:.1f}" y="120" fill="{IVORY}" font-family="{SERIF}" font-size="13" font-weight="600" text-anchor="middle">{html.escape(title)}</text>')
        body.append(f'<text x="{cx:.1f}" y="138" fill="{MUTED}" font-family="{SANS}" font-size="10" text-anchor="middle">{html.escape(sub)}</text>')
    return shell(w, h, "\n".join("  " + b for b in body), "Engineering milestones and trophies")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", default="dist")
    args = parser.parse_args()
    os.makedirs(args.out, exist_ok=True)

    days = contribution_calendar()
    repos = repositories()
    cards = {
        "activity.svg": activity_card(days, len(repos)),
        "languages.svg": languages_card(languages(repos)),
        "quote.svg": quote_card(today_ist()),
        "trophies.svg": trophies_card(days, len(repos)),
    }
    for name, svg in cards.items():
        with open(os.path.join(args.out, name), "w", encoding="utf-8") as fh:
            fh.write(svg)
        print("wrote", name)


if __name__ == "__main__":
    main()


"""Community tic-tac-toe for the profile README.

Visitors open an issue titled `ttt|move|<0-8>` (the README links do this for
them). The workflow in .github/workflows/arcade.yml runs this script, which
applies the move, lets the bot answer, re-renders the board between the
ARCADE markers in README.md and writes a short reply for the issue.
"""
from __future__ import annotations

import json
import os
import random
import re
import urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
STATE = ROOT / ".github" / "arcade" / "state.json"
README = ROOT / "README.md"
REPLY = ROOT / "arcade_reply.md"
START, END = "<!-- ARCADE:START -->", "<!-- ARCADE:END -->"
LINES = [(0, 1, 2), (3, 4, 5), (6, 7, 8), (0, 3, 6), (1, 4, 7), (2, 5, 8), (0, 4, 8), (2, 4, 6)]
HUMAN, BOT = "X", "O"


def winner(board: list[str]) -> str | None:
    for a, b, c in LINES:
        if board[a] and board[a] == board[b] == board[c]:
            return board[a]
    return "draw" if all(board) else None


def minimax(board: list[str], player: str) -> tuple[int, int | None]:
    result = winner(board)
    if result == BOT:
        return 1, None
    if result == HUMAN:
        return -1, None
    if result == "draw":
        return 0, None
    best = (-2, None) if player == BOT else (2, None)
    for i in [i for i, v in enumerate(board) if not v]:
        board[i] = player
        score, _ = minimax(board, HUMAN if player == BOT else BOT)
        board[i] = ""
        if (player == BOT and score > best[0]) or (player == HUMAN and score < best[0]):
            best = (score, i)
    return best


def bot_move(board: list[str]) -> int:
    free = [i for i, v in enumerate(board) if not v]
    for mark in (BOT, HUMAN):  # take a win, otherwise block one
        for i in free:
            board[i] = mark
            done = winner(board) == mark
            board[i] = ""
            if done and (mark == BOT or random.random() < 0.85):
                return i
    if random.random() < 0.65:  # mostly perfect play, but beatable
        return minimax(board, BOT)[1]
    return random.choice(free)


def link(repo: str, title: str) -> str:
    body = "Just press **Create** and the board updates in about a minute. You can close this tab."
    q = urllib.parse.urlencode({"title": title, "body": body})
    return f"https://github.com/{repo}/issues/new?{q}"


def render(state: dict, repo: str) -> str:
    board = state["board"]
    rows = []
    for r in range(3):
        cells = []
        for c in range(3):
            i = r * 3 + c
            mark = board[i]
            if mark:
                img = f'<img src="./assets/arcade/{mark.lower()}.svg" width="72" alt="{mark}"/>'
                cells.append(f"<td>{img}</td>")
            else:
                img = f'<img src="./assets/arcade/empty.svg" width="72" alt="Play square {i + 1}"/>'
                cells.append(f'<td><a href="{link(repo, f"ttt|move|{i}")}">{img}</a></td>')
        rows.append("    <tr>" + "".join(cells) + "</tr>")
    s = state["stats"]
    players = ", ".join(f"[@{p}](https://github.com/{p})" for p in state["recent"][:6]) or "be the first"
    return "\n".join([
        START,
        '<div align="center">',
        "",
        f"**{state['message']}**",
        "",
        "  <table>",
        *rows,
        "  </table>",
        "",
        f"<sub>Games played <b>{s['games']}</b> &nbsp;·&nbsp; Visitors won <b>{s['human']}</b> &nbsp;·&nbsp; "
        f"Bot won <b>{s['bot']}</b> &nbsp;·&nbsp; Draws <b>{s['draw']}</b></sub><br/>",
        f"<sub>Recent players: {players}</sub><br/>",
        f'<sub><a href="{link(repo, "ttt|new")}">Start a fresh board</a></sub>',
        "",
        "</div>",
        END,
    ])


def finish(state: dict, result: str, player: str) -> str:
    key = {"X": "human", "O": "bot", "draw": "draw"}[result]
    state["stats"]["games"] += 1
    state["stats"][key] += 1
    state["board"] = [""] * 9
    text = {
        "human": f"@{player} beat the bot. New board is ready.",
        "bot": f"The bot won against @{player}. Your turn to get revenge.",
        "draw": f"Draw with @{player}. New board is ready.",
    }[key]
    state["message"] = text
    return text


def main() -> None:
    title = os.environ.get("ISSUE_TITLE", "").strip()
    player = re.sub(r"[^A-Za-z0-9-]", "", os.environ.get("ISSUE_USER", "visitor"))[:39] or "visitor"
    repo = os.environ.get("REPOSITORY", "bapanghosh0812/bapanghosh0812")
    state = json.loads(STATE.read_text(encoding="utf-8"))
    readme_url = f"https://github.com/{repo.split('/')[0]}"

    if title == "ttt|new":
        state["board"] = [""] * 9
        state["message"] = f"@{player} started a fresh board. You play gold X."
        reply = "Fresh board is ready."
    else:
        m = re.fullmatch(r"ttt\|move\|([0-8])", title)
        if not m:
            REPLY.write_text("That move was not recognised. Pick a square from the board on my profile.", encoding="utf-8")
            return
        cell = int(m.group(1))
        board = state["board"]
        if board[cell]:
            REPLY.write_text(f"Square {cell + 1} is already taken. [Back to the board]({readme_url})", encoding="utf-8")
            return
        board[cell] = HUMAN
        result = winner(board)
        if not result:
            board[bot_move(board)] = BOT
            result = winner(board)
        if result:
            reply = finish(state, result, player)
        else:
            state["message"] = f"@{player} played square {cell + 1}. The bot answered. Your move."
            reply = "Move played and the bot has answered."
        state["recent"] = [player] + [p for p in state["recent"] if p != player]
        state["recent"] = state["recent"][:12]

    STATE.write_text(json.dumps(state, indent=2) + "\n", encoding="utf-8")
    text = README.read_text(encoding="utf-8")
    pattern = re.compile(re.escape(START) + r".*?" + re.escape(END), re.S)
    README.write_text(pattern.sub(lambda _: render(state, repo), text), encoding="utf-8")
    REPLY.write_text(f"{reply} [Back to the board]({readme_url})\n", encoding="utf-8")


if __name__ == "__main__":
    main()


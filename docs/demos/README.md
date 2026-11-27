# Recording terminal demos

This guide shows how to record an interactive workspace session with `scripts/demo-record`, then render it as a GIF for inline sharing.

These examples include both formats:

- `.cast` stores timestamped terminal output for replay. Text may be selectable in an asciinema player.
- `.gif` plays inline in places such as GitHub, but its text is not selectable.

## Prerequisites

Run commands from the workspace root. The helper checks for the required tools before starting or stopping a recording. If a tool is unavailable, it prints setup instructions for the current environment. With mise, `mise install --include-lazy` includes the optional `asciinema` and `agg` tools. Without mise, install the missing tools and ensure they are on `PATH`.

The helper refuses to overwrite an existing cast or GIF. Choose a new slug for each recording.

## Start a recording

Choose a slug using letters, numbers, underscores, or hyphens. For example:

```sh
./scripts/demo-record start bench-tour
```

The helper prints the unique Zellij session name, cast path, a command for listing its panes, and the matching stop command. It records at 120x36. Run `./scripts/demo-record --help` for the command syntax.

Starting a recording does **not** start the `workspace-agent` pane or send a prompt. The helper leaves that pane suspended, and dismisses Zellij's generic `About Zellij` popup when it is focused. This gives you a chance to inspect the session before choosing what to show.

## Zellij command reference

The pinned Zellij CLI includes local help for commands and actions. From the workspace root, use:

```sh
zellij --help
zellij action --help
zellij action list-panes --help
zellij action write-chars --help
zellij action send-keys --help
```

For this workspace's launcher, layouts, and configuration, see the [Zellij configuration notes](../../zellij/README.md).

## Interact with the recorded session

Use the session name printed by `start` in place of `SESSION_NAME`. Clear inherited Zellij variables when targeting the new session. This avoids sending actions to the session that launched the helper.

List the panes and note the IDs for `workspace-agent` and the shell pane:

```sh
env -u ZELLIJ -u ZELLIJ_SESSION_NAME -u ZELLIJ_PANE_ID \
  zellij --session SESSION_NAME action list-panes --json --all
```

For terminal panes, use the numeric `id` from the JSON output (for example, `1`) as the `--pane-id` value. Plugin pane IDs use the `plugin_N` form shown in troubleshooting. These examples use `mise exec` to resolve the repository's Zellij version. If you installed Zellij outside mise and do not have mise, omit `mise exec --`.

To start the agent, send Enter to the `workspace-agent` pane. Replace `AGENT_PANE_ID` with that pane's numeric `id` from the listing:

```sh
env -u ZELLIJ -u ZELLIJ_SESSION_NAME -u ZELLIJ_PANE_ID \
  zellij --session SESSION_NAME action send-keys --pane-id AGENT_PANE_ID Enter
```

Wait for the agent UI to finish starting before sending a prompt.

To send a prompt, write it to that pane and press Enter. For example:

```sh
env -u ZELLIJ -u ZELLIJ_SESSION_NAME -u ZELLIJ_PANE_ID \
  zellij --session SESSION_NAME action write-chars --pane-id AGENT_PANE_ID 'Explain the bench diff command'
env -u ZELLIJ -u ZELLIJ_SESSION_NAME -u ZELLIJ_PANE_ID \
  zellij --session SESSION_NAME action send-keys --pane-id AGENT_PANE_ID Enter
```

Wait for the response to finish before sending more input or stopping the recording.

To run a workspace command in the shell pane instead, target its pane ID:

```sh
env -u ZELLIJ -u ZELLIJ_SESSION_NAME -u ZELLIJ_PANE_ID \
  zellij --session SESSION_NAME action write-chars --pane-id SHELL_PANE_ID './bin/bench --help'
env -u ZELLIJ -u ZELLIJ_SESSION_NAME -u ZELLIJ_PANE_ID \
  zellij --session SESSION_NAME action send-keys --pane-id SHELL_PANE_ID Enter
```

Wait for the command to finish and its prompt to return before stopping the recording.

Prefer targeted Zellij actions over attaching a second client. A second client with a smaller terminal can resize the shared session and change the recording geometry. The helper prints the exact session name and a ready-to-use pane-list command when recording starts.

## Stop and render

Stop using the same slug passed to `start`:

```sh
./scripts/demo-record stop bench-tour
```

The helper stops the owned session and writes:

- `docs/demos/bench-tour.cast`
- `docs/demos/bench-tour.gif`

The cast preserves the terminal recording, including Zellij's teardown output. The GIF excludes the final `Bye from Zellij!` teardown event when present. Recording state and temporary render files live outside the repository under `$XDG_STATE_HOME/agent-workspace-demo-recordings` when set, otherwise `$HOME/.local/state/agent-workspace-demo-recordings` (or `<workspace>/.local/state/agent-workspace-demo-recordings` if `HOME` is unset).

If you manually close the Zellij session, still run `stop` to finalize the cast and render the GIF. If the recorder has not exited yet, `stop` keeps its state so you can retry.

## Review before sharing

The helper does not enable asciinema input capture, but anything rendered in the terminal is recorded. That includes prompts, command output, and private paths. Review both the `.cast` and `.gif` before sharing them.

## Troubleshooting

- **Recording tools are missing:** install them with `mise install --include-lazy`.
- **A session name already exists:** `start` creates a fresh session name for each run. Do not substitute `zellij --session NAME` for the helper; that option selects an existing session and does not create one.
- **The `About Zellij` popup remains visible:** list panes, identify the popup's `plugin_N` pane ID, then close that pane with `env -u ZELLIJ -u ZELLIJ_SESSION_NAME -u ZELLIJ_PANE_ID zellij --session SESSION_NAME action close-pane --pane-id plugin_N`.
- **You need to preview the headless recording:** `asciinema play` requires a TTY. Open the rendered GIF or convert the cast with `agg`.
- **The GIF is shorter than the raw cast:** idle-time limits cap pauses during playback or rendering. They do not rewrite timestamps in the `.cast` file.


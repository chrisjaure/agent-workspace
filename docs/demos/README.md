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

Every recording gets a private Zellij socket directory and cache directory, separating its session list from the normal Zellij environment. The recorded panes inherit the temporary `XDG_CACHE_HOME`; caches created during the recording are discarded when `stop` succeeds. The shell that launched the helper is unchanged.

When `${AGENT:-pi}` has `pi` as the first command token's basename, the helper sends Enter to the `workspace-agent` pane and waits up to 30 seconds for Pi's UI to render before returning. An unset `AGENT` uses the launcher's default, `pi`. The helper sends no prompt. For other `AGENT` commands, the pane remains suspended so you can start it manually. If Pi exits or does not render in time, startup fails and the helper cleans up the partial recording. The helper also dismisses Zellij's generic `About Zellij` popup when it is focused.

## Finding Zellij controls

Use the pinned CLI's help to discover commands and their flags. Top-level commands and `action` subcommands are listed separately:

```sh
zellij --help
zellij action --help
zellij action list-panes --help
zellij setup --dump-keybinds default
```

The keybinding command prints Zellij's default preset. Workspace-specific bindings are in [`zellij/config.kdl`](../../zellij/config.kdl); launcher and layout notes are in the [Zellij configuration guide](../../zellij/README.md).

Plugin controls vary by plugin. Follow the pane's visible key hints and use its `?` help when offered. In a headless recording, inspect a rendered frame to read the plugin UI; `dump-screen` may not capture plugin content.

## Interact with the recorded session

Use the slug passed to `start` in place of `DEMO_SLUG`. The `action` subcommand reads the session name from the recording state and clears inherited Zellij session variables, so it can target the recording from inside another Zellij session.

List the panes and note the IDs for `workspace-agent` and the shell pane:

```sh
./scripts/demo-record action DEMO_SLUG list-panes --json --all
```

For terminal panes, use the numeric `id` from the JSON output (for example, `1`) as the `--pane-id` value. Plugin pane IDs use the `plugin_N` form shown in troubleshooting. The subcommand resolves the repository's Zellij version with mise when available, otherwise it uses `zellij` from `PATH`.

When the helper auto-started Pi, it returns only after Pi's UI is visible; do not send Enter again. For a non-Pi `AGENT`, start the suspended pane manually using its numeric `id` from the listing:

```sh
./scripts/demo-record action DEMO_SLUG send-keys --pane-id AGENT_PANE_ID Enter
```

Wait for that agent's UI to finish starting before sending a prompt.

To send a prompt, write it to that pane and press Enter. For example:

```sh
./scripts/demo-record action DEMO_SLUG write-chars --pane-id AGENT_PANE_ID 'Explain the bench diff command'
./scripts/demo-record action DEMO_SLUG send-keys --pane-id AGENT_PANE_ID Enter
```

Wait for the response to finish before sending more input or stopping the recording.

To run a workspace command in the shell pane instead, target its pane ID:

```sh
./scripts/demo-record action DEMO_SLUG write-chars --pane-id SHELL_PANE_ID './bin/bench --help'
./scripts/demo-record action DEMO_SLUG send-keys --pane-id SHELL_PANE_ID Enter
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

The cast preserves the terminal recording, including Zellij's teardown output. The GIF excludes the final `Bye from Zellij!` teardown event when present. On successful stop, the helper removes the temporary socket/cache directories and recording state. Recording state and temporary render files live outside the repository under `$XDG_STATE_HOME/agent-workspace-demo-recordings` when set, otherwise `$HOME/.local/state/agent-workspace-demo-recordings` (or `<workspace>/.local/state/agent-workspace-demo-recordings` if `HOME` is unset). If finalization fails, the state is retained so you can retry.

If you manually close the Zellij session, still run `stop` to finalize the cast and render the GIF. If the recorder has not exited yet, `stop` keeps its state so you can retry.

## Review before sharing

The helper does not enable asciinema input capture, but anything rendered in the terminal is recorded. That includes prompts, command output, and private paths. Review both the `.cast` and `.gif` before sharing them.

## Troubleshooting

- **Recording tools are missing:** install them with `mise install --include-lazy`.
- **Pi does not become ready:** `start` waits up to 30 seconds for Pi's UI. Check the retained launch log and the configured `AGENT` command, then retry after correcting the cause.
- **A session name already exists:** `start` creates a fresh session name for each run. Do not substitute `zellij --session NAME` for the helper; that option selects an existing session and does not create one.
- **The `About Zellij` popup remains visible:** list panes, identify the popup's `plugin_N` pane ID, then close it with `./scripts/demo-record action DEMO_SLUG close-pane --pane-id plugin_N`.
- **You need to preview the headless recording:** `asciinema play` requires a TTY. Open the rendered GIF or convert the cast with `agg`.
- **The GIF is shorter than the raw cast:** idle-time limits cap pauses during playback or rendering. They do not rewrite timestamps in the `.cast` file.


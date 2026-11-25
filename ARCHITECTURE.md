# Architecture

This workspace combines a pinned CLI toolchain, Pi agent configuration, workspace commands, and a Zellij session layout. `./launch-agent` connects them so the tools and configuration are available from both the workspace home and project tabs.

## Components

- **Workspace launcher and toolchain** — `launch-agent` uses `mise exec` when mise is available and all tools pinned in `mise.toml` are installed; otherwise it starts Zellij using commands on the existing `PATH`. It sets the workspace environment variables used by Pi and Zellij.
- **Agent command and Pi agent home** — the Zellij layouts call `bin/workspace-agent`, which runs the command in `AGENT` (default `pi`). `AGENT` may include whitespace-separated arguments but is not evaluated as shell syntax. When using Pi, `PI_CODING_AGENT_DIR` points it to `pi/`, which remains the same even when Pi's working directory changes. Other agents can use their own configuration. See [`pi/README.md`](pi/README.md) for Pi-specific details.
- **Zellij configuration** — `zellij/` contains the session configuration, layouts, and project-directory picker. `ZELLIJ_CONFIG_DIR` points Zellij here. See [`zellij/README.md`](zellij/README.md) for layout details.
- **Workspace commands** — `bin/` contains repo-level CLI commands. The launcher adds it to `PATH` for Zellij panes; file editing and Git diff review are opened in floating panes, with diff rendering delegated to Git's configured pager. See [`README.md`](README.md#commands) for the command reference.

## How a session starts

1. Optionally run `mise trust` and `mise install` to use the pinned tool versions; `./launch-agent` also works without mise if the required commands are on `PATH`.
2. The launcher adds `bin/` to `PATH`, points Zellij to `zellij/` for configuration, and uses the mise-managed tool paths when all pinned tools are installed.
3. The home layout starts the selected agent in the workspace root. New project tabs start it in a selected project directory. With the default `AGENT=pi`, Pi uses the shared `pi/` agent home.

For setup instructions, see [`README.md`](README.md). For contribution conventions, see [`CONTRIBUTING.md`](CONTRIBUTING.md).

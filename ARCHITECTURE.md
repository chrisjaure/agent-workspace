# Architecture

This workspace combines a pinned CLI toolchain, Pi agent configuration, workspace commands, and a Zellij session layout. `./launch-agent` connects them so the tools and configuration are available from both the workspace home and project tabs.

## Components

- **Workspace launcher and toolchain** — `launch-agent` starts the session through `mise exec`, which provides the versions pinned in `mise.toml`. It sets the workspace environment variables used by Pi and Zellij.
- **Pi agent home** — `pi/` contains global instructions, settings, and extensions. `PI_CODING_AGENT_DIR` points Pi to this directory; it remains the same even when Pi's working directory changes. See [`pi/README.md`](pi/README.md) for details.
- **Zellij configuration** — `zellij/` contains the session configuration, layouts, and project-directory picker. `ZELLIJ_CONFIG_DIR` points Zellij here. See [`zellij/README.md`](zellij/README.md) for layout details.
- **Workspace commands** — `bin/` contains repo-level CLI commands. The launcher adds it to `PATH` for Zellij panes; `bench edit` uses Zellij to open a file picker or specified file in a floating editor. See [`README.md`](README.md#commands) for usage.

## How a session starts

1. Run `./launch-agent` from the workspace root after installing the tools with `mise trust` and `mise install`.
2. The launcher invokes Zellij with the pinned tool paths, adds `bin/` to `PATH`, and points it to `zellij/` for configuration.
3. The home layout starts Pi in the workspace root. New project tabs start Pi in a selected project directory, while Pi continues to use the shared `pi/` agent home.

For setup instructions, see [`README.md`](README.md). For contribution conventions, see [`CONTRIBUTING.md`](CONTRIBUTING.md).

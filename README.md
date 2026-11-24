# Agent Workspace

My agent setup. Self-contained workspace for Pi and Zellij configuration.

## Contents

- `pi/` — Pi agent directory and global instructions.
- `zellij/` — Zellij config, layouts, and helper scripts.
- `launch-agent` — sets the workspace environment and starts the `Agent` layout.

`mise.toml` pins Pi, Zellij, and `fzf`. On a fresh checkout, run `mise trust` and `mise install`, then start the workspace with `./launch-agent`.

## Architecture

- `launch-agent` runs Zellij through `mise exec`, so its panes inherit the pinned tool paths. It sets `ZELLIJ_CONFIG_DIR=zellij/` and `AGENT_WORKSPACE_DIR` to this root.
- `PI_CODING_AGENT_DIR=pi/` selects Pi's agent home (instructions, settings, and extensions); it is separate from Pi's working directory. In the home layout, Pi's working directory is this workspace root. In project tabs, the working directory is the selected project, while Pi continues using this workspace's agent home.
- Mise manages the CLI tools; Pi packages and extensions are declared in `pi/settings.json`.

Use Conventional Commits; see `CONTRIBUTING.md`. Enable the included template in this clone with `git config --local commit.template "$PWD/.gitmessage"`.

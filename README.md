# Agent Workspace

My malleable agent setup. Self-contained workspace for Pi and Zellij configuration.

## Contents

- `pi/` — Pi agent directory and global instructions.
- `zellij/` — Zellij config, layouts, and helper scripts.
- `launch-agent` — sets the workspace environment and starts the `Agent` layout.

`mise.toml` pins Pi, Zellij, and `fzf`. On a fresh checkout, run `mise trust` and `mise install`, then start the workspace with `./launch-agent`.

## Philosophy

To understand why this tool exists and the principles behind it, see [PHILOSOPHY](./PHILOSOPHY.md).

## Architecture

For an overview of how the workspace components fit together, see [`ARCHITECTURE.md`](ARCHITECTURE.md). Component-specific details are documented alongside their configuration in [`pi/`](pi/README.md) and [`zellij/`](zellij/README.md).

Use Conventional Commits; see `CONTRIBUTING.md`. Enable the included template in this clone with `git config --local commit.template "$PWD/.gitmessage"`.

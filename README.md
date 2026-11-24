# Agent Workspace

My agent setup. Self-contained workspace for Pi and Zellij configuration.

## Contents

- `pi/` — Pi agent directory and global instructions.
- `zellij/` — Zellij config, layouts, and helper scripts.
- `launch-agent` — sets the workspace environment and starts the `Agent` layout.

`mise.toml` pins Pi, Zellij, and `fzf`. On a fresh checkout, run `mise trust` and `mise install`, then start the workspace with `./launch-agent`. The launcher uses mise to run Zellij with the pinned tools and points Pi at `pi/` and Zellij at `zellij/`.

Use Conventional Commits; see `CONTRIBUTING.md`. Enable the included template in this clone with `git config --local commit.template "$PWD/.gitmessage"`.

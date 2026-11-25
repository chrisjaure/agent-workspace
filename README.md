# Agent Workspace

My malleable workspace for human+agent collaboration.

```mermaid
flowchart TD
    human["👷 Human"]

    subgraph surface["🎨 Malleable workspace surface"]
        direction LR
        home["🤖 Collaborator agent"]
        tasks@{ shape: st-rect, label: "🤖 Task agents" }
        harness(("Workspace tools & configuration"))

        home -->|"evolves"| harness
        harness -.->|"equips"| home
        harness -.->|"equips"| tasks
    end

    human -->|"prompts & steers "| surface
    surface -->|"prompts & alerts"| human
```

Read [`PHILOSOPHY.md`](./PHILOSOPHY.md) for the rationale; [`ARCHITECTURE.md`](./ARCHITECTURE.md) covers the technical setup.

## Get started

[`mise.toml`](./mise.toml) pins the tool versions. On a fresh checkout, run `mise trust`, then `mise install`, and start the workspace with `./launch-agent`.

## Workspace map

- [`pi/`](./pi/README.md) — Pi agent directory, instructions, settings, and extensions.
- [`zellij/`](./zellij/README.md) — Zellij configuration, layouts, and helper scripts.
- `bin/` — workspace CLI commands, currently `bench`.
- `launch-agent` — sets the workspace environment and starts the `Agent` layout.

## Commands

Use `bench edit [file]` to open a file in a floating pane; it interprets `EDITOR` as a shell command and defaults to `vim`. With no file argument, it opens an `fzf` picker with a `bat` preview; `ripgrep` supplies candidates while respecting ignore rules. The command is available in panes launched with `./launch-agent`.

## Customize

Use the task-oriented [customization guides](./docs/guides/) to adapt the workspace and see how changes take effect.

## Contributing

Use Conventional Commits; see `CONTRIBUTING.md`. Enable the included template in this clone with `git config --local commit.template "$PWD/.gitmessage"`.

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

| Command | Description |
| --- | --- |
| `bench edit [file]` | Open a file in a floating pane, or pick one with `fzf` when no file is given. |

## Customize

To change the agent harness (defaults to `pi`), set `$AGENT` to choose the agent command; it may include whitespace-separated arguments (for example, `AGENT='my-agent --resume' ./launch-agent`). It is not evaluated as shell syntax; use a wrapper script if your agent needs complex arguments. Pi-specific configuration under `pi/` is only used by Pi; another agent can use its own configuration.

For more advanced customizations, use the task-oriented [customization guides](./docs/guides/).

## Contributing

Use Conventional Commits; see `CONTRIBUTING.md`. Enable the included template in this clone with `git config --local commit.template "$PWD/.gitmessage"`.

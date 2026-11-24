# Pi Agent Configuration

This directory is the Pi agent directory when launched through `../launch-agent`.

- Global instructions: `AGENTS.md`
- Pi settings and extensions: `settings.json` and `.pi/`
- Zellij setup and the `Agent` layout: `../zellij/`
- Launch the workspace with `../launch-agent`.

Local credentials, trust state, sessions, and generated package data are excluded from version control. The permission-system config asks by default for external directories; it allows this workspace, the mise-managed Pi install path, and Zellij commands used by the layout/editor integration. Its workspace allowlist assumes the repo is at `~/agent-workspace`; adjust it if the repo moves.

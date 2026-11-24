# Agent Zellij Layout

From the workspace root, run `./launch-agent` after `mise trust` and `mise install`. The launcher sets `PI_CODING_AGENT_DIR` to `pi/`, `ZELLIJ_CONFIG_DIR` to `zellij/`, then opens the `Agent` layout.

## Layouts

- `layouts/Agent.kdl` is the workspace home base. It opens Pi and a shell pane in the workspace root.
- `layouts/AgentTab.kdl` opens Pi and a shell side by side in a selected project directory.
- `scripts/pick-cwd.sh` lists top-level, non-hidden directories in `$HOME` for new project tabs.

The `Agent` layout's new-tab template uses POSIX `sh` to run the picker and opens `AgentTab` at the selected directory. Pi inherits the workspace's `PI_CODING_AGENT_DIR` setting in those project tabs too.

## Editing

- Change pane commands or split sizes in `layouts/Agent.kdl` and `layouts/AgentTab.kdl`.
- Change candidate project directories or the preview in `scripts/pick-cwd.sh`.
- Restart the Zellij session to load configuration changes.

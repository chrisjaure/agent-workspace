# Workspace customization guides

These task-oriented guides show users how to adapt the workspace: where a setting lives, how to change it, when the change becomes active, and any trust, reload, restart, or other caveats. Together they document how discoverable, changeable, testable, reversible, and responsive the setup is.

## Guides

- [Add a `bench` command](./bench-commands.md)
- [Git diff review](./git-tools.md)
- [Change Pi agent permissions](./pi-permissions.md)
- [Change the workspace theme](./workspace-theme.md)

## Malleability scorecard

Use the same four columns at the end of each guide. Each row should represent one user goal or customization path.

| Column | What to record |
|---|---|
| Customization | The outcome the user wants, phrased as an action. |
| Where/how | The exact file, setting, menu, command, or other control, plus the essential change to make. |
| Takes effect | Which session or component changes, and the observable point when it becomes active. |
| Reload/restart? | Whether the change is immediate, needs a resource reload, needs an application/session restart, or depends on another component. Name the specific action, such as Pi `/reload` or restarting the Zellij session. |

When extending a guide, verify the activation behavior rather than inferring it from the file location. Note important effort, testability, reversibility, or trust caveats in the steps or beside the relevant scorecard row. Keep the scorecard evidence-based and qualitative; do not add numeric ratings without a defined scale.

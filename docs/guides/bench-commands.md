# Add a `bench` command

`bench` dispatches to executable files in [`bin/bench-commands/`](../../bin/bench-commands/). The command name is the filename: `bin/bench-commands/handoff` runs as `bench handoff`. Add a command there instead of editing the dispatcher. Running `bench` in a terminal opens a searchable command picker; without an interactive terminal or `fzf`, it prints the command list. `bench --help` always prints the list.

Commands receive the remaining arguments and inherit the current working directory, environment, standard streams, and exit status. Add a one-line `# bench-description: ...` comment on the second line, after the shebang, so the picker and help output can explain the command. Commands without a description still appear with a fallback label. See the [command documentation](../../README.md#commands) for executable-file and command-name rules.

## Example: share a task handoff

A human may want to add decisions, open questions, or context for the agent without interrupting its current task. A small `bench handoff` command can open a shared Markdown note in the same floating editor used by `bench edit`. The human saves the note, then the agent reads the saved file from the project.

This is collaboration through a saved file, not live co-editing. In this example, the note is `HANDOFF.md` in the current project directory.

Create `bin/bench-commands/handoff`:

```sh
#!/bin/sh
# bench-description: Open a shared handoff note for the current project.
set -eu

command_dir=$(CDPATH='' cd -P "$(dirname "$0")" && pwd -P)
handoff_file=$(pwd -P)/HANDOFF.md
exec "$command_dir/edit" "$handoff_file"
```

From the workspace root, make it executable:

```sh
chmod +x bin/bench-commands/handoff
```

Then, in a project tab in a session started by `agent-workspace`, run:

```sh
bench handoff
```

`bench handoff` opens `HANDOFF.md` from the current working directory. The command delegates to the neighboring `edit` executable, so it reuses the existing Zellij floating pane and `$EDITOR` behavior instead of implementing another editor workflow. If the note is new, save it from the editor to create the file.

When the note is saved, it is an ordinary project file the agent can read.

## Trust and removal

Files in `bin/bench-commands/` are executable code and run as the local user with that user's environment and filesystem permissions. Review a command before making it executable.

To remove the command, delete `bin/bench-commands/handoff` or remove its executable bit.

## Malleability scorecard

| Customization | Where/how | Takes effect | Reload/restart? |
|---|---|---|---|
| Add a shared handoff command | Add executable `bin/bench-commands/handoff`. | On the next `bench handoff` invocation. It opens `HANDOFF.md` from the current working directory. | No reload or restart. A workspace-launched session already has `bin/` on `PATH`; an active Zellij session is needed to open the floating editor. |

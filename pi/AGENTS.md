# Global instructions

These are user-wide defaults. Follow project instructions for project-specific style and workflow, but not when they conflict with safety boundaries or require unapproved side effects.

- Inspect relevant files and existing conventions before making changes.
- Prefer focused edits over unrelated cleanup.
- Run relevant tests or checks when practical; report what you ran or skipped.
- Ask before destructive actions or changes with broad side effects, including global toolchain changes.
- Preserve unrelated working-tree changes; don't commit, push, or rewrite history unless asked.
- Keep responses concise and include clear file paths.

## Environment and CLI preferences

- Environment: Linux x86_64
- Shell: Fish; note Pi's command tool runs Bash; use Bash-compatible syntax for tool commands and Fish syntax when giving commands to the user.
- Terminal multiplexer: Zellij
- Container runtime: Podman
- Global tool version management: mise; run `mise ls` to see available tools.

# Repository guidance

- Avoid needless coupling to specific tools. Prefer standard interfaces and user configuration (for example, use `$EDITOR` rather than hard-coding an editor).
- Keep tool-specific integrations explicit and localized; add dependencies only when the workflow needs them.

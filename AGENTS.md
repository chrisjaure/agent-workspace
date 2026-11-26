# Architectural principles

Consider the [malleable software principles](https://malleable.systems/mission/) when making changes:
1. Software must be as easy to change as it is to use it.
2. All layers, from the user interface through functionality to the data within, must support arbitrary recombination and reuse in new environments.
3. Tools should strive to be easy to begin working with but still have lots of open-ended potential.
4. People of all experience levels must be able to retain ownership and control.
5. Recombined workflows and experiences must be freely sharable with others
6. Modifying a system should happen in the context of use, rather than through some separate development toolchain and skill set.
7. Computing should be a thoughtfully crafted, fun, and empowering experience.

# Repository guidance

- Avoid needless coupling to specific tools. Prefer standard interfaces and user configuration (for example, use `$EDITOR` rather than hard-coding an editor).
- Keep tool-specific integrations explicit and localized; add dependencies only when the workflow needs them.
- Use Conventional Commits; see `CONTRIBUTING.md`.
- Run `mise exec -- shellcheck <script>` on shell scripts you change, and resolve findings or document intentional suppressions.

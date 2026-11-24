# Contributing

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/) for commit subjects:

```text
<type>[optional scope][!]: <description>
```

Use a lowercase type, an optional concise scope, and an imperative description without a trailing period. Keep the subject focused on the change.

Common types:

- `feat`: add or change user-facing behavior
- `fix`: correct a bug
- `docs`: documentation-only changes
- `style`: formatting or presentation changes without behavior changes
- `refactor`: code change that neither fixes a bug nor adds behavior
- `perf`: performance improvement
- `test`: add or update tests
- `build`: build system or dependency changes
- `ci`: continuous-integration changes
- `chore`: maintenance work
- `revert`: revert an earlier commit

Examples:

```text
feat(zellij): add project picker to agent layout
fix(pi): ignore local trust state
chore: add workspace launcher
```

Mark a breaking change with `!` after the type or scope (for example, `feat(pi)!: rename the agent config directory`) and explain it in the body or a `BREAKING CHANGE:` footer.

To enable the included commit-message template in this clone, run:

```sh
git config --local commit.template "$PWD/.gitmessage"
```

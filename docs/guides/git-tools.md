# Git diff review

Use this guide to customize the diff view used by `bench diff`—for example, to use Delta's TUI with a different theme or collapse files on launch, without changing settings for every repository. It covers clone-local setup and one-off or user-global alternatives.

## Configure this clone

The Delta theme collection is at [`delta/themes.gitconfig`](../../delta/themes.gitconfig). Run this from the repository to include it and configure Chameleon (or other themes), the local diff pager, and folded TUI files:

```sh
git config --local --replace-all include.path ../delta/themes.gitconfig '^\.\./delta/themes\.gitconfig$'
git config --local delta.features chameleon
git config --local pager.diff 'delta --tui'
git config --local delta.start-folded true
```

The include path is relative to `.git/config`; the pattern makes this safe to rerun without duplicating the entry or replacing other includes. These settings live in this clone's uncommitted `.git/config` and take effect on the next Git/Delta invocation. In Delta TUI, press `T` to cycle themes. Chameleon enables side-by-side diffs, line numbers, and Nord syntax highlighting. The TUI can also stage and perform other Git operations; it is not read-only.

## Other scopes

To try Delta TUI for one diff without saving a pager setting:

```sh
git -c pager.diff='delta --tui' diff HEAD
```

To use it as the pager across all repositories for your user:

```sh
git config --global pager.diff 'delta --tui'
```

A global pager setting does not make this clone's theme include or Chameleon selection global; configure those globally too if you want them in other repositories. Restore any previous global pager value to undo the change.

## Malleability scorecard

| Customization | Where/how | Takes effect | Reload/restart? |
|---|---|---|---|
| Configure this clone's theme, pager, and folded TUI | Local `.git/config`; use the setup block above. | Subsequent Git/Delta invocations in this clone. | No |
| Try Delta TUI for one diff | One-off Git pager override above, or the workspace command reference in [`README.md`](../../README.md#commands). | That invocation only; no persistent change for the one-off form. | No |
| Use Delta TUI across repositories | User-global `pager.diff` setting above; add theme settings globally too if desired. | `git diff` in repositories for your user. | No; restore previous global values to undo. |
| Change the active theme | Press `T` in Delta TUI. | Current TUI session. | No |

# Change the workspace theme

The workspace does not have one setting that recolors everything. Zellij, Pi, the terminal emulator, and programs running inside panes each control different parts of the appearance. Start with the layer you want to change.

| Layer | What it affects | Configure it here |
|---|---|---|
| Zellij | Zellij bars, pane frames, and other Zellij UI | [`zellij/config.kdl`](../../zellij/config.kdl) |
| Pi | Pi’s interactive UI and Pi extensions that use its theme | [`pi/settings.json`](../../pi/settings.json), or Pi’s `/settings` menu |
| Terminal and other programs | Terminal background/palette and apps that use terminal colors | The terminal emulator or each app’s own settings |

## Change Pi’s theme

1. In Pi, run `/settings` and select **Theme**.
2. Choose `system`, `dark`, `light`, or an available custom theme.

The choice applies in Pi and is saved in the agent directory’s `settings.json`. In this workspace, `launch-agent` sets `PI_CODING_AGENT_DIR` to `pi/`, so the setting is shared by Pi sessions launched through this workspace.

Pi includes the `system`, `dark`, and `light` themes. `system` derives colors from the terminal palette and follows reported appearance changes; it is the default when no theme is configured. In `/settings`, you can also choose separate themes for light and dark terminal appearances. Pi stores that pair as `<light-theme>/<dark-theme>` (for example, `light/dark`).

For a one-off choice that does not change the saved setting, start Pi with `pi --use-theme light` (or another theme name).

### Add a custom Pi theme

1. Create `pi/themes/<name>.json` in this workspace. The filename and the theme’s `name` field should match.
2. Define the theme using Pi’s [theme format and schema](https://pi.dev/docs/themes).
3. In Pi, run `/reload` to discover the new theme, then use `/settings` to select it.

Pi hot-reloads edits to the active theme in the agent directory’s `themes/<name>.json`. For themes loaded from elsewhere, run `/reload` after adding or changing the file.

## Change Zellij’s theme

### Use one fixed theme

Edit the `theme` setting in [`zellij/config.kdl`](../../zellij/config.kdl). This workspace currently sets:

```kdl
theme "solarized-dark"
```

Replace it with another built-in theme name, an inline `themes` definition, or a theme from a configured `theme_dir`. Restart the Zellij session to load configuration changes (see the [Zellij guide](../../zellij/README.md)).

### Configure light and dark themes

To let Zellij use separate themes for light and dark terminal appearances, replace the fixed `theme` setting with both `theme_dark` and `theme_light`, for example:

```kdl
theme_dark "solarized-dark"
theme_light "solarized-light"
```

Configure both values; a fixed `theme` setting takes precedence over automatic light/dark selection. Restart the Zellij session after changing the config. Once the pair is loaded, switch the active session without restarting with:

```sh
zellij action toggle-theme
```

Use `zellij action set-dark-theme` or `zellij action set-light-theme` to choose a particular side of the configured pair. Automatic selection follows the appearance reported by the host terminal; check that terminal appearance detection works if it does not switch as expected.

## Malleability scorecard

| Customization | Where/how | Takes effect | Reload/restart? |
|---|---|---|---|
| Choose a built-in or already-loaded Pi theme | Pi `/settings` → **Theme** | In the current Pi session | No |
| Preview a different Pi theme for one invocation | `pi --use-theme <name>` | That Pi invocation | No; does not persist |
| Add or edit a custom Pi theme in `pi/themes/` | Add JSON, `/reload`, then select in `/settings` | Active theme edits hot-reload; a new theme appears after `/reload` | `/reload` for discovery; no restart |
| Change Zellij’s fixed theme | `theme` in `zellij/config.kdl` | When a new Zellij session loads the config | Restart the Zellij session |
| Switch between configured Zellij light/dark themes | `zellij action toggle-theme` | Immediately in the active Zellij session | No, once the pair is configured |
| Change the terminal’s palette | Terminal emulator settings | Terminal and programs using its colors | Depends on the terminal emulator |

Pi’s `system` theme follows terminal colors. Zentui components can source colors from Pi’s theme or the terminal palette; Zellij and other programs have their own theme settings.

# Change Pi agent permissions

This workspace installs [`@gotgenes/pi-permission-system`](https://pi.dev/packages/@gotgenes/pi-permission-system), since Pi does not include permission enforcement by default. Rules use three decisions: `allow` permits silently, `ask` prompts for approval, and `deny` blocks. This extension gates tool actions; it is not an operating-system sandbox.

Choose where the policy should apply:

| Goal | Configure it here | Scope and notes |
|---|---|---|
| Change permissions for this workspace | `.pi/extensions/pi-permission-system/config.json` at the workspace root | Project scope; overrides global rules for Pi sessions whose current directory is this workspace. The project must be trusted for this config to load. |
| Change permissions for every session using this workspace's Pi setup | [`pi/extensions/pi-permission-system/config.json`](../../pi/extensions/pi-permission-system/config.json) | Global agent scope; applies to Pi sessions launched with this workspace's `PI_CODING_AGENT_DIR`, including sessions working in other projects. |
| Disable this permission system completely | Run `pi remove npm:@gotgenes/pi-permission-system` from a shell using the workspace's Pi environment | Removes the package from [`pi/settings.json`](../../pi/settings.json), so its rules are no longer enforced by this extension. Other Pi agent directories are unaffected. |

## Workspace-specific policy

Create `.pi/extensions/pi-permission-system/config.json` in the repository root if you want a policy that travels with this project. Add only the rules that should differ from the global policy; project rules override the global scope. The project is read only after Pi trusts it. After editing the file, run `/reload` in Pi or start a new Pi session.

A project policy is resolved relative to Pi's **current working directory**. The standard Agent layout starts Pi in the workspace root, so this workspace's project policy lives at the root `.pi/` path above. Pi sessions working in other project directories use those projects' own `.pi/` policies, alongside this agent directory's global policy.

## Global policy for this workspace's Pi setup

Edit `pi/extensions/pi-permission-system/config.json` to change the default policy for sessions launched through `./agent-workspace`. The launcher sets `PI_CODING_AGENT_DIR` to `pi/`, so the permission extension's global config lives under that directory. This is global to this Pi agent setup, not to every Pi installation on the machine.

The current global config is tracked in this repository. Review it before replacing it; it contains the existing shared policy. Use the extension's [configuration reference](https://github.com/gotgenes/pi-packages/blob/main/packages/pi-permission-system/docs/configuration.md) for policy surfaces, rule matching, and merge behavior. Reload Pi resources with `/reload` (or start a new session) after a change.

## Disable the permission system entirely

From a shell launched in the workspace's mise-enabled environment, run:

```sh
pi remove npm:@gotgenes/pi-permission-system
```

This removes the package declaration from `pi/settings.json`; reload Pi's resources or start a new session for the change to take effect. The policy config files can remain on disk, but without the extension they do not enforce permissions. To restore the extension, install the same package again from that workspace environment.

Removing the extension is different than `yoloMode`: yolo mode auto-approves actions that would otherwise prompt, but explicit `deny` rules still block. Removing the extension disables this permission layer altogether. Since Pi does not provide this permission system by default, tools run without these extension gates when it is removed.

## Malleability scorecard

| Customization | Where/how | Takes effect | Reload/restart? |
|---|---|---|---|
| Add workspace-only permission rules | Root `.pi/extensions/pi-permission-system/config.json` | Trusted sessions whose working directory is this workspace | `/reload`; the project must be trusted |
| Change shared rules for this workspace's Pi setup | `pi/extensions/pi-permission-system/config.json` | Sessions using this agent directory | `/reload` |
| Disable this permission extension | `pi remove npm:@gotgenes/pi-permission-system` | The extension is absent after Pi reloads resources or starts a new session | `/reload` or start a new Pi session |


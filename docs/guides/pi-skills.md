# Customize Pi with skills

A skill is a `SKILL.md` file with instructions for a particular kind of work. Pi uses its `description` to decide when to load the instructions; a skill directory can also contain supporting files.

## Choose where it applies

- **One project:** Install to `.agents/skills/` from that project's root with `npx skills add <owner>/<repo> --skill <skill-name> --agent pi`.
- **This workspace's launcher:** Put reviewed skill files in `pi/skills/<skill-name>/`. `./launch-agent` sets `PI_CODING_AGENT_DIR=pi`, so these skills apply to sessions launched from this workspace, including sessions working in other repositories. The skills CLI does not install to this custom directory. Copy the actual files, not a symlink to its managed source.
- **All Pi sessions for your user:** Add `--global` to the install command to use `~/.agents/skills/`. Pi also discovers this location when launched with this workspace's `PI_CODING_AGENT_DIR`.

## Install from skills.sh

The current `skills` CLI requires Node.js 22.20 or later.

1. Find the skill on [skills.sh](https://www.skills.sh/) and note its repository and skill name. Preview available skills with:

   ```sh
   npx skills add <owner>/<repo> --list
   ```

2. Review its `SKILL.md` and bundled files, especially scripts. Loaded instructions can direct Pi to edit files or run commands under its active tool permissions. See [Change Pi agent permissions](./pi-permissions.md).
3. Install the selected skill for Pi:

   ```sh
   npx skills add <owner>/<repo> --skill <skill-name> --agent pi
   ```

   Project scope is the default. Add `--global` for user scope.

## Create a local skill

Create `<skill-location>/<skill-name>/SKILL.md`:

```markdown
---
name: my-skill
description: What this skill does and when Pi should use it.
---

# My skill

Write clear, actionable instructions for the workflow.
```

Both `name` and `description` are required. Keep the directory and skill names aligned, and reference bundled files using paths relative to the skill directory.

## Check that Pi can use it

- Check `/context` for the skill name and path. Run `/reload` after adding or editing a skill in an active session.
- Test it directly with `/skill:<skill-name>`.
- If it is missing, check the frontmatter, skill location, and whether another skill has the same name.

See the [Agent Skills specification](https://agentskills.io/specification), [Pi's skills documentation](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/skills.md), and the [`skills` CLI reference](https://github.com/vercel-labs/skills/blob/main/docs/commands.md) for more details.

## Malleability scorecard

| Customization | Where/how | Takes effect | Reload/restart? |
|---|---|---|---|
| Install for one project | `npx skills add ... --agent pi` from the project root | Pi sessions working in that project | New session or `/reload` |
| Install for all Pi sessions | Add `--global` to the skills CLI command | Pi sessions using `~/.agents/skills/`, including this workspace's launcher | New session or `/reload` |
| Share only with this workspace's launcher | Copy reviewed skill files into `pi/skills/<skill-name>/` | Sessions launched through `./launch-agent` | New session or `/reload` |
| Create or edit a skill | Add or change `SKILL.md` in a discovered skill directory | When loaded for a matching task or invoked directly | `/reload` during an active session |

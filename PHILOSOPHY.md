---
status: draft
---

# Why Does This Exist?

Inspired by the [malleable systems mission](https://malleable.systems/mission/), I want to create a composable collection of tools that allow an agent and a human to collaborate in a workspace that either can modify to suit the task at hand.

This workspace is my own personal way of working and may contain Pi extensions or Zellij layouts that don't work for you. This is fine! Consider it more of a template that you can copy if you like. The tools this workspace is composed of are flexible.

My task now is to remove unreasonable assumptions (like needless coupling to a specific tool) that add friction to the malleable nature of the workspace.

## My Workflow

The main layout is an agent and a terminal. This agent is special because it knows how to modify its environment. I always keep this agent open, and as I work, I ask it to tweak or remember things. I consider this agent to be my collaborator.

From there, I can open a new tab and get a similar layout but for a specific task. One tab = one task. The agent is the main entry point into the work for that task, but I have access to a terminal to verify its work.

## Bundled Tools

### Why [Pi](https://pi.dev/)?

> Pi is a minimal agent harness. Adapt Pi to your workflows, not the other way around.

There is a lot of power to be unlocked when an agent can modify its own harness, and as a software engineer, tweaking my workflow at this level has become a fulfilling aspect of my work.

#### Choosing Extensions

I follow a these criteria when adding Pi extensions:

- They should be easy to configure within the Pi directory; no external configuration files.
- They should be customizable; if I find a useful but rigid extension, I will vendor and modify it.
- They should not bloat context by adding infrequently used tools or skills.

See the [Pi extension inventory](pi/README.md#extensions) for the current extensions and why I've chosen them.

### Why [Zellij](https://zellij.dev/)?

> Zellij is designed around the philosophy that one must not sacrifice simplicity for power, taking pride in its great experience out of the box as well as the advanced features it places at its users' fingertips.

I'm still evaluating Zellij for the general surface, but compared to other environments or terminal multiplexers, Zellij gets a lot right. I especially like the discoverable UX it provides in combination with advanced capabilities. It has a [very gentle slope from user to creator](https://www.inkandswitch.com/essay/malleable-software/#a-gentle-slope-from-user-to-creator). Combined with its programmatic controls, it acts as a great collaborative surface for humans and agents.


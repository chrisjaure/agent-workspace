<!-- This document is human-created. Agents are banned from modifying it. -->

# Why Does This Exist?

Inspired by the [malleable systems mission](https://malleable.systems/mission/), I want to create a composable collection of tools that allow an agent and a human to collaborate in a workspace that either can modify to suit the task at hand.

I'm also inspired by [Toyota's Production System](https://global.toyota/en/company/vision-and-philosophy/production-system/) and its approach to human/machine interaction (Jidoka): "'automation with a human touch', where human wisdom is added to automation." A human must maintain control and agency and not be reduced to simply monitoring an agent.

Finally, I also realize it's impossible to adopt large systems without understanding each component. I see a lot of that today with massive collections of agent workflows and cross-dependencies on many skills and tools. Everyone shares their own way of doing it but leaves out how they got there. That story and evolution is important for intellectual control over the system. With this workspace, I aim to teach in layers.

---

With that said, this workspace *is* my own personal way of working and may contain Pi extensions or Zellij layouts that don't work for you. This is fine! Consider it more of a template that you can copy if you like. The tools in this workspace are flexible.

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

I do want to note that Zellij does fall short on an important malleable principle: modifying in the context of use. A separate toolchain is required to compile Zellij plugins, and it's not possible to apply them to existing sessions. This breaks the flow and lengthens the feedback loop of contextual, iterative modification, and it could lead to the replacement of Zellij with a surface that's more malleable.

## Rationale

Secondary requirements beyond malleability.

### Why a TUI and not a GUI?

I did consider a web-based GUI, since that's one of the most malleable and user-friendly surfaces available, but TUIs are an alluring ideal due to their portability. I was impressed by Zellij because it brings a lot of user-friendly features typically found in GUIs, like contextual hints and intuitive mouse controls. **Can a TUI be used by anyone?** Let's find out!

It's still worth exploring a GUI, but right now, a TUI may be enough at least to iterate on initially.

### Why local agents and not remote agents?

While remote agents aren't _unsupported_, the focus of this workspace is local agents. I think the friction and constraints of using local agents is a good kind of friction because, as humans, we pay a big price for context switching.

In my experience, I found less joy and more stress in the development process when I managed more than 2-3 agents simultaneously. I lost intellectual control, opportunities for deep work, and chances to enter the flow state. It is not my goal to design a system where humans have to _actively_ steer **more** agents untethered from a computer (e.g. remote session sharing on a phone).

However, there is more to explore in the area of _passive_ steering. If that can be done well, I will add it to this workspace.

### Self-contained

To keep this portable, I want the workspace to be self-contained and conflict with system configuration.

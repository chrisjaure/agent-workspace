---
name: mode-clarify
description: "Use when the request leaves real choices unpinned. Triggers on: task requests without approach/scope/file ('implement X', 'add Y', 'fix Z'); content generation from incomplete input ('create a Jira ticket for'); or repeated retry signals ('let's try again', third failed attempt)."
---

# mode-clarify

Posture: surface gaps before acting. The failure mode being suppressed is *invention* — confidently filling in missing information rather than asking.

## Procedure

### At the start of non-trivial work

Before writing code, making changes, or generating content where the request leaves real choices unpinned, produce an assumptions list:

```
Assumptions
- I'm assuming X
- I'm assuming Y (guess — let me know)
- I'm assuming Z

Ownership
- I'll implement this directly (vs. ticket for someone else)
```

Then wait for review before proceeding past surface work.

Rules:
- Fold genuine gaps into the assumptions list with a note ("guess — let me know") rather than splitting into a separate questions section
- Ownership is always listed — it's one of the most common clarification gaps
- If the request is informational or the scope is unambiguous, skip the list

### When generating content from incomplete input

Only write what was explicitly provided. Structure and formatting may be inferred; content may not. If information needed to complete the document is missing, note it rather than inventing it:

> "I don't have the acceptance criteria — I've left a placeholder. What should go there?"

### 3-strike rule

After 3 failed attempts at the same approach, stop. Do not try a fourth variation. Surface what's not working:

> "I've tried X, Y, and Z. All three fail because [root pattern]. I can't resolve this without understanding [specific gap]. What should I try differently?"

## Example — vague task

> the user: Add error handling to the payment processor.

```
Assumptions
- I'm assuming "error handling" means try/catch + logging, not retries or fallback flows (guess)
- I'm assuming the target is processPayment() in src/payment/processor.ts
- I'm assuming errors should be logged at ERROR level and rethrown, not silenced

Ownership
- I'll implement this directly
```

The user can confirm or redirect any of these before work starts. A 30-second scan is cheaper than a wrong implementation.

## Example — 3-strike rule in action

After 3 failed migration attempts:

> I've tried: (1) clean rollback, (2) explicit DROP IF EXISTS, (3) resetting the migration state table. All three fail — the migration runner reports "relation already exists" but the table doesn't appear in the schema dump. The migration state is inconsistent in a way I can't resolve without knowing how this migration was last run. Should I restore from a snapshot, or do you know the current state of the users table in this environment?

## Boundaries

- Skip for informational questions ("what does X mean?") and unambiguous edits (fixing a typo, renaming a single variable)
- The 3-strike rule applies to approach failures, not to expected retry loops (e.g., polling)
- Applies to all content generation including Jira issues, Confluence pages, and technical docs — never invent context

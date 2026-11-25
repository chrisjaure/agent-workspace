---
name: mode-trace
description: "Use when a visible signal might not reflect the underlying truth. Triggers on: 'the test is failing', 'why is X returning Y', 'can you fix this error', 'something's off', suspicious metrics, CI failures, or when symptom may not equal cause. Skip trivial cases: typo, syntax error, missing import."
---

# mode-trace

Posture: refuse surface signals as proof. Work backwards from what's visible to what's true. The failure mode being suppressed is *patching* — fixing the visible thing without verifying the underlying thing.

Applies beyond debugging: wherever visible evidence might not match the underlying truth.

## Procedure

1. What is the visible signal?
   (failed test / error / suspicious metric / passing CI / completion claim / etc.)

2. Why was this signal expected or this action attempted?
   (what underlying thing does the signal supposedly indicate?)

3. Should the underlying thing have been expected or attempted?
   → If no: stop, surface the misalignment before touching anything
   → If yes: apply 5 Whys to drill from the signal toward the actual cause

**On test failure:** always ask whether to fix the test or the code before changing either. Step 3 makes this explicit — the test may be wrong, not the implementation.

## 5 Whys (when step 3 is "yes")

Ask "why" iteratively, stopping when you reach a cause you can act on:

> Test fails → why? The assertion expected 200 but got 401. Why? The request lacks an auth header. Why? The test helper doesn't inject the test token. Why? The helper was written before token injection was added to the auth layer. Why? The helper wasn't updated when auth was added to this endpoint. **Root cause: test helper is missing token injection. Fix the helper, not the assertion.**

Stop at the layer where you have leverage. Don't drill past actionable into philosophical.

## Example — debug (all steps)

> Visible signal: `UserService.test.ts:47 — expected 200, got 401`

Step 1: auth check returning 401 in a unit test for getUser().

Step 2: testing that getUser() returns the user object for a valid ID.

Step 3: should auth be involved in this unit test? The test mocks the auth middleware but the test environment has auth enabled globally. This test is accidentally testing auth behavior instead of user retrieval.

→ Step 3 is **no** — stop before fixing anything. The test has the wrong scope. Fix: either mock auth away in the test setup, or move this to an integration test suite.

## Example — non-debug (metric anomaly)

> Visible signal: API error rate jumped from 0.1% to 8% at 14:32.

Step 1: error rate spike in Datadog after a 14:28 deploy.

Step 2: the metric is supposed to indicate production API failures.

Step 3: should this metric be trusted here? First verify: did request volume drop at 14:32? A traffic drop inflates error *rate* without more actual errors. Also check whether the spike aligns with the deploy timestamp or precedes it.

→ Step 3 is **maybe** — verify the metric is measuring correctly before treating this as a deploy regression. Apply 5 Whys after confirming the signal is real.

## When NOT to fire

> Error: `SyntaxError: Unexpected token '}'` in config.ts line 47

Symptom equals cause. Fix the syntax error. No 3-step analysis needed.

Trivial cases: syntax errors, missing imports, typos, undefined variable errors with a clear stack trace pointing to an obvious omission. If the cause is visible in the error message, act on it directly.


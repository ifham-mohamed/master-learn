# Verify generated code with tests and diff review — theory

> Starter template. Replace these prompts with your own explanation.

## Learning goal

Correctness, edge cases, security, perf
Use targeted tests to prove AI fix
Small diffs, inspect changed files, revert noise
Catch correctness/security/test gaps
agent context, small diffs, tests, compile/type checks, security review
Review generated code, test security/perf/correctness

## Concepts to explain

Record permitted AI use, your independent reasoning, generated suggestions you rejected, and checks that establish correctness.

- What problem does this solve?
- How does it work in your own words?
- What assumptions does it rely on?

## Small example

Add an example and explain each step. Link to a file in ../code/ when useful.

## Edge cases and trade-offs

Record a counterexample, common mistake, and a trade-off.

## Check your understanding

Review AI PR line-by-line
Failure to test: Almost-right code
Write regression before acceptance
Failure to test: False confidence
Reduce an over-broad AI change
Failure to test: Unnecessary rewrites
Ask an agent to implement, then independently review it
Practice mode: AI-free No, AI-assisted Yes
Use AI on repo task then independently verify Java + TS changes
5 timed agentic tickets
Use AI only when interview policy permits

## References

See [task resources](../resources/links.md).

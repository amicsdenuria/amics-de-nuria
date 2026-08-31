# Repository instructions for agents

Read this file before changing the repository.

## Required routing

- Before reading, creating, refactoring, or rendering image fields or image
  components, read `.agents/skills/sanity-images/SKILL.md` in full. It is the
  source of truth for Sanity metadata, provider routing, and image validation.
- Use the other skills under `.agents/skills` when their descriptions match the
  task. Do not load unrelated skills.

## Spec-driven changes

- Apply this section only when a task names an OpenSpec change or phase, or
  clearly matches an existing change under `openspec/changes/`.
- For those tasks, locate the matching change and read its `proposal.md`,
  `design.md`, `tasks.md`, `agent-runbook.md`, and relevant files under
  `specs/` before modifying code. Read `exploration.md` when present.
- Execute only the requested phase, update `tasks.md`, run that phase's
  validation gate, and stop before starting the next phase.
- Do not perform remote or destructive operations documented by a change
  without the approval required by its runbook.
- Tasks that do not match an existing OpenSpec change follow the normal
  repository instructions. Do not require or create OpenSpec documentation for
  them unless the user explicitly asks for it.

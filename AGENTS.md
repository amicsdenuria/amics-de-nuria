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
- After the agent validation gate passes, keep the phase changes uncommitted
  and give the user an exact manual verification checklist. Commit only after
  the user explicitly confirms that verification. Any subsequent fix requires
  repeating agent validation and obtaining a new approval before committing.
- Include any important, non-obvious instructions required for manual
  verification, such as prerequisite data, special application state, unusual
  commands, credentials, or environment constraints. Omit routine instructions
  the user can reasonably infer, such as starting the development server with
  `pnpm dev`.
- Do not perform remote or destructive operations documented by a change
  without the approval required by its runbook.
- Tasks that do not match an existing OpenSpec change follow the normal
  repository instructions. Do not require or create OpenSpec documentation for
  them unless the user explicitly asks for it.

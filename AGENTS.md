# Repository instructions for agents

Read this file before changing the repository.

## Required routing

- Before reading, creating, refactoring, or rendering image fields or image
  components, read `.agents/skills/sanity-images/SKILL.md` in full. It is the
  source of truth for Sanity metadata, provider routing, and image validation.
- Use the other skills under `.agents/skills` when their descriptions match the
  task. Do not load unrelated skills.

## Execution environment

- The repository lives inside WSL2 Ubuntu at
  `/home/muner/projects/work/adn/amics-de-nuria`.
- Run Git, Node.js, pnpm, Next.js, and Sanity commands inside WSL, using that
  Linux path as the working directory. Do not run the project toolchain through
  Windows Node.js or pnpm.
- Node.js and pnpm are initialized by the interactive zsh configuration. When
  invoking commands from a Windows-hosted agent, use:

  ```powershell
  wsl.exe -d Ubuntu --cd /home/muner/projects/work/adn/amics-de-nuria /home/linuxbrew/.linuxbrew/bin/zsh -ic '<command>'
  ```

  When already inside WSL, change to the repository and run the command from an
  interactive zsh. A non-interactive `zsh -lc` may not expose Node.js or pnpm.
- A Windows CMD warning that UNC paths are unsupported describes the outer host
  shell, not the repository. The effective project directory is the path passed
  to `wsl.exe --cd`.

# Contributing to AI Labs

Thank you for considering contributing to AI Labs! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-labs.git
   cd ai-labs
   ```

## Development Setup

### Prerequisites

- Node.js 20 or higher
- pnpm 10 or higher

### Installation

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. The Git hooks will be automatically set up via Husky

### Available Scripts

- `pnpm run lint` - Run ESLint
- `pnpm run lint:fix` - Fix linting errors automatically
- `pnpm run format` - Format code with Prettier
- `pnpm run format:check` - Check code formatting
- `pnpm run type-check` - Run TypeScript type checking
- `pnpm run validate` - Run all checks (formatting, linting, type-checking)
- `pnpm run test` - Run tests (configure your test framework first)

## Making Changes

1. **Create a branch** for your changes:

   ```bash
   git checkout -b feat/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes** following the project's coding standards

3. **Test your changes** thoroughly

4. **Run validation** before committing:
   ```bash
   pnpm run validate
   ```

## Commit Guidelines

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Your commits will be validated automatically via Git hooks.

### Commit Message Format

```
<type>: <description>

[optional body]

[optional footer]
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only changes
- `style` - Code style changes (formatting, missing semi colons, etc)
- `refactor` - Code change that neither fixes a bug nor adds a feature
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Changes to build process or auxiliary tools
- `ci` - CI configuration changes
- `revert` - Revert a previous commit

### Examples

```bash
feat: add text generation experiment
fix: correct API endpoint configuration
docs: update README with new examples
refactor: simplify data processing logic
```

## Pull Request Process

1. **Update documentation** if needed

2. **Ensure all checks pass**:
   - Linting
   - Type checking
   - Tests (when configured)
   - CI/CD pipeline

3. **Fill out the PR template** completely

4. **Request a review** from maintainers

5. **Address review feedback** promptly

6. Once approved, your PR will be merged!

## Project Structure

```
ai-labs/
├── experiments/     # Individual AI experiments and prototypes
├── projects/        # Larger AI projects and applications
├── notes/           # Research notes and learnings
├── examples/        # Code examples and tutorials
├── .github/         # GitHub configuration (workflows, templates)
└── docs/            # Additional documentation
```

### Guidelines for Different Areas

#### Experiments

- Keep experiments self-contained
- Include a README explaining the experiment's purpose
- Document findings and results

#### Projects

- Follow standard project structure
- Include comprehensive documentation
- Add tests where applicable

#### Examples

- Keep examples simple and focused
- Include clear comments
- Provide usage instructions

#### Notes

- Use markdown for all notes
- Organize by topic or date
- Include references and sources

## Questions?

- Open an issue for bugs or feature requests
- Start a discussion for questions or ideas
- Reach out to maintainers for guidance

Thank you for contributing! 🎉

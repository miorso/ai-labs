# AI Labs

Hands-on AI workshops for team learning and experimentation.

## Overview

AI Labs is a series of practical workshops designed to explore and experiment with Artificial Intelligence concepts through collaborative coding sessions. Each workshop focuses on building understanding of AI topics through hands-on implementation.

## Technologies

- **TypeScript**: Type-safe development
- **React**: Interactive user interfaces
- **AI SDK**: AI application framework
- **Gemini / Self-hosted models**: AI model providers

## Format

Short, focused workshops that combine learning with practical coding exercises. Topics cover fundamental and advanced AI concepts including prompt engineering, optimization techniques, and testing strategies.

## Prerequisites

- **Node.js** 24.11.0 or higher ([Download](https://nodejs.org/))
- **pnpm** 10.21.0 or higher ([Installation guide](https://pnpm.io/installation))
- An API key from one of the supported AI providers (Gemini, OpenAI, or Anthropic)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/miorso/ai-labs.git
cd ai-labs
```

### 2. Install Dependencies

```bash
pnpm install
```

If using nvm, the correct Node.js version will be automatically selected from `.nvmrc`.

### 3. Configure Environment Variables

Copy the example environment file and add your API keys:

```bash
cp .env.example .env
```

Edit `.env` and add your API key(s):

```
GOOGLE_GENERATIVE_AI_API_KEY="your-api-key-here"
```

### 4. Validate Your Setup

Run the validation script to ensure everything is configured correctly:

```bash
pnpm run validate
```

This checks code formatting and TypeScript types.

## Repository Structure

```
ai-labs/
├── labs/                    # Workshop exercises
│   └── 00-example/          # Example lab structure
│       ├── README.md        # Lab instructions
│       ├── exercise/        # Exercise starter code
│       │   └── main.ts
│       └── solution/        # Reference solution
│           └── main.ts
├── .env.example             # Environment variables template
├── package.json             # Project dependencies
└── tsconfig.json            # TypeScript configuration
```

## Working with Labs

Each lab is organized in its own directory under `labs/` with:

- **README.md**: Objectives, instructions, and tips
- **exercise/**: Starting point with TODOs to complete
- **solution/**: Reference solution (try not to peek!)

### Running a Lab

Use the interactive lab runner:

```bash
pnpm run dev
```

**Features:**

- 🔍 Search and filter exercises by typing
- 📖 README instructions displayed before each lab
- ✅ Automatic .env file loading
- 🔄 Action menu after completion:
  - **Reload** - Run the same exercise again
  - **Next** - Proceed to the next exercise
  - **Previous** - Go back to the previous exercise
  - **Choose** - Return to exercise selection
  - **Quit** - Exit the program

## Available Commands

- `pnpm run dev` - Interactive menu to select and run any lab
- `pnpm run format` - Format all files with Prettier
- `pnpm run format:check` - Check if files are formatted
- `pnpm run type-check` - Run TypeScript type checking
- `pnpm run validate` - Run format check and type check

## Goals

- Make AI learning approachable and practical
- Encourage hands-on exploration
- Foster knowledge sharing among teammates
- Experiment with real-world AI applications

## License

MIT License - see [LICENSE](LICENSE) file for details

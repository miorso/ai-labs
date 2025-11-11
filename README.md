# AI Labs

Hands-on AI workshops for team learning and experimentation.

## Overview

AI Labs is a series of practical workshops designed to explore and experiment with Artificial Intelligence concepts through collaborative coding sessions. Each workshop focuses on building understanding of AI topics through hands-on implementation.

## Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [AI SDK](https://sdk.vercel.ai/docs)
- Gemini / Self-hosted models

## Format

Short, focused workshops that combine learning with practical coding exercises. Topics cover fundamental and advanced AI concepts including prompt engineering, optimization techniques, and testing strategies.

## Prerequisites

- **Node.js** 24.11.0 or higher
  - Recommended: Use [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions (the correct version will be used automatically via `.nvmrc`)
  - Or download directly from [nodejs.org](https://nodejs.org/)
- **pnpm** 10.21.0 or higher ([Installation guide](https://pnpm.io/installation))
- An API key from one of the supported AI providers:
  - [Google AI Studio](https://aistudio.google.com/) (Gemini)
  - [Groq](https://console.groq.com/)
  - [Ollama](https://ollama.com/) for self-hosted models
  - Other providers: OpenAI, Anthropic

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

If using nvm, the correct Node.js version will be automatically selected from `.nvmrc` when you navigate to the project folder (you may need to run `nvm install` first if you don't have this version yet).

### 3. Configure Environment Variables

Copy the example environment file and add your API keys:

```bash
cp .env.example .env
```

Edit `.env` and add your API key(s):

```
GOOGLE_GENERATIVE_AI_API_KEY="your-api-key-here"
```

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
  - **Run this exercise again** - Re-run the current exercise
  - **Select a different exercise** - Return to exercise selection
  - **Exit** - Quit the program

## License

MIT License - see [LICENSE](LICENSE) file for details

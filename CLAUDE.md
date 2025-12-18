# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

InsightCopilot is a modular, open-source Co-Pilot application built with LangGraph and CopilotKit that enables natural language querying and real-time data visualization for structured datasets. The system uses a modern architecture separating frontend and backend components.

## Key Commands

### Docker Development (Recommended)
- `make build` - Build and start all Docker containers
- `make up` - Start Docker containers (without rebuilding)
- `make down` - Stop Docker containers
- `make purge` - Stop containers and remove volumes
- `make rebuild` - Full rebuild (purge + build)

### Frontend Development
- `cd frontend && pnpm install` - Install frontend dependencies
- `cd frontend && pnpm run dev` - Start Next.js development server
- `cd frontend && pnpm run build` - Build for production
- `cd frontend && pnpm run lint` - Run ESLint

### Backend Development
- `cd backend && uv pip install -r requirements.txt` - Install backend dependencies
- `uvicorn backend.app.main:app --reload` - Start FastAPI development server
- `python -m pytest` (if tests exist) - Run backend tests

### Environment Setup
- Copy `.env.sample` to `.env` and configure `OPENAI_API_KEY`
- For local development, create `frontend/.env.local` with API URLs

## Architecture

### Backend (FastAPI + LangGraph)
- **Entry Point**: `backend/app/main.py` - FastAPI application
- **API Routes**: `backend/app/api/` - Query and insights endpoints
- **Agent Logic**: `backend/app/agent/` - LangGraph workflow, state management, and tools
- **Database**: `backend/app/db/` - SQLAlchemy models and SQLite setup
- **Sample Data**: Uses Sakila database in `backend/data/sqlite-sakila.db`

### Frontend (Next.js + CopilotKit)
- **Entry Point**: `frontend/app/page.tsx` - Main application page
- **API Integration**: `frontend/app/api/copilotkit/route.ts` - CopilotKit backend route
- **Components**: `frontend/components/` - UI components and visualizations
- **Charts**: Recharts-based visualizations in `frontend/components/ui/`

### Integration Pattern
- Frontend communicates with backend through HTTP APIs
- CopilotKit provides AI-powered UI components and natural language processing
- LangGraph agent handles complex query processing and data insights

## Technology Stack

### Backend Dependencies
- FastAPI for REST API framework
- LangChain/LangGraph for AI agent workflows
- SQLAlchemy for database ORM
- Pandas for data manipulation
- OpenAI for LLM integration

### Frontend Dependencies
- Next.js 15 with React 19
- CopilotKit for AI assistant components
- Tailwind CSS for styling
- Recharts for data visualization
- TypeScript for type safety

## Development Notes

### Database
- Uses SQLite with Sakila sample database
- Database file auto-created on first run in `backend/data/sqlite-sakila.db`
- SQLAlchemy models in `backend/app/db/models.py`

### AI Agent Configuration
- LangGraph workflow defined in `backend/app/agent/graph.py`
- Agent prompts and templates in `backend/app/agent/prompts.py`
- Custom tools for data querying in `backend/app/agent/tools.py`

### Environment Variables
- `OPENAI_API_KEY` - Required for AI functionality
- `NEXT_PUBLIC_API_URL` - Frontend client-side API calls
- `SERVER_API_URL` - Server-side CopilotKit runtime calls

### Code Quality Tools
- Ruff for Python linting (configured in `backend/pyproject.toml`)
- ESLint for JavaScript/TypeScript linting
- Pre-commit hooks configured in `.pre-commit-config.yaml`
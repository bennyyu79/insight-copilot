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
- `cd frontend && pnpm run dev` - Start Next.js development server (port 3100)
- `cd frontend && pnpm run build` - Build for production
- `cd frontend && pnpm run lint` - Run ESLint

### Backend Development
- `cd backend && uv pip install -r requirements.txt` - Install backend dependencies
- `cd backend && python -m uvicorn app.main:app --reload --port 8100` - Start FastAPI development server (port 8100)
- `python -m pytest` (if tests exist) - Run backend tests

### Code Quality
- `make precommit` - Run pre-commit hooks on all files
- Pre-commit hooks include: Black, isort, flake8 for Python
- ESLint for frontend TypeScript/JavaScript

### Environment Setup
- Copy `.env.sample` to `.env` and configure `OPENAI_API_KEY` and `LANGSMITH_API_KEY`
- For local development, create `frontend/.env.local` with API URLs:
  - `NEXT_PUBLIC_API_URL=http://localhost:8100`
  - `SERVER_API_URL=http://localhost:8100`
  - `OPENAI_API_KEY=your_key_here`

## Architecture

### Backend (FastAPI + LangGraph)
- **Entry Point**: `backend/app/main.py` - FastAPI application with CopilotKit integration
- **API Routes**: `backend/app/api/` - Query and insights endpoints (e.g., `/api/v1/insights/top-films`)
- **Agent Logic**: `backend/app/agent/` - LangGraph workflow, state management, and tools
  - `graph.py` - Main agent workflow with tool routing
  - `state.py` - Agent state definitions and conversation memory
  - `tools.py` - Custom data querying and analysis tools
  - `configuration.py` - Agent configuration and prompts
- **Database**: `backend/app/db/` - SQLAlchemy models and SQLite setup
  - `models.py` - Sakila database ORM models
  - `database.py` - Database connection and table creation
- **Sample Data**: Uses Sakila database in `backend/data/sqlite-sakila.db`

### Frontend (Next.js + CopilotKit)
- **Entry Point**: `frontend/app/page.tsx` - Main application page with CopilotKit integration
- **API Integration**: `frontend/app/api/copilotkit/route.ts` - CopilotKit backend route connecting to FastAPI
- **Components**:
  - `frontend/components/Dashboard.tsx` - Main dashboard with visualizations
  - `frontend/components/generative-ui/` - AI-generated UI components
  - `frontend/components/ui/` - Recharts-based chart components (bar, pie, area charts)
- **CopilotKit Integration**: Uses `@copilotkit/react-core` and `@copilotkit/react-ui` for AI features

### Integration Pattern
- Frontend communicates with backend through HTTP APIs
- CopilotKit provides AI-powered UI components and natural language processing
- LangGraph agent handles complex query processing and data insights
- Real-time data visualization using Recharts

## Technology Stack

### Backend Dependencies
- **Core**: FastAPI for REST API framework, Uvicorn for ASGI server
- **AI**: LangChain/LangGraph for AI agent workflows, OpenAI for LLM integration
- **Database**: SQLAlchemy for database ORM, SQLite for local storage
- **Data**: Pandas for data manipulation and analysis
- **Integration**: CopilotKit SDK for AI agent integration

### Frontend Dependencies
- **Framework**: Next.js 15 with React 19, TypeScript for type safety
- **AI Integration**: CopilotKit for AI assistant components and runtime
- **Styling**: Tailwind CSS v4 with custom animations
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation
- **UI**: Radix UI components, Lucide React icons

## Development Notes

### Database Schema
- Uses SQLite with Sakila sample database (film rental store)
- Database file auto-created on first run in `backend/data/sqlite-sakila.db`
- Key tables: films, customers, actors, categories, rentals, payments
- SQLAlchemy models include relationships for complex queries

### AI Agent Architecture
- **LangGraph Workflow**: Defined in `backend/app/agent/graph.py`
  - Two-node cycle: `call_model` ↔ `tools`
  - Conditional routing based on tool calls and query attempts
  - Memory using LangGraph's MemorySaver
- **Agent State**: Managed in `backend/app/agent/state.py`
  - Tracks conversation messages and query attempts
  - Supports system prompts and tool integration
- **Custom Tools**: Data querying and analysis tools in `backend/app/agent/tools.py`
- **Configuration**: Prompts and model settings in `backend/app/agent/configuration.py`

### Environment Variables
- `OPENAI_API_KEY` - Required for AI functionality
- `LANGSMITH_API_KEY` - Optional for LangSmith tracing
- `NEXT_PUBLIC_API_URL` - Frontend client-side API calls (http://localhost:8100)
- `SERVER_API_URL` - Server-side CopilotKit runtime calls (http://localhost:8100)

### Code Quality Tools
- **Python**: Ruff for linting/formatting (configured in `backend/pyproject.toml`)
- **Frontend**: ESLint for JavaScript/TypeScript linting
- **Pre-commit**: Hooks configured in `.pre-commit-config.yaml` (Black, isort, flake8)
- **Development**: Hot reloading enabled for both frontend and backend

### API Endpoints
- **CopilotKit**: `/copilotkit` - AI agent integration
- **Health**: `/` - API health check and documentation
- **Insights**: `/api/v1/insights/` - Pre-built analytical endpoints:
  - `top-films` - Top performing films
  - `category-performance` - Film category analytics
  - `customer-activity` - Customer engagement metrics
  - `store-performance` - Store performance data
  - `actor-popularity` - Actor performance statistics

### Docker Configuration
- Multi-service setup in `docker-compose.yml`
- Frontend runs on port 3100 (mapped to container port 3000)
- Backend runs on port 8100 (mapped to container port 8100)
- Shared network for service communication
- Volume mounts for development with live updates
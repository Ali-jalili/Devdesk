# DevDesk

A Developer Workflow Workspace for organizing and managing API information during the development process.

DevDesk helps developers keep API-related information structured in one centralized workspace, including API requests, collections, environments, and technical context.

The goal of DevDesk is to improve API workflow organization and help developers maintain project context during development.

DevDesk is not an API client and is not designed to replace tools like Postman. Its focus is managing API development workflow, organizing requests, and keeping important API information in one place.

---

## 🚀 Live Demo

https://devdesk-omega.vercel.app/

---

# ✨ Features

## Authentication

DevDesk provides secure user access through authentication.

Features:

- User registration
- Login
- Logout
- Session management
- Protected routes

---

## Workspace Management

Workspaces provide a dedicated space for organizing API-related information.

Features:

- Create workspace
- View workspaces
- Update workspace information
- Manage workspace resources

---

## Collection Management

Collections allow developers to organize related API requests into structured groups.

Features:

- Create collections
- Manage collections
- Organize requests inside collections

---

## Request Management

Requests are the core entities of DevDesk.

Each request stores the information developers need to understand and maintain API endpoints.

Request information includes:

- Name
- HTTP Method
- URL
- Headers
- Params
- Body
- Description

The purpose is not only storing endpoints, but preserving the technical context behind APIs.

---

## Environment Management

Environments help developers manage different API configurations.

Features:

- Create environments
- Manage environment variables
- Organize API configurations

---

## Dashboard

The dashboard works as a workflow-focused command center.

Instead of repeating management pages, it helps developers continue their workflow by providing:

- Active workspace context
- Workspace readiness status
- Next recommended action
- Current workspace overview

---

# 🏗 Architecture

DevDesk follows a Feature-Based React Architecture.

The application is organized around product domains instead of file types.

Main domains include:

- Dashboard
- Workspaces
- Collections
- Requests
- Environments

Each feature is responsible for its own:

- Components
- Hooks
- Services
- Business logic

This structure keeps the codebase scalable, maintainable, and easier to extend.

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS

## Data Management

- TanStack Query

## Backend / Database

- Supabase

Used for:

- Authentication
- PostgreSQL Database
- API Layer
- Row Level Security

## UI

- Framer Motion

---
# ⚡ Engineering Approach

## TypeScript Strategy

TypeScript is used as a core part of the application design.

It is used for:

- Domain modeling
- Component contracts
- API responses
- Data structures

The goal is to create clear and predictable communication between different parts of the application.

---

## Data Flow

DevDesk follows a separated data flow architecture:
Component

↓

Custom Hook

↓

Service Layer

↓

Supabase

↓

Database


This approach keeps UI components separated from data access logic and makes the code easier to maintain.

---

# ⚡ Performance

Implemented:

- Route-based lazy loading
- Code splitting
- TanStack Query caching
- Optimized production builds
- Loading and error state handling

---

# 🔐 Security

Implemented:

- Protected application routes
- Environment variable configuration
- Authentication-based access control
- Supabase security features

---

# 📦 Getting Started
pnpm install

# 🧭 Future Improvements

Potential future improvements:

- API request execution engine
- Response viewer
- Request history
- Advanced environment management
- API testing workflows
- Shared workspaces
- Team collaboration features

---

# 🎯 Project Goal

DevDesk was built to demonstrate the ability to create a production-style frontend application with:

- Clean React architecture
- TypeScript domain modeling
- Real-world data management
- Authentication flows
- Scalable application structure
- Product-oriented development decisions

---

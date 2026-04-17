# JakeOS - Technical Architecture

## Overview

JakeOS is built as a modern single-page application (SPA) using Angular's standalone component architecture. The application follows Angular best practices with a component-based structure.

## Frontend Architecture

### Technology Stack

- **Framework:** Angular 21.0.0
- **Language:** TypeScript 5.9.2
- **Routing:** Angular Router (standalone)
- **Forms:** Angular Forms Module (Template-driven)
- **Testing:** Vitest 4.0.8
- **Build System:** Angular CLI with esbuild

### Application Structure

```
frontend/src/app/
├── app.ts                    # Root component
├── app.config.ts             # Application configuration
├── app.routes.ts             # Route definitions
├── models/
│   └── task.model.ts         # Data models/interfaces
├── landing-page/             # Landing page module
│   ├── landing-page.ts
│   ├── landing-page.html
│   └── landing-page.css
├── to-do-list/               # To-Do List module
│   ├── to-do-list.ts
│   ├── to-do-list.html
│   └── to-do-list.css
├── journal/                  # Journal module (stub)
│   ├── journal.ts
│   ├── journal.html
│   └── journal.css
└── habit-tracker/            # Habit Tracker module (stub)
    ├── habit-tracker.ts
    ├── habit-tracker.html
    └── habit-tracker.css
```

## Component Architecture

### Standalone Components

All components use Angular's standalone component architecture (introduced in Angular 14+, now standard in Angular 21):

- No NgModules required
- Direct imports in component decorators
- Simplified dependency management
- Better tree-shaking and bundle optimization

### Component Details

#### 1. App Component (Root)
- **File:** `app.ts`
- **Purpose:** Application shell
- **Features:**
  - Uses Angular signals for reactive state
  - Contains router outlet for navigation
  - Minimal logic, primarily structural

#### 2. Landing Page Component
- **File:** `landing-page/landing-page.ts`
- **Purpose:** Home page with module navigation
- **Features:**
  - Three clickable boxes for each module
  - Router navigation to sub-modules
  - Visual icons for each feature

#### 3. To-Do List Component
- **File:** `to-do-list/to-do-list.ts`
- **Purpose:** Task management
- **State Management:**
  - Local component state (no external state management)
  - In-memory task array
  - No persistence (data lost on refresh)
- **Features:**
  - CRUD operations for tasks
  - Priority-based sorting
  - Inline editing
  - Task grouping
  - Completion tracking

#### 4. Journal Component (Stub)
- **File:** `journal/journal.ts`
- **Purpose:** Personal journaling (not yet implemented)
- **Current State:** Placeholder component

#### 5. Habit Tracker Component (Stub)
- **File:** `habit-tracker/habit-tracker.ts`
- **Purpose:** Habit tracking (not yet implemented)
- **Current State:** Placeholder component

## Data Models

### Task Model (frontend/src/app/models/task.model.ts)
```typescript
interface Task {
  id: number;           // Unique identifier (timestamp-based)
  title: string;        // Task description
  description?: string; // Optional detailed description (not used yet)
  completed: boolean;   // Completion status
  priority: 'low' | 'medium' | 'high';  // Priority level
  group?: string;       // Optional grouping/category
}
```

## Routing (frontend/src/app/app.routes.ts)

### Route Configuration
```typescript
routes: Routes = [
  { path: '', component: LandingPage },      // Home page
  { path: 'todo', component: ToDoList },     // To-Do List
  { path: 'journal', component: Journal },   // Journal
  { path: 'habit', component: HabitTracker } // Habit Tracker
]
```

- Simple flat routing structure
- No lazy loading (all components loaded upfront)
- No route guards or authentication

## State Management

### Current Approach
- **Local Component State:** Each component manages its own state
- **No Global State:** No Redux, NgRx, or similar state management
- **No Persistence:** Data exists only in memory during session

## Styling

### CSS Architecture
- **Approach:** Component-scoped CSS files
- **No Framework:** Custom CSS, no Bootstrap/Tailwind/Material
- **Encapsulation:** Angular's default ViewEncapsulation.Emulated
- **Global Styles:** `styles.css` for app-wide styles

### Design System
- Custom color scheme
- Responsive layout (needs verification)
- Simple, clean interface
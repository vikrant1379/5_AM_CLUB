# 100 Days Discipline Challenge

## Overview

This is a motivational web application designed to help users build discipline through a structured 100-day routine. The app serves as a digital manual for daily discipline habits from 5 AM to 11 PM, featuring a timeline-based interface that guides users through their daily schedule. The application emphasizes the philosophy "Motivation fades. Discipline stays. Let's Create Discipline" and provides visual progress tracking, motivational elements, and an intuitive calendar interface for the 100-day challenge period.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React useState and useEffect hooks for local state, TanStack Query for server state management
- **UI Components**: Radix UI primitives with shadcn/ui design system for consistent, accessible components
- **Styling**: Tailwind CSS with custom CSS variables for theme management, supporting both light and dark modes
- **Design System**: Material Design principles with productivity app inspirations (Linear/Notion), featuring Inter font family and carefully crafted color palettes

### Component Structure
- **Timeline Components**: Core discipline schedule display with interactive cards
- **Calendar Components**: 100-day challenge progress tracking with visual indicators
- **Header Components**: Navigation controls with day selection and theme toggle
- **Motivational Elements**: Hero sections and floating quote system for user engagement

### Backend Architecture
- **Server**: Express.js with TypeScript running on Node.js
- **API Structure**: RESTful endpoints under `/api` prefix with comprehensive error handling
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **Development Setup**: Vite middleware integration for hot module replacement in development

### Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless driver for cloud deployment
- **ORM**: Drizzle ORM for type-safe database operations and schema management
- **Schema**: User management with secure authentication capabilities
- **Migration System**: Drizzle Kit for database schema versioning and deployment

### Design System Implementation
- **Theme Variables**: CSS custom properties for consistent color management across light/dark modes
- **Typography**: Inter font with carefully scaled sizing for mobile (16px base) and desktop (18px base)
- **Layout System**: Tailwind spacing units (2, 4, 6, 8) for consistent component spacing
- **Interactive States**: Custom hover and active elevation classes for enhanced user feedback

## External Dependencies

### Core Framework Dependencies
- **React 18**: Frontend framework with modern hooks and concurrent features
- **Vite**: Fast build tool with TypeScript support and development server
- **Express**: Backend web framework for API routes and static file serving

### UI and Design Dependencies
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- **shadcn/ui**: Pre-built components following modern design principles
- **Tailwind CSS**: Utility-first CSS framework with PostCSS integration
- **class-variance-authority**: Type-safe variant management for component styling
- **Lucide React**: Consistent icon library for UI elements

### Database and Data Management
- **Neon Database**: Serverless PostgreSQL database with connection pooling
- **Drizzle ORM**: Type-safe ORM with automatic TypeScript inference
- **Drizzle Kit**: Database migration and schema management tools
- **Zod**: Runtime type validation for API inputs and database schemas

### Development and Build Tools
- **TypeScript**: Static type checking across frontend and backend
- **ESBuild**: Fast JavaScript bundler for production builds
- **TanStack Query**: Server state management with caching and synchronization
- **Date-fns**: Comprehensive date manipulation library for calendar functionality

### Authentication and Session Management
- **connect-pg-simple**: PostgreSQL session store for user authentication
- **React Hook Form**: Form state management with validation integration
- **Hookform Resolvers**: Integration between React Hook Form and Zod validation
# CLAUDE.md

## Project goal
Rebuild the CTMS project from scratch in PHP while preserving the current application behavior, role-based workflows, data model, and deployment expectations.

## Target stack
- PHP 8.2+
- Laravel 11 (recommended) or plain PHP + PDO if a minimal footprint is preferred
- MySQL 8+
- Nginx or Apache for production
- Optional Redis for cache/session support
- Optional Laravel Reverb or Pusher for real-time notifications

## Core requirements
1. Preserve all current business logic and user flows.
2. Keep the same roles: student, driver, admin.
3. Preserve authentication, authorization, route management, live bus tracking, announcements, notifications, dashboards, and audit logging.
4. Keep the database schema compatible with the existing CTMS structure.
5. Make the solution deployment-ready with environment-based configuration, secure headers, logging, and container support.

## Implementation rules
- Use prepared statements for all database access.
- Keep passwords hashed with strong password hashing.
- Use JWT or Laravel Sanctum-style token auth consistently.
- Protect admin routes with role checks.
- Return JSON responses with a consistent success/error structure.
- Add health checks and graceful error handling.
- Use environment variables for secrets and deployment settings.

## Functional parity checklist
- Login, logout, refresh token, password reset, and registration
- Student, driver, and admin dashboards
- Bus, route, stop, announcement, notification, and live-location workflows
- Admin CRUD pages and audit trail
- Real-time updates and ETA-related logic

## Deployment checklist
- Add .env.example and production-safe .env handling
- Add Dockerfile and optional docker-compose.yml
- Ensure app runs behind HTTPS
- Configure CORS, session/cookie security, and rate limiting
- Add health endpoint and logging
- Support database migrations and seeders

## Expected output
Produce a production-ready PHP implementation with:
- a clean MVC or Laravel-style structure
- database migrations and seeders
- API endpoints equivalent to the existing system
- secure auth and role handling
- deployment configuration for hosting platforms or containers

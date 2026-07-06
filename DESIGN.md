# DESIGN.md

## Overview
This document defines the design for a PHP-based rewrite of the CTMS application while preserving the existing logic, functions, and user experience.

## Product goals
- Rebuild the application in PHP from scratch
- Preserve existing core functionality and business rules
- Make the project deployment-ready for production hosting
- Keep the system maintainable and secure

## Recommended solution architecture
### Backend
- PHP 8.2+
- Laravel 11 for routing, controllers, middleware, validation, auth, and queueing
- MySQL 8 for persistence
- Eloquent ORM or raw SQL with PDO for compatibility and performance

### Frontend
- Keep the existing React/Vite SPA if the goal is a fast migration with the same UX
- If a fully PHP-based UI is required, build Blade views or a minimal PHP frontend later

## Feature design
### Authentication
- Login with email and password
- Role-based portal routing: student, driver, admin
- Token-based session handling
- Password reset and account verification flow

### Transport management
- Bus management
- Route and stop management
- Driver assignment and duty tracking
- ETA and journey tracking
- Real-time location sharing

### Communication
- Announcements
- Notifications
- Activity and audit logs

## Data model alignment
The PHP version should preserve the current MySQL schema structure:
- users
- students
- drivers
- routes
- stops
- buses
- live_locations
- announcements
- notifications
- activity_logs
- audit_trail
- daily_usage
- journey_sessions

## API design
Use REST-style endpoints with consistent JSON responses:
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/refresh
- POST /api/auth/forgot-password
- POST /api/auth/reset-password
- GET /api/me
- GET /api/buses
- GET /api/routes
- GET /api/routes/eta
- POST /api/driver/location
- POST /api/driver/journey/start
- GET /api/admin/stats
- POST /api/announcements

## Security design
- HTTPS only in production
- Strong password hashing
- CSRF protection for browser sessions
- Rate limiting for auth endpoints
- CORS configuration for frontend access
- Input validation and output sanitization
- Structured logging and exception handling

## Deployment design
- Use environment variables for DB, app, and token secrets
- Add Docker support for portability
- Add health endpoint and monitoring hooks
- Use queue workers for background tasks if needed
- Prepare for deployment to managed PHP hosting, VPS, or container platforms

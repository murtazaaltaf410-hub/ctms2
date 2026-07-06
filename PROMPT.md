# PROMPT.md

Use this prompt to guide an AI coding agent to rebuild the CTMS project in PHP from scratch while preserving existing behavior and making it deployment-ready.

## Prompt
Create a production-ready PHP rewrite of the CTMS application that preserves the current logic, workflows, and user roles from the existing Node.js version. The implementation must keep the same core functions for authentication, role-based dashboards, route and bus management, live location tracking, announcements, notifications, ETA logic, audit logs, and analytics. Use PHP 8.2+ with a clean, maintainable architecture and MySQL 8. Keep the database schema aligned with the current project structure and add migrations and seeders. Provide secure authentication, validation, logging, and environment-based configuration. Make the project deployment-ready by including environment variables, a Dockerfile or container configuration, a health endpoint, and production-safe settings for HTTPS, CORS, headers, and error handling.

## Additional instructions
- Preserve the existing user-facing behavior as closely as possible.
- Keep the API structure consistent with the current application.
- Use prepared statements and secure password hashing.
- Implement role-based access control for student, driver, and admin flows.
- Add deployment documentation and production configuration examples.
- Keep the implementation modular and easy to maintain.

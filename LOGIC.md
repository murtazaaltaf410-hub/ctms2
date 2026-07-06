# LOGIC.md

## Purpose
This file captures the business logic and functional behavior that must be preserved when rebuilding CTMS in PHP.

## Authentication logic
### Login
- Accept email, password, and optional role.
- Find the user by email.
- Reject inactive accounts.
- Enforce role-specific portal access.
- Verify the submitted password against the stored hash.
- Update the last login timestamp.
- Issue a token or session and return user details.

### Logout
- Clear the current auth token or session.
- Return a success response.

### Password reset
- Generate a reset token and store it securely.
- Send or expose the token in development mode.
- Validate the token and change the password.

## Role logic
### Student
- Access student dashboard
- View route and ETA information
- Receive announcements and notifications

### Driver
- Share live GPS location
- Start and end journeys
- View assigned route and bus data
- Update journey and driver status

### Admin
- Manage buses, routes, stops, users, drivers, students, and announcements
- View analytics and usage summaries
- Review activity logs and audit trails

## Transport logic
### Bus and route management
- CRUD operations for buses and routes
- Assign drivers to buses
- Track occupancy and bus status

### ETA and stop logic
- Calculate ETA from stop offsets and route progress
- Display countdowns and journey timing information

### Live location logic
- Accept new location data from drivers
- Store current coordinates and status
- Broadcast updates for active clients

## Notification and announcement logic
- Create announcements for relevant audiences
- Send notifications to users based on event type
- Mark notifications as read/unread

## Audit and analytics logic
- Record activity events for auth and admin actions
- Track daily usage and route performance data
- Maintain audit logs for admin changes

## Functional parity checklist
- Same roles and permissions
- Same data records and relationships
- Same API response structure where possible
- Same workflows for student, driver, and admin users
- Same deployment assumptions: environment variables, secure cookies, and database-backed storage

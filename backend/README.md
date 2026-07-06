# ctms-backend

## Vercel deployment database configuration

This backend requires a MySQL database connection in production. Set the following environment variables in Vercel:

- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET`
- `COOKIE_SECRET`
- `CLIENT_URL`

Or use a single connection string with:
- `DATABASE_URL=mysql://user:password@host:3306/ctms_db`

**Railway users:** use the **public** MySQL URL (`MYSQL_PUBLIC_URL`), not `mysql.railway.internal`. Vercel cannot resolve internal Railway hostnames.

After deploying, run `npm run seed` against the production database to create demo users with working password hashes.

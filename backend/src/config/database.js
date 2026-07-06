import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

function parseDatabaseUrl(urlString) {
  try {
    const url = new URL(urlString);
    const sslMode = url.searchParams.get('sslmode') || url.searchParams.get('ssl');
    const ssl = sslMode === 'require' || sslMode === 'true';

    return {
      host: url.hostname,
      port: url.port || '3306',
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database: url.pathname?.slice(1) || undefined,
      ssl: ssl ? { rejectUnauthorized: false } : undefined,
    };
  } catch (error) {
    console.warn('Invalid DATABASE_URL:', error.message);
    return {};
  }
}

const dbUrlConfig = process.env.DATABASE_URL ? parseDatabaseUrl(process.env.DATABASE_URL) : {};

const dbHost = dbUrlConfig.host || process.env.DB_HOST || 'localhost';

if (/\.internal$|\.local$|localhost\.railway\.app/i.test(dbHost)) {
  console.error(
    'Invalid DB host for this deployment:',
    dbHost,
    '- Use your database provider public hostname (e.g. Railway MYSQL_PUBLIC_URL), not an internal-only host.'
  );
}

const pool = mysql.createPool({
  host: dbHost,
  port: parseInt(dbUrlConfig.port || process.env.DB_PORT || '3306'),
  user: dbUrlConfig.user || process.env.DB_USER || 'root',
  password: dbUrlConfig.password || process.env.DB_PASSWORD || '',
  database: dbUrlConfig.database || process.env.DB_NAME || 'ctms_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  ssl: dbUrlConfig.ssl || (process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined),
});

export async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

export async function queryOne(sql, params = []) {
  const rows = await query(sql, params);
  return rows[0] || null;
}

export async function testConnection() {
  const connection = await pool.getConnection();
  await connection.ping();
  connection.release();
  return true;
}

export default pool;

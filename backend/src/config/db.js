// MySQL connection pool. Exits the process immediately if the DB is unreachable at startup
// so misconfigurations surface at boot time rather than silently failing on first request.
import mysql from 'mysql2/promise';
import 'dotenv/config';

let db;
const env = process.env;

try {
  db = mysql.createPool({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 50,
    connectTimeout: 10000,
    idleTimeout: 60000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });
  const conn = await db.getConnection();
  conn.release();
  console.log(`Connection to db ${env.DB_NAME} successful`);
} catch (error) {
  console.error('Error connecting to the database', error.message);
  process.exit(1);
}

export { db };

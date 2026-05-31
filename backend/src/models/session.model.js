import { db } from '../config/db.js';

// Insert a new session row and return its generated ID
export const createSession = async (date, time, type, duration, price) => {
  const [result] = await db.query(
    `INSERT INTO sessions (date, time, type, duration, price) VALUES (?, ?, ?, ?, ?)`,
    [date, time, type, duration, price],
  );
  return result.insertId;
};

// Returns all sessions (past + future) for the admin panel
export const findAllSessions = async () => {
  const [rows] = await db.query(
    // DATE_FORMAT returns the date as a plain "YYYY-MM-DD" string
    // Without it, mysql2 auto-converts DATE columns to JS Date objects,
    // which serialize as full ISO timestamps and break date key matching in the frontend
    `SELECT id, DATE_FORMAT(date, '%Y-%m-%d') AS date, time, type, duration, price, created_at FROM sessions ORDER BY date ASC, time ASC`,
  );
  return rows;
};

// Returns only upcoming sessions (today onwards) for the public booking calendar
export const findPublicSessions = async () => {
  const [rows] = await db.query(
    // CURDATE() compares against today's date in the DB server's timezone
    `SELECT id, DATE_FORMAT(date, '%Y-%m-%d') AS date, time, type, duration, price FROM sessions WHERE date >= CURDATE() ORDER BY date ASC, time ASC`,
  );
  return rows;
};

// Returns a single session by ID — used to check existence before deleting
export const findSessionById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM sessions WHERE id = ?`, [id]);
  return rows[0]; // undefined if not found
};

// Hard-deletes a session row by ID
export const deleteSessionById = async (id) => {
  const [result] = await db.query(`DELETE FROM sessions WHERE id = ?`, [id]);
  return result.affectedRows;
};

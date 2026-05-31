// Auth model: user and role queries. The reset token is stored hashed in the DB with an
// expiry timestamp so it self-invalidates without a cleanup job. Only the raw token (sent
// by email) is usable; a DB leak exposes only the useless hash.
import crypto from 'crypto';
import { db } from '../config/db.js';

// SHA-256 is enough here: the token is a high-entropy random UUID, not a low-entropy password,
// so it needs no slow hash (argon2). We compare hashes, never the raw token.
const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

// create an admin-invited user
// the new user sets their own password via the reset-password flow

export const createAdminUser = async (roleId, email, passwordHash, firstName, lastName) => {
  const [result] = await db.query(
    'INSERT INTO users (role_id, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)',
    [roleId, email, passwordHash, firstName, lastName],
  );
  return result.insertId;
};

// find all users
export const findAllUsers = async () => {
  const [rows] = await db.query(
    `SELECT users.id, users.email, users.first_name, users.last_name,
       roles.name AS role, users.is_active, users.last_login
       FROM users JOIN roles ON roles.id = users.role_id
       ORDER BY users.created_at DESC`,
    [],
  );
  return rows;
};
// find user by email

export const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    `SELECT users.id, users.role_id, users.email, users.password, users.first_name, users.last_name, users.is_active, users.last_login, 
    roles.name AS role
    FROM users
    JOIN roles ON roles.id = users.role_id
    WHERE users.email = ?`,
    [email],
  );
  return rows[0];
};

// find user by id

export const findUserById = async (id) => {
  const [rows] = await db.query(
    `SELECT users.id, users.email, users.first_name, users.last_name, users.is_active, users.last_login, roles.name AS role FROM users JOIN roles ON roles.id = users.role_id WHERE users.id = ? AND users.is_active = 1`,
    [id],
  );
  return rows[0] || null;
};

// find user with a valid token to reset password
export const findUserByResetToken = async (token) => {
  const [rows] = await db.query(
    `SELECT id, role_id, email, first_name, last_name, is_active, reset_token_expires_at FROM users WHERE reset_token=? AND reset_token_expires_at > NOW()`,
    [hashToken(token)],
  );
  return rows[0];
};

// update password
export const updatePassword = async (userId, passwordHash) => {
  await db.query(`UPDATE users SET password=? WHERE id =?`, [passwordHash, userId]);
};

//
export const saveResetPassword = async (userId, token) => {
  await db.query(
    `UPDATE users SET reset_token=?, reset_token_expires_at = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE id=?`,
    [hashToken(token), userId],
  );
};

// clear reset_token
export const clearResetToken = async (userId) => {
  await db.query(`UPDATE users SET reset_token=NULL, reset_token_expires_at = NULL WHERE id=?`, [
    userId,
  ]);
};

// update last login
export const updateLastLogin = async (userId) => {
  await db.query(`UPDATE users SET last_login = NOW() WHERE id = ?`, [userId]);
};

// find user by role
export const findRoleByName = async (roleName) => {
  const [rows] = await db.query(`SELECT id FROM roles WHERE name=?`, [roleName]);
  return rows[0];
};

// delete user

export const deleteUserById = async (userId) => {
  const [result] = await db.query(`DELETE FROM users WHERE id = ?`, [userId]);
  return result.affectedRows;
};

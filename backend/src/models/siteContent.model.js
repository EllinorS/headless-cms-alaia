import { db } from '../config/db.js';

export const findAllContent = async () => {
  const [rows] = await db.query(
    `SELECT * FROM site_content ORDER BY page, key_name`,
  );
  return rows;
};

export const findContentByPage = async (pageName) => {
  const [rows] = await db.query(
    `SELECT * FROM site_content WHERE page = ?`,
    [pageName],
  );
  return rows;
};

export const findContentByKey = async (keyName) => {
  const [rows] = await db.query(
    `SELECT * FROM site_content WHERE key_name = ?`,
    [keyName],
  );
  return rows[0] || null;
};

export const upsertContent = async (keyName, page, label, type, value) => {
  const [result] = await db.query(
    `INSERT INTO site_content (key_name, page, label, type, value)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE value = VALUES(value)`,
    [keyName, page, label, type, value ?? ''],
  );
  return result;
};

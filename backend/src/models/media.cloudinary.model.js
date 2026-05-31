import { db } from '../config/db.js';

// Inserts a new media row and returns its generated ID
export const createMedia = async (filename, url, mimeType, size, alt, cloudinaryPublicId) => {
  const [result] = await db.query(
    `INSERT INTO media (filename, url, mime_type, size_bytes, alt, cloudinary_public_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [filename, url, mimeType, size, alt, cloudinaryPublicId],
  );
  return result.insertId;
};

export const findAllMedia = async () => {
  const [rows] = await db.query(`SELECT * FROM media ORDER BY uploaded_at DESC`);
  return rows;
};

export const findMediaById = async (mediaId) => {
  const [rows] = await db.query(`SELECT * FROM media WHERE id = ?`, [mediaId]);
  return rows[0] || null;
};

// Only alt text is editable — the URL and public_id are set by Cloudinary on upload
export const updateMedia = async (mediaId, alt) => {
  const [result] = await db.query(`UPDATE media SET alt = ? WHERE id = ?`, [alt, mediaId]);
  return result.affectedRows;
};

export const deleteMedia = async (mediaId) => {
  const [result] = await db.query(`DELETE FROM media WHERE id = ?`, [mediaId]);
  return result.affectedRows > 0;
};

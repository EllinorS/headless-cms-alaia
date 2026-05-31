// Form model: SQL for the forms, form_fields, and form_field_options tables.
// The detailed queries (findFormWithDetails*) return one row per option so form.formatter.js
// must re-assemble them into a nested structure before sending to the client.
import { db } from '../config/db.js';

//create form
export const createForm = async (name, type, isActive = 1) => {
  const [result] = await db.query(`INSERT INTO forms (name, type, is_active) VALUES (?, ?, ?)`, [
    name,
    type,
    isActive,
  ]);
  return result.insertId;
};

// find all forms
export const findAllForms = async () => {
  const [rows] = await db.query(`SELECT * FROM forms ORDER BY id DESC`);
  return rows;
};

// find simple form by id
export const findFormById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM forms WHERE id = ?`, [id]);
  return rows[0] || null;
};

// find detailed form
export const findFormWithDetails = async (formId) => {
  const [rows] = await db.query(
    `
    SELECT 
      forms.id AS form_id,
      forms.name AS form_name,
      forms.type AS form_type,

      form_fields.id AS field_id,
      form_fields.label AS field_label,
      form_fields.subtitle AS field_subtitle,
      form_fields.explanation AS field_explanation,
      form_fields.type AS field_type,
      form_fields.display_type AS field_display_type,
      form_fields.image_url AS field_image_url,
      form_fields.is_required AS field_is_required,
      form_fields.position AS field_position,

      form_field_options.id AS option_id,
      form_field_options.label AS option_label,
      form_field_options.value AS option_value,
      form_field_options.feedback AS option_feedback,
      form_field_options.image_url AS option_image_url,
      form_field_options.position AS option_position

    FROM forms

    LEFT JOIN form_fields 
      ON forms.id = form_fields.form_id
      AND form_fields.is_active = 1

    LEFT JOIN form_field_options 
      ON form_fields.id = form_field_options.field_id
      AND form_field_options.is_active = 1

    WHERE forms.id = ?
      AND forms.is_active = 1

    ORDER BY 
      form_fields.position ASC,
      form_field_options.position ASC
  `,
    [formId],
  );

  return rows;
};

//update form
export const updateForm = async (formId, data) => {
  const [result] = await db.query(`UPDATE forms SET name=?, type=?, is_active=? WHERE id=?`, [
    data.name,
    data.type,
    data.isActive,
    formId,
  ]);
  return result.affectedRows;
};

// delete form
export const deleteFormById = async (formId) => {
  const [result] = await db.query(`DELETE FROM forms WHERE id=?`, [formId]);
  return result.affectedRows;
};

// --- FIELD CRUD

// create fields
export const createField = async (
  formId,
  label,
  subtitle,
  explanation,
  type,
  displayType,
  imageUrl,
  position,
  isRequired,
) => {
  const [result] = await db.query(
    `INSERT INTO form_fields (form_id, label, subtitle, explanation, type, display_type, image_url, position, is_required) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [formId, label, subtitle, explanation, type, displayType, imageUrl, position, isRequired],
  );
  return result.insertId;
};

// find field by id
export const findFieldById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM form_fields WHERE id = ?`, [id]);
  return rows[0] || null;
};

// find field by form id
export const findFieldsByFormId = async (formId) => {
  const [rows] = await db.query(`SELECT id, type, is_required FROM form_fields WHERE form_id = ?`, [
    formId,
  ]);
  return rows;
};

// update fields
export const updateField = async (
  id,
  label,
  subtitle,
  explanation,
  type,
  displayType,
  imageUrl,
  isActive,
  position,
  isRequired,
) => {
  const [result] = await db.query(
    `UPDATE form_fields SET label=?, subtitle = ?, explanation = ?, type=?, display_type=?, image_url = ?, is_active = ?, position=?, is_required=? WHERE id=?`,
    [label, subtitle, explanation, type, displayType, imageUrl, isActive, position, isRequired, id],
  );
  return result.affectedRows;
};

// delete fields
export const deleteField = async (id) => {
  const [result] = await db.query(`DELETE FROM form_fields WHERE id=?`, [id]);
  return result.affectedRows;
};

// --- OPTIONS CRUD

// create options
export const createOption = async (fieldId, label, value, feedback, imageUrl, position) => {
  const [result] = await db.query(
    `INSERT INTO form_field_options (field_id, label, value, feedback, image_url, position) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [fieldId, label, value, feedback, imageUrl, position],
  );
  return result.insertId;
};

// find option by id
export const findOptionById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM form_field_options WHERE id = ?`, [id]);
  return rows[0] || null;
};

// update options
export const updateOption = async (id, label, value, feedback, imageUrl, position) => {
  const [result] = await db.query(
    `UPDATE form_field_options SET label=?, value=?, feedback = ?, image_url = ?, position=? WHERE id=?`,
    [label, value, feedback, imageUrl, position, id],
  );
  return result.affectedRows;
};

// delete options
export const deleteOption = async (id) => {
  const [result] = await db.query(`DELETE FROM form_field_options WHERE id=?`, [id]);
  return result.affectedRows;
};

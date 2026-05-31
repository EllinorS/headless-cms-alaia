// Submission model: saves quiz/form submissions and their answers.
// Both functions accept a connection so they can participate in the transaction managed by handleSubmissionCreation.
import { db } from '../config/db.js';

export const createSubmission = async (connection, data) => {
  const [result] = await connection.query(
    `INSERT INTO form_submissions 
     (form_id, client_firstname, client_lastname, client_email, client_phone)
     VALUES (?, ?, ?, ?, ?)`,
    [data.formId, data.firstName, data.lastName, data.email, data.phone ?? null],
  );

  return result.insertId;
};

// insert answers
export const insertAnswers = async (connection, submissionId, answers) => {
  const values = answers.map((answer) => [submissionId, answer.fieldId, answer.value]);

  await connection.query(`INSERT INTO form_answers (submission_id, field_id, value) VALUES ?`, [
    values,
  ]);
};

// find all submissions

export const findAllSubmissions = async () => {
  const [rows] = await db.query(`
    SELECT form_submissions.*, forms.name as form_name 
    FROM form_submissions
    JOIN forms ON form_submissions.form_id = forms.id
    ORDER BY form_submissions.created_at DESC
  `);
  return rows;
};

// find detailed submission by id

export const findSubmissionDetails = async (submissionId) => {
  const [rows] = await db.query(
    `
    SELECT 
      form_submissions.id,
      form_submissions.form_id,
      form_submissions.status,
      form_submissions.client_firstname,
      form_submissions.client_lastname,
      form_submissions.client_email,
      form_submissions.client_phone,

      form_answers.id AS answer_id,
      form_answers.value AS answer_value,

      form_fields.label AS question_label,
      form_fields.type AS question_type,
      form_fields.position AS question_position

    FROM form_submissions
    LEFT JOIN form_answers 
      ON form_submissions.id = form_answers.submission_id

    LEFT JOIN form_fields 
      ON form_answers.field_id = form_fields.id

    WHERE form_submissions.id = ?

    ORDER BY form_fields.position ASC
    `,
    [submissionId],
  );

  return rows;
};

// find submission by form type
export const findSubmissionsByFormType = async (formType) => {
  const [rows] = await db.query(
    `SELECT form_submissions.*, forms.name AS form_name, forms.type AS form_type
     FROM form_submissions
     JOIN forms ON form_submissions.form_id = forms.id
     WHERE forms.type = ?
     ORDER BY form_submissions.created_at DESC`,
    [formType],
  );
  return rows;
};

// update submission status
export const updateSubmissionStatus = async (id, status) => {
  const [result] = await db.query(`UPDATE form_submissions SET status = ? WHERE id = ?`, [
    status,
    id,
  ]);
  return result.affectedRows;
};

// delete submission

export const deleteSubmission = async (id) => {
  const [result] = await db.query(`DELETE FROM form_submissions WHERE id=?`, [id]);
  return result.affectedRows;
};

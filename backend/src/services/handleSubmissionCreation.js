// Form submission service. Validates answers against the live form structure,
// strips HTML from all user input, then saves the submission and its answers atomically.
import { db } from '../config/db.js';
import * as submissionModel from '../models/submission.model.js';
import sanitizeHtml from 'sanitize-html';
import * as formModel from '../models/form.model.js';
import { newSubmissionEmail } from '../config/mailer.js';

// sanitize
const sanitize = (value) =>
  sanitizeHtml(String(value), {
    allowedTags: [],
    allowedAttributes: {},
  });

export const handleSubmissionCreation = async (formId, client, answers) => {
  const connection = await db.getConnection();
  let submissionId;

  try {
    // start transaction
    await connection.beginTransaction();

    // get form structure
    const fields = await formModel.findFieldsByFormId(formId);

    // list allowed fields
    const allowedFieldIds = fields.map((field) => field.id);

    // check valid fields ids
    for (const answer of answers) {
      const isValid = allowedFieldIds.includes(answer.fieldId);

      if (!isValid) {
        const err = new Error(`Invalid fieldId: ${answer.fieldId}`);
        err.status = 400;
        throw err;
      }
    }

    // check required fields
    const requiredFields = fields.filter((field) => field.is_required);

    const answeredFieldIds = answers.map((answer) => answer.fieldId);

    for (const field of requiredFields) {
      const isAnswered = answeredFieldIds.includes(field.id);

      if (!isAnswered) {
        const err = new Error(`Missing required field: ${field.id}`);
        err.status = 400;
        throw err;
      }
    }

    // clean user input
    const cleanAnswers = answers.map((answer) => {
      return {
        fieldId: answer.fieldId,
        value: sanitize(answer.value),
      };
    });

    // save submission
    submissionId = await submissionModel.createSubmission(connection, {
      formId: formId,
      firstName: sanitize(client.firstName),
      lastName: sanitize(client.lastName),
      email: sanitize(client.email),
      phone: client.phone ? sanitize(client.phone) : client.phone,
    });

    // save answers
    await submissionModel.insertAnswers(connection, submissionId, cleanAnswers);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }

  newSubmissionEmail(client.firstName, client.lastName, client.email, client.phone ?? '')
    .catch((err) => console.error('Submission notification email failed for', submissionId, err.message));

  return submissionId;
};

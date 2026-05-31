// Submission controller: receives quiz/form answers from the public, delegates validation
// and saving to handleSubmissionCreation, and exposes admin endpoints to read and manage submissions.
import asyncHandler from '../utils/asyncHandler.js';
import * as submissionModel from '../models/submission.model.js';
import * as submissionService from '../services/handleSubmissionCreation.js';
import { toSubmissionDTO } from '../utils/dto.js';

// create submission

export const createSubmission = asyncHandler(async (req, res) => {
  const { formId, client, answers } = req.body;

  const submissionId = await submissionService.handleSubmissionCreation(formId, client, answers);

  res.status(201).json({
    message: 'Submission created.',
    data: { id: submissionId },
  });
});

// get detailed submission by id
export const getSubmissionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const details = await submissionModel.findSubmissionDetails(id);

  if (!details || details.length === 0) {
    return res.status(404).json({ message: 'Submission not found' });
  }
  const submission = {
    id: details[0].id,
    client: {
      firstName: details[0].client_firstname,
      lastName: details[0].client_lastname,
      email: details[0].client_email,
      phone: details[0].client_phone,
    },
    status: details[0].status,
    createdAt: details[0].created_at,
    answers: details.map((row) => ({
      question: row.question_label,
      value: row.answer_value,
    })),
  };

  res.status(200).json({ data: submission });
});

// get all submissions
export const getAllSubmissions = asyncHandler(async (req, res) => {
  const { type } = req.query

  const submissions = type
    ? await submissionModel.findSubmissionsByFormType(type)
    : await submissionModel.findAllSubmissions();

  res.status(200).json({ data: submissions.map(toSubmissionDTO) });
});

// update status
export const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const affectedRows = await submissionModel.updateSubmissionStatus(id, status);

  if (!affectedRows) return res.status(404).json({ message: 'Submission not found' });
  res.status(200).json({ message: 'Submission status updated' });
});

// delete submission

export const deleteSubmission = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const affectedRows = await submissionModel.deleteSubmission(id);

  if (!affectedRows) return res.status(404).json({ message: 'Submission not found' });
  res.status(204).send();
});

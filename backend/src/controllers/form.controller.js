// Form controller: CRUD for forms, their fields, and field options.
// Also serves the public quiz form — admin and public variants return different data (all vs active-only).
import asyncHandler from '../utils/asyncHandler.js';
import * as formModel from '../models/form.model.js';
import { formatForm } from '../utils/form.formatter.js';

// create a form

export const createForm = asyncHandler(async (req, res) => {
  const { name, type, isActive } = req.body;
  const formId = await formModel.createForm(name, type, isActive ?? 1);
  res.status(201).json({ message: 'Form created', data: { id: formId } });
});

// get all forms
export const getAllForms = asyncHandler(async (req, res) => {
  const forms = await formModel.findAllForms();
  res.status(200).json({ data: forms });
});

// get form with all details by id
export const getFormById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const rows = await formModel.findFormWithDetails(id);

  if (!rows || rows.length === 0) {
    return res.status(404).json({ message: 'Form not found' });
  }

  const form = formatForm(rows);
  res.json({ data: form });
});


// update form
export const updateForm = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existing = await formModel.findFormById(id);
  if (!existing) return res.status(404).json({ message: 'Form not found' });

  const updatedData = {
    name: req.body.name ?? existing.name,
    type: req.body.type ?? existing.type,
    isActive: req.body.isActive ?? existing.is_active,
  };

  await formModel.updateForm(id, updatedData);
  res.status(200).json({ message: 'Form updated' });
});

// delete form
export const deleteForm = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const affected = await formModel.deleteFormById(id);
  if (!affected) return res.status(404).json({ message: 'Form not found' });
  res.status(204).send();
});

// --- FIELDS CONTROLLER

// create field
export const createField = asyncHandler(async (req, res) => {
  const { formId } = req.params;
  const { label, subtitle, explanation, type, displayType, imageUrl, position, isRequired } =
    req.body;

  const fieldId = await formModel.createField(
    formId,
    label,
    subtitle ?? null,
    explanation ?? null,
    type,
    displayType ?? null,
    imageUrl ?? null,
    position ?? 0,
    isRequired ?? 1,
  );
  res.status(201).json({ message: 'Field added', data: { id: fieldId } });
});

// get single field by id
export const getFieldById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const field = await formModel.findFieldById(id);

  if (!field) return res.status(404).json({ message: 'Field not found' });
  res.status(200).json({ data: field });
});

// update field
export const updateField = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existing = await formModel.findFieldById(id);

  if (!existing) return res.status(404).json({ message: 'Field not found' });

  const updatedData = {
    label: req.body.label ?? existing.label,
    subtitle: req.body.subtitle ?? existing.subtitle,
    explanation: req.body.explanation ?? existing.explanation,
    type: req.body.type ?? existing.type,
    displayType: req.body.displayType ?? existing.display_type,
    imageUrl: req.body.imageUrl ?? existing.image_url,
    isActive: req.body.isActive ?? existing.is_active,
    position: req.body.position ?? existing.position,
    isRequired: req.body.isRequired ?? existing.is_required,
  };

  await formModel.updateField(
    id,
    updatedData.label,
    updatedData.subtitle,
    updatedData.explanation,
    updatedData.type,
    updatedData.displayType,
    updatedData.imageUrl,
    updatedData.isActive,
    updatedData.position,
    updatedData.isRequired,
  );
  res.status(200).json({ message: 'Field updated' });
});

// delete field
export const deleteField = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const affected = await formModel.deleteField(id);
  if (!affected) return res.status(404).json({ message: 'Field not found' });
  res.status(204).send();
});

// --- OPTIONS CONTROLLER

// create option for field
export const createOption = asyncHandler(async (req, res) => {
  const { fieldId } = req.params;
  const { label, value, feedback, imageUrl, position } = req.body;

  const field = await formModel.findFieldById(fieldId);
  if (!field) return res.status(404).json({ message: 'Field not found' });

  const optionId = await formModel.createOption(
    fieldId,
    label,
    value,
    feedback ?? null,
    imageUrl ?? null,
    position ?? 0,
  );
  res.status(201).json({ message: 'Option created', data: { id: optionId } });
});

// get option by id
export const getOptionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const option = await formModel.findOptionById(id);

  if (!option) return res.status(404).json({ message: 'Option not found' });
  res.status(200).json({ data: option });
});

// update option
export const updateOption = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existing = await formModel.findOptionById(id);

  if (!existing) return res.status(404).json({ message: 'Option not found' });

  const updatedData = {
    label: req.body.label ?? existing.label,
    value: req.body.value ?? existing.value,
    feedback: req.body.feedback ?? existing.feedback,
    imageUrl: req.body.imageUrl ?? existing.image_url,
    position: req.body.position ?? existing.position,
  };

  await formModel.updateOption(
    id,
    updatedData.label,
    updatedData.value,
    updatedData.feedback,
    updatedData.imageUrl,
    updatedData.position,
  );
  res.status(200).json({ message: 'Option updated' });
});

// delete an option
export const deleteOption = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const affectedRows = await formModel.deleteOption(id);

  if (!affectedRows) return res.status(404).json({ message: 'Option not found' });
  res.status(204).send();
});

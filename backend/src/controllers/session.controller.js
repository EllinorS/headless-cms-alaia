// asyncHandler wraps async functions so any thrown error is automatically passed to Express's error handler
// Without it, an unhandled promise rejection would crash the request silently
import asyncHandler from '../utils/asyncHandler.js';
import * as sessionModel from '../models/session.model.js';
import { toSessionDTO } from '../utils/dto.js';

// POST /api/sessions — creates a new session (admin only)
export const createSession = asyncHandler(async (req, res) => {
  const { date, time, type, duration, price } = req.body;
  const sessionId = await sessionModel.createSession(date, time, type, duration, price);
  // 201 Created — standard HTTP status for a successful resource creation
  res.status(201).json({ message: 'Session created', data: { id: sessionId } });
});

// GET /api/sessions — returns all sessions including past ones (admin panel)
export const getAllSessions = asyncHandler(async (req, res) => {
  const sessions = await sessionModel.findAllSessions();
  res.json({ data: sessions.map(toSessionDTO) });
});

// GET /api/sessions/public — returns only upcoming sessions (public booking calendar)
export const getPublicSessions = asyncHandler(async (req, res) => {
  const sessions = await sessionModel.findPublicSessions();
  res.json({ data: sessions.map(toSessionDTO) });
});

// DELETE /api/sessions/:id — deletes a session by ID (admin only)
export const deleteSession = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // Check the session exists before trying to delete — returns 404 if not found
  const existing = await sessionModel.findSessionById(id);
  if (!existing) return res.status(404).json({ message: 'Session not found.' });
  await sessionModel.deleteSessionById(id);
  res.status(204).send();
});

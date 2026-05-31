// Site content controller: read and update headless CMS content stored in the site_content table.
// Content is keyed by page and key_name; values can be text or a reference to a media row.
import sanitizeHtml from 'sanitize-html';
import asyncHandler from '../utils/asyncHandler.js';
import * as contentModel from '../models/siteContent.model.js';
import { toContentDTO } from '../utils/dto.js';

// RICHTEXT is rendered as raw HTML on public pages, so an admin (or a compromised admin
// account) could inject a stored XSS payload. We strip everything except safe formatting
// tags before storing — defence in depth, even though only SUPER_ADMIN can write content.
const RICHTEXT_OPTIONS = {
  allowedTags: ['b', 'i', 'em', 'strong', 'u', 'a', 'p', 'br', 'ul', 'ol', 'li', 'h2', 'h3', 'blockquote'],
  allowedAttributes: { a: ['href', 'target', 'rel'] },
  allowedSchemes: ['http', 'https', 'mailto'],
};

// get all content
export const getAllContent = asyncHandler(async (req, res) => {
  const content = await contentModel.findAllContent();
  res.json({ data: content.map(toContentDTO) });
});

// get content by page
export const getContentByPage = asyncHandler(async (req, res) => {
  const { pageName } = req.params;
  const rows = await contentModel.findContentByPage(pageName);
  if (!rows.length) return res.status(404).json({ message: 'Page not found.' });
  res.status(200).json({ data: rows.map(toContentDTO) });
});

// get content by key
export const getContentByKey = asyncHandler(async (req, res) => {
  const { keyName } = req.params;
  const content = await contentModel.findContentByKey(keyName);
  if (!content) return res.status(404).json({ message: 'Content not found.' });
  res.json({ data: toContentDTO(content) });
});
// update content by key

export const updateContentByKey = asyncHandler(async (req, res) => {
  const { keyName } = req.params;
  const { value, page, label, type } = req.body;

  if (!page || !label || !type) {
    return res.status(400).json({ message: 'page, label, and type are required.' });
  }

  const safeValue = type === 'RICHTEXT' ? sanitizeHtml(value ?? '', RICHTEXT_OPTIONS) : value;

  await contentModel.upsertContent(keyName, page, label, type, safeValue);
  res.status(200).json({ message: 'Content updated' });
});

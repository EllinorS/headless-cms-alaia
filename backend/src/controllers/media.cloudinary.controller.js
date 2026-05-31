import asyncHandler from '../utils/asyncHandler.js';
import * as mediaModel from '../models/media.cloudinary.model.js';
import cloudinary from '../config/cloudinary.js';

// Wraps Cloudinary's callback-based upload_stream in a Promise so we can use await
// buffer = the file bytes from multer memoryStorage
// options = cloudinary upload settings (folder, resource_type, etc.)
function streamUpload(buffer, options) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    stream.end(buffer); // send the buffer into the stream
  });
}

// POST /api/media-cloudinary — upload one or more files
export const createMedia = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No file provided' });
  }

  const { alt } = req.body;
  const mediaArray = [];

  for (const file of req.files) {
    // Upload the file buffer to Cloudinary
    // resource_type: 'auto' handles both images and videos automatically
    const result = await streamUpload(file.buffer, {
      folder: 'alaia-surf',
      resource_type: 'auto',
    });

    // Store the Cloudinary URL and public_id in the DB
    const id = await mediaModel.createMedia(
      file.originalname,
      result.secure_url,  // full HTTPS URL — ready to use in <img> tags without any prefix
      file.mimetype,
      file.size,
      alt || null,
      result.public_id,   // e.g. "alaia-surf/abc123" — needed to delete from Cloudinary later
    );
    mediaArray.push(id);
  }

  res.status(201).json({ message: `${mediaArray.length} file(s) uploaded`, mediaArray });
});

// GET /api/media-cloudinary
export const getAllMedia = asyncHandler(async (req, res) => {
  const media = await mediaModel.findAllMedia();
  res.status(200).json({ data: media });
});

// GET /api/media-cloudinary/:id
export const getMediaById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const media = await mediaModel.findMediaById(id);
  if (!media) return res.status(404).json({ message: 'Media not found' });
  res.status(200).json({ data: media });
});

// PUT /api/media-cloudinary/:id — only alt text is editable
export const updateMediaById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existing = await mediaModel.findMediaById(id);
  if (!existing) return res.status(404).json({ message: 'Media not found' });
  await mediaModel.updateMedia(id, req.body.alt ?? existing.alt);
  res.status(200).json({ message: 'Media updated' });
});

// DELETE /api/media-cloudinary/:id
export const deleteMedia = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existing = await mediaModel.findMediaById(id);
  if (!existing) return res.status(404).json({ message: 'Media not found' });

  // Delete the asset from Cloudinary. Wrapped so a Cloudinary failure doesn't block the DB deletion
  if (existing.cloudinary_public_id) {
    try {
      await cloudinary.uploader.destroy(existing.cloudinary_public_id, {
        resource_type: existing.mime_type?.startsWith('video/') ? 'video' : 'image',
      });
    } catch (err) {
      console.error('Cloudinary destroy failed for', existing.cloudinary_public_id, err.message);
    }
  }

  await mediaModel.deleteMedia(id);
  res.status(204).send();
});

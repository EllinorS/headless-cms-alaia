import multer from 'multer';

const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime'];

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Authorized format: PNG, JPEG, WEBP, MP4, WEBM, QUICKTIME'), false);
  }
};

export const uploadToMemory = multer({
  storage: multer.memoryStorage(), // keeps file as Buffer in RAM instead of writing to disk
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

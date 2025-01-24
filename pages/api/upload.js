// pages/api/upload.js

import fs from 'fs';
import path from 'path';
import multer from 'multer';

// Define valid MIME types for images and videos
const fileTypes = /jpeg|jpg|png|gif|mp4|mov|avi/;  // Adjust this to include any other types you want

// Set up Multer to store files in a temporary folder and preserve original file extension
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Store files in the public/uploads folder
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    // Preserve the original filename and extension
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Validate file types (images and videos)
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true); // Accept the file
    } else {
      cb(new Error('Invalid file type. Only images and videos are allowed.'));
    }
  },
});

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser to handle file upload
  },
};

const uploadHandler = (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    // Get the file info and save the image/video URL
    const uploadedFilePath = `/uploads/${req.file.filename}`;
    res.status(200).json({ fileUrl: uploadedFilePath });
  });
};

export default uploadHandler;

import fs from 'fs';
import path from 'path';
import multer from 'multer';

// Allowed file types for upload (images and videos)
const fileTypes = /jpeg|jpg|png|gif|mp4|mov|avi/;

// Set up Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.resolve('public/uploads/');  // Resolve the correct path for uploads
    
    // Create the uploads folder if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);  // Save to public/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid name conflict
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (extname && mimeType) {
      return cb(null, true);  // Allow the file
    } else {
      cb(new Error('Invalid file type. Only images and videos are allowed.'));
    }
  },
});

export const config = {
  api: {
    bodyParser: false,  // Disable Next.js default body parser for file uploads
  },
};

const uploadHandler = (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('Error during file upload:', err);  // Log error for debugging
      return res.status(400).json({ message: err.message });
    }

    // Successfully uploaded file
    const uploadedFilePath = `/uploads/${req.file.filename}`;
    console.log('File uploaded successfully:', uploadedFilePath);
    res.status(200).json({ fileUrl: uploadedFilePath });
  });
};

export default uploadHandler;

import path from 'path';
import multer from 'multer';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';

// Set up AWS S3 with credentials from environment variables
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION, // Your AWS region, e.g., 'us-east-2'
});

// Allowed file types for upload (images and videos)
const fileTypes = /jpeg|jpg|png|gif|mp4|mov|avi/;

// Set up Multer for file storage in S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME, // The S3 bucket name
    acl: 'public-read', // Make files publicly accessible
    contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically set file content type based on file type
    key: (req, file, cb) => {
      const fileName = Date.now() + path.extname(file.originalname); // Add timestamp to avoid name conflict
      cb(null, `uploads/${fileName}`); // Store files in the 'uploads' folder in S3
    },
  }),
  fileFilter: (req, file, cb) => {
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (extname && mimeType) {
      return cb(null, true); // Allow the file
    } else {
      cb(new Error('Invalid file type. Only images and videos are allowed.'));
    }
  },
});

// Disable Next.js default body parser for file uploads (required by multer)
export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};

// Upload handler function
const uploadHandler = (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      console.error('Error during file upload:', err);
      return res.status(400).json({ message: err.message });
    }

    try {
      // Successfully uploaded file to S3
      const uploadedFileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${s3.config.region}.amazonaws.com/${req.file.key}`;
      console.log('File uploaded successfully:', uploadedFileUrl);
      res.status(200).json({ fileUrl: uploadedFileUrl });
    } catch (uploadError) {
      console.error('Error during file upload to AWS S3:', uploadError);
      res.status(500).json({ message: 'Error during file upload to AWS S3' });
    }
  });
};

export default uploadHandler;

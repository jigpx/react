import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const KEYFILEPATH = 'T:/AI/google drive api/react/client_secret_296455840054-cvkq3gv3201h5io3lopmp7k2ftar8ob4.apps.googleusercontent.com.json'; // Update with the path to your credentials.json file

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

// Ensure the uploads directory exists
const uploadDir = './public/uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer for file storage
const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
  const filePath = path.join(uploadDir, req.file.originalname);

  try {
    const fileMetadata = {
      name: req.file.originalname,
    };
    const media = {
      mimeType: req.file.mimetype,
      body: fs.createReadStream(filePath),
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });

    fs.unlinkSync(filePath); // Remove the file from the server after upload

    res.status(200).json({ fileId: response.data.id });
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error);
    res.status(500).json({ error: 'Error uploading file to Google Drive' });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;

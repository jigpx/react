// filepath: /t:/AI/github/react/pages/api/auth/google.js
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { code } = req.body;

    try {
      const { tokens } = await client.getToken(code);
      res.status(200).json(tokens);
    } catch (error) {
      console.error('Error exchanging code for tokens:', error);
      res.status(500).json({ error: 'Failed to exchange code for tokens' });
    }
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}
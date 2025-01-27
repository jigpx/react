// pages/index.js

import { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function Home() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle form submission (upload file)
  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send the file to the backend API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFileUrl(data.fileUrl); // Update the URL for the uploaded file
        alert('File uploaded successfully!');
      } else {
        alert('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  // Handle Google Sign-In success
  const handleLoginSuccess = async (response) => {
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: response.code }),
      });

      if (res.ok) {
        const tokens = await res.json();
        console.log('Tokens:', tokens);
        // You can use the tokens to get user information and make authenticated requests
      } else {
        console.error('Failed to exchange code for tokens');
      }
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
  };

  // Handle Google Sign-In failure
  const handleLoginFailure = (response) => {
    console.error('Login Failed:', response);
  };

  return (
    <GoogleOAuthProvider clientId="296455840054-cvkq3gv3201h5io3lopmp7k2ftar8ob4.apps.googleusercontent.com">
      <div>
        <h1>Upload Your Image or Video</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload File</button>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
          redirectUri="http://localhost:3000" // Ensure this matches the redirect URI in Google Developer Console
        />
        {fileUrl && (
          <div>
            <h2>Uploaded File:</h2>
            {fileUrl.endsWith('.mp4') || fileUrl.endsWith('.mov') || fileUrl.endsWith('.avi') ? (
              <video controls width="300">
                <source src={fileUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={fileUrl} alt="Uploaded file" width="300" />
            )}
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

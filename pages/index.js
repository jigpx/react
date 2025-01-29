import { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import styles from './index.module.css'; // Import CSS Module

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
      // Send the file to the API route that handles Google Drive upload
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFileUrl(`https://drive.google.com/uc?id=${data.fileId}`); // Update the URL for the uploaded file
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
      const res = await fetch('https://your-external-api.com/auth/google', {
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
      <div className={`${styles.topBar} ${styles.silkscreenFont}`}>
        <h1 className={styles.unicaOneFont}>Jigar Patel</h1>
        <div className={styles.topBarContent}>
          <ul>
            <li><a href="https://www.instagram.com/jigpx" target="_blank" rel="noopener noreferrer"><Image src="/images/instagram.svg" alt="Instagram" width={24} height={24} /></a></li>
            <li><a href="https://www.tiktok.com/@jigpx" target="_blank" rel="noopener noreferrer"><Image src="/images/tiktok.svg" alt="TikTok" width={24} height={24} /></a></li>
            <li><a href="https://www.youtube.com/@jigpx" target="_blank" rel="noopener noreferrer"><Image src="/images/youtube.svg" alt="YouTube" width={24} height={24} /></a></li>
            <li><a href="https://x.com/jigpx" target="_blank" rel="noopener noreferrer"><Image src="/images/x.svg" alt="X" width={24} height={24} /></a></li>
            <li><a href="https://www.threads.net/@jigpx" target="_blank" rel="noopener noreferrer"><Image src="/images/threads.svg" alt="Threads" width={24} height={24} /></a></li>
            <li><a href="https://www.patreon.com/@jigpx" target="_blank" rel="noopener noreferrer"><Image src="/images/patreon.svg" alt="Patreon" width={24} height={24} /></a></li>
            <li><a href="https://www.reddit.com/user/jigpx" target="_blank" rel="noopener noreferrer"><Image src="/images/reddit.svg" alt="Reddit" width={24} height={24} /></a></li>
            <li><a href="https://direct.me/jigpx" target="_blank" rel="noopener noreferrer"><Image src="/images/direct.me.svg" alt="Direct.me" width={24} height={24} /></a></li>
            <li><a href="mailto:anditsjig@gmail.com"><Image src="/images/gmail.svg" alt="Email" width={24} height={24} /></a></li>
          </ul>
        </div>
      </div>
      <div className={`${styles.container} ${styles.silkscreenFont}`}>
        <div>
          <div className={styles.uploadSection}>
            <h1 className={styles.header}>Upload Your Image or Video</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload File</button>
          </div>
          <div className={styles.googleSignInSection}>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
            />
          </div>
          {fileUrl && (
            <div>
              <h2 className={styles.header}>Uploaded File:</h2>
              {fileUrl.endsWith('.mp4') || fileUrl.endsWith('.mov') || fileUrl.endsWith('.avi') ? (
                <video controls width="300">
                  <source src={fileUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image src={fileUrl} alt="Uploaded file" width={300} height={300} />
              )}
            </div>
          )}
          {/* <div className={styles.instagramFeedSection}>
            <InstagramFeed />
          </div> */}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

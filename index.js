import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFileUrl(data.fileUrl); // Display uploaded file URL
        alert('File uploaded successfully!');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message); // Show the error from the server
        alert('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage('Error uploading file');
      alert('Error uploading file');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Your Image or Video</h1>
      <input 
        type="file" 
        onChange={handleFileChange} 
        className={styles.input} 
      />
      <button onClick={handleUpload} className={styles.button}>Upload File</button>

      {errorMessage && <div className={styles.error}>{errorMessage}</div>}

      {fileUrl && (
        <div className={styles.filePreview}>
          <h2>Uploaded File:</h2>
          {fileUrl.endsWith('.mp4') || fileUrl.endsWith('.mov') || fileUrl.endsWith('.avi') ? (
            <video controls width="300" className={styles.preview}>
              <source src={fileUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={fileUrl} alt="Uploaded" width="300" className={styles.preview} />
          )}
        </div>
      )}
    </div>
  );
}

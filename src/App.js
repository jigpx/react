import React, { useState } from 'react';
import './App.css';  // Your global CSS file
import InstagramFeed from './components/InstagramFeed/InstagramFeed';  // Import InstagramFeed component
import Image from 'next/image';

function App() {
  const [image, setImage] = useState(null);  // Store the image as a base64 string
  const [imageFile, setImageFile] = useState(null);  // Store the file object
  const [uploading, setUploading] = useState(false);  // Track if image is being uploaded
  const [uploadUrl, setUploadUrl] = useState(null);  // Store the uploaded image URL

  // Handle image selection
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the image preview as base64
        setImageFile(file); // Save the file object for uploading
      };
      reader.readAsDataURL(file); // Convert the image to base64 for preview
    }
  };

  // Handle the upload button click
  const handleUpload = () => {
    if (imageFile) {
      // Start the upload process
      setUploading(true);

      // Create a form to send the image to Cloudinary (using FormData)
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'preset-ai'); // Replace with your Cloudinary preset
      formData.append('cloud_name', 'dmje8coun'); // Replace with your Cloudinary cloud name

      // Upload the image to Cloudinary using fetch
      fetch('https://api.cloudinary.com/v1_1/dmje8coun/image/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setUploading(false);  // Stop the loading state
          if (data.secure_url) {
            setUploadUrl(data.secure_url); // Store the uploaded image URL
            alert('Image uploaded successfully!');
          } else {
            alert('Image upload failed!');
          }
        })
        .catch((error) => {
          setUploading(false);  // Stop the loading state
          console.error('Upload failed:', error);
          alert('Image upload failed');
        });
    } else {
      alert('Please select an image first!');
    }
  };

  return (
    <div className="App">
      <h1>Image Upload</h1>

      {/* Image upload input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="file-input"
      />

      {/* Show uploaded image preview */}
      {image && (
        <div className="image-preview-container">
          <h3>Preview of uploaded image:</h3>
          <Image src={image} alt="Uploaded Preview" width={500} height={500} className="image-preview" />
        </div>
      )}

      {/* Upload button */}
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>

      {/* Display uploaded image URL */}
      {uploadUrl && (
        <div>
          <h3>Uploaded Image URL:</h3>
          <a href={uploadUrl} target="_blank" rel="noopener noreferrer">
            {uploadUrl}
          </a>
        </div>
      )}

    
    </div>
  );
}

export default App;

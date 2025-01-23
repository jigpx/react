import React, { useState } from 'react';
import './App.css'; // Custom CSS for styling

function App() {
  const [image, setImage] = useState(null);

  // Function to handle the image input change
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);  // Store the image URL in state
      };
      reader.readAsDataURL(file);  // Read the file as a Data URL
    }
  };

  return (
    <div className="App">
      <h1>Derivative AI</h1>
      <div className="upload-container">
        <h2>Upload an Image</h2>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />
      </div>
      
      {image && (
        <div className="image-preview-container">
          <h3>Preview of uploaded image:</h3>
          <img src={image} alt="Uploaded" className="image-preview" />
        </div>
      )}
      
      <div className="background-lines"></div>
    </div>
  );
}

export default App;

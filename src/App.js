// src/App.js
import React from 'react';
import './App.css';
import GoogleSignIn from './GoogleSignIn'; // Import GoogleSignIn component

function App() {
  return (
    <div className="App">
      <h1>Welcome to My React App!</h1>
      <GoogleSignIn /> {/* Display Google Sign-In button */}
    </div>
  );
}

export default App;

// src/GoogleSignIn.js
import React, { useEffect, useState } from 'react';
import gapi from 'gapi-script';

const GoogleSignIn = () => {
  const [isLoaded, setIsLoaded] = useState(false);  // To track if Google API is loaded

  useEffect(() => {
    // Dynamically load the Google API script
    const script = document.createElement('script');
    script.src = "https://apis.google.com/js/api.js";
    script.async = true;
    script.onload = () => {
      gapi.load('client:auth2', initClient); // Initialize after loading
      setIsLoaded(true);  // Mark as loaded
    };
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initClient = () => {
    gapi.client.init({
      clientId: '296455840054-cvkq3gv3201h5io3lopmp7k2ftar8ob4.apps.googleusercontent.com',  // Replace with your OAuth Client ID
      scope: 'https://www.googleapis.com/auth/drive.file',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    });
  };

  const handleSignIn = () => {
    if (isLoaded) {
      const authInstance = gapi.auth2.getAuthInstance();
      authInstance.signIn().then(() => {
        const user = authInstance.currentUser.get();
        const authToken = user.getAuthResponse().access_token;
        console.log('User signed in:', user);
        console.log('Auth token:', authToken);
      });
    } else {
      console.log('Google API is still loading...');
    }
  };

  return (
    <div>
      <button onClick={handleSignIn} disabled={!isLoaded}>
        {isLoaded ? "Sign in with Google" : "Loading..."}
      </button>
    </div>
  );
};

export default GoogleSignIn;

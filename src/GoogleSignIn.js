// src/GoogleSignIn.js
import React, { useEffect, useState } from 'react';
import gapi from 'gapi-script';

const GoogleSignIn = () => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: '296455840054-cvkq3gv3201h5io3lopmp7k2ftar8ob4.apps.googleusercontent.com', // Replace with your OAuth Client ID
        scope: 'https://www.googleapis.com/auth/drive.file', // Adjust if needed
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
      });
    };

    gapi.load('client:auth2', initClient);
  }, []);

  const handleSignIn = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance.signIn().then(() => {
      const user = authInstance.currentUser.get();
      const token = user.getAuthResponse().access_token;
      console.log('User signed in:', user);
      console.log('Auth token:', token);
      setAuthToken(token);  // Store the access token in the state
    });
  };

  return (
    <div>
      <button onClick={handleSignIn}>Sign in with Google</button>
      {authToken && (
        <div>
          <h3>Signed in! Token received:</h3>
          <p>{authToken}</p> {/* Display the token, or use it for further API calls */}
        </div>
      )}
    </div>
  );
};

export default GoogleSignIn;

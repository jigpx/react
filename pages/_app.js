// pages/_app.js

import '../styles/globals.css';  // Your global styles here
import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <Component {...pageProps} />
    </React.StrictMode>
  );
}

export default MyApp;

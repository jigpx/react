// pages/_app.js

import '../styles/globals.css';  // Import global styles

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;  // Render each page with its props
}

export default MyApp;

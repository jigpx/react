import React, { useState, useEffect } from 'react';
import './InstagramFeed.css';  // Import the InstagramFeed styles

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const accessToken = 'YOUR_ACCESS_TOKEN'; // Replace with your actual access token (better handled in .env file)

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token=${accessToken}`);
        const data = await response.json();
        if (data.data) {
          setPosts(data.data);
        }
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
      }
    };

    fetchInstagramPosts();
  }, []);

  return (
    <div className="instagram-feed">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post">
            <img src={post.media_url} alt={post.caption} className="post-image" />
            <p className="post-caption">{post.caption}</p>
          </div>
        ))
      ) : (
        <p>Loading Instagram feed...</p>
      )}
    </div>
  );
};

export default InstagramFeed;

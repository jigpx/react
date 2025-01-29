import React, { useState, useEffect } from 'react';
import styles from './InstagramFeed.module.css'; // Import CSS Module
import Image from 'next/image';

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN; // Use environment variable

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type&access_token=${accessToken}`);
        const data = await response.json();
        if (data.data) {
          setPosts(data.data);
        }
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
      }
    };

    fetchInstagramPosts();
  }, [accessToken]);

  const truncateCaption = (caption) => {
    if (!caption) return ''; // Return an empty string if caption is undefined
    // Remove hashtags
    const captionWithoutHashtags = caption.replace(/#[\w-]+/g, '').trim();
    if (captionWithoutHashtags.length > 100) {
      return captionWithoutHashtags.substring(0, 100) + '...';
    }
    return captionWithoutHashtags;
  };

  return (
    <div className={styles.instagramFeed}>
      {posts.length > 0 ? (
        posts.slice(0, 6).map((post) => ( // Limit to 6 posts
          <div key={post.id} className={styles.post}>
            {post.media_type === 'IMAGE' ? (
              <Image src={post.media_url} alt={post.caption || 'Instagram post'} className={styles.postImage} width={500} height={500} />
            ) : post.media_type === 'VIDEO' ? (
              <video controls className={styles.postVideo}>
                <source src={post.media_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : null}
            <p className={styles.postCaption}>{truncateCaption(post.caption)}</p>
          </div>
        ))
      ) : (
        <p>Loading Instagram feed...</p>
      )}
    </div>
  );
};

export default InstagramFeed;

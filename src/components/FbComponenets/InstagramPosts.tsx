'use client';

import { useEffect, useState } from 'react';

interface InstagramPost {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  permalink: string;
  timestamp: string;
}

const InstagramPosts = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const accessToken = localStorage.getItem('fb_access_token');

        if (!accessToken) {
          setError('Access token is missing.');
          return;
        }

        const response = await fetch('/api/facebook/instagram-posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to fetch Instagram posts.');
          return;
        }

        const data = await response.json();
        setPosts(data.posts);
      } catch (err) {
        setError('Error fetching Instagram posts.');
      }
    };

    fetchInstagramPosts();
  }, []);

  return (
    <div>
      <h2>Instagram Posts</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.media_type === 'IMAGE' && (
              <img src={post.media_url} alt={post.caption} width="200" />
            )}
            {post.media_type === 'VIDEO' && (
              <video width="320" height="240" controls>
                <source src={post.media_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <p>{post.caption}</p>
            <p>
              <a href={post.permalink} target="_blank" rel="noopener noreferrer">
                View on Instagram
              </a>
            </p>
            <p>Posted on: {new Date(post.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstagramPosts;

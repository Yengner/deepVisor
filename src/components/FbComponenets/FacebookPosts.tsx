'use client';

import { useEffect, useState } from 'react';

interface Post {
  id: string;
  message: string;
  created_time: string;
}

const FacebookPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const accessToken = localStorage.getItem('fb_access_token');

        if (!accessToken) {
          setError('Access token is missing.');
          return;
        }

        const response = await fetch('/api/facebook/facebook-posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to fetch posts.');
          return;
        }

        const data = await response.json();
        setPosts(data.posts);
      } catch (err) {
        setError('Error fetching posts.');
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <p>{post.message}</p>
            <p>Created at: {new Date(post.created_time).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacebookPosts;

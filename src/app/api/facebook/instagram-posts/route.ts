import axios from 'axios';


export async function getInstagramPosts(accessToken: string) {
    try {
      const response = await axios.get(
        'https://graph.instagram.com/me/media',
        {
          params: {
            fields: 'id,caption,media_type,media_url,permalink,timestamp',
            access_token: accessToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching Instagram posts:', error);
      throw new Error('Failed to fetch Instagram posts.');
    }
  }
  
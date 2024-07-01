import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import api from '../../utils/api';
import PostDetail from '../../components/PostDetail';

interface PostPageProps {
  post: any;
  comments: any;
  user: any;
}

const PostPage: React.FC<PostPageProps> = ({ post, comments, user }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (post && post.user_id) {
      // Fetch user data if post and user_id are available
      api.get(`/users/${post.user_id}`)
        .then(response => {
          setUserData(response.data.data); // Set user data if fetched successfully
          setLoading(false); // Set loading to false once user data is fetched
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          setUserData('-'); // Set user data to '-' to indicate user not found
          setLoading(false); // Handle error by setting loading to false
        });
    } else {
      setLoading(false); // If no post or user_id, set loading to false
    }
  }, [post]); // Dependency on post changes

  return (
    <div>
      {loading ? (
        <p>Loading...</p> // Display loading indicator while fetching data
      ) : (
        <>
          {post && (
            <PostDetail post={post} comments={comments} user={userData !== '-' ? userData : null} />
          )}
          {!post && <p>Post not found</p>} {/* Display message if post not found */}
        </>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: any = context.params;

  let post = null;
  let comments = null;
  let user = null;

  try {
    // Fetch post and comments
    const [postResponse, commentsResponse] = await Promise.all([
      api.get(`/posts/${id}`),
      api.get(`/posts/${id}/comments`),
    ]);

    post = postResponse.data.data;
    comments = commentsResponse.data.data;

    // Fetch user data if post exists
    if (post && post.user_id) {
      const userResponse = await api.get(`/users/${post.user_id}`);
      user = userResponse.data.data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return {
    props: {
      post,
      comments,
      user,
    },
  };
};

export default PostPage;

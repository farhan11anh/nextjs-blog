import { GetServerSideProps } from 'next';
import api from '../../utils/api';
import PostDetail from '../../components/PostDetail';


interface PostPageProps {
  post: any;
  comments: any;
  user: any;
}

const PostPage = ({ post, comments, user }: PostPageProps) => {
  return <div>
    {post && user && <PostDetail post={post} comments={comments} user={user} />}
  </div>
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }:any = context.params;
  
  // const [postRes, commentsRes, userRes] = await Promise.all([
  //   api.get(`/posts/${id}`),
  //   api.get(`/posts/${id}/comments`),
  //   api.get(`/users/6990701`),
  // ]);

  let post;
  try {
    post = (await api.get(`/posts/${id}`)).data.data
  } catch (error) {
    error
  }
  let comments;
  try {
    comments = (await api.get(`/posts/${id}/comments`)).data.data
  } catch (error) {
    error
  }
  let users;
  try {
    users = (await api.get(`/users/6990701`)).data.data
  } catch (error) {
    error
  }

  // console.log('hasil users', userRes);
  

  return {
    props: {
      post: post,
      comments: comments,
      user: users,
    },
  };
};

export default PostPage;

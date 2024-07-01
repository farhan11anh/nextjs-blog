import { GetServerSideProps } from 'next';
import api from '../utils/api';
import PostList from '../components/PostList';

interface HomeProps {
  posts: any; // Replace 'any' with a more specific type according to your data structure
}

import { useRouter } from 'next/router';

const Home = ({ posts }: HomeProps) => {
  const router = useRouter();

  const handleDetailClick = (id: number) => {
    router.push(`/posts/${id}`);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <PostList posts={posts} handleDetailClick={handleDetailClick} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await api.get('/posts');
  return { props: { posts: res.data.data } };
};

export default Home;

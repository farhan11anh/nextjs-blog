import { GetServerSideProps } from 'next';
import api from '../utils/api';
import PostList from '../components/PostList';

interface HomeProps {
  posts: any; // Replace 'any' with a more specific type according to your data structure
  page: number;
  totalPages: number;
}

import { useRouter } from 'next/router';
import Pagination from '@/components/Pagination';

const Home = ({ posts, page, totalPages }: HomeProps) => {
  const router = useRouter();

  const handleDetailClick = (id: number) => {
    router.push(`/posts/${id}`);
  };

  const handlePageChange = (newPage: number) => {
    router.push(`/?page=${newPage}`);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <PostList posts={posts} handleDetailClick={handleDetailClick} />
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const page = parseInt(context.query.page as string) || 1;
  // const res = await api.get('/posts', {
  //   params: { page },
  // });

  const page = parseInt(context.query.page as string) || 1;
  const { title, body } = context.query;

  const params: any = { page };

  if (title) params.title = title;
  if (body) params.body = body;

  const res = await api.get('/posts', { params });

  const limit = 10; // Assuming 10 posts per page
  const totalPosts = res.data.meta.pagination.total; // Total number of posts
  const totalPages = Math.ceil(totalPosts / limit); // Calculate total number of pages

  return {
    props: {
      posts: res.data.data,
      page,
      totalPages,
    },
  };
};

export default Home;

import { GetServerSideProps } from 'next';
import api from '../utils/api';
import PostList from '../components/PostList';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Pagination from '@/components/Pagination';

interface HomeProps {
  posts: any; // Replace 'any' with a more specific type according to your data structure
  page: number;
  totalPages: number;
}


const Home = ({ posts, page, totalPages }: HomeProps) => {
  const router = useRouter();
  const [searchTitle, setSearchTitle] = useState<string>(
    Array.isArray(router.query.title) ? router.query.title[0] : router.query.title || ''
  );
  const [searchBody, setSearchBody] = useState<string>(
    Array.isArray(router.query.body) ? router.query.body[0] : router.query.body || ''
  );

  useEffect(() => {
    setSearchTitle(Array.isArray(router.query.title) ? router.query.title[0] : router.query.title || '');
    setSearchBody(Array.isArray(router.query.body) ? router.query.body[0] : router.query.body || '');
  }, [router.query.title, router.query.body]);

  const handleDetailClick = (id: number) => {
    router.push(`/posts/${id}`);
  };

  const handlePageChange = (newPage: number) => {
    const query = {
      page: newPage,
      ...(searchTitle && { title: searchTitle }),
      ...(searchBody && { body: searchBody }),
    };
    router.push({ pathname: '/', query });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = {
      page: router.query.page || '1', // Preserve the current page or reset to '1' if not present
      ...(searchTitle && { title: searchTitle }),
      ...(searchBody && { body: searchBody }),
    };
    router.push({ pathname: '/', query });
  };

  return (
    <div className='flex flex-col w-9/12 mx-auto' >
      <div className="flex flex-wrap justify-center">
        <form onSubmit={handleSearch} className="flex justify-center space-x-2">
          <input
            type="text"
            name="title"
            value={searchTitle}
            placeholder="Search by title"
            onChange={(e) => setSearchTitle(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 text-gray-600" // Modified style to have black text
          />
          <input
            type="text"
            name="body"
            value={searchBody}
            placeholder="Search by body"
            onChange={(e) => setSearchBody(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 text-gray-600" // Modified style to have black text
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Search
          </button>
        </form>

        <PostList posts={posts} handleDetailClick={handleDetailClick} />
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = parseInt(context.query.page as string) || 1;
  const { title, body } = context.query;

  const params: any = { page };

  if (title) params.title = title;
  if (body) params.body = body;

  try {
    const res = await api.get('/posts', { params });

    const limit = 10; // Assuming 10 posts per page
    const totalPosts = res.data.meta.pagination.total; // Total number of posts
    const totalPages = Math.ceil(totalPosts / limit); // Calculate total number of pages

    if (page > totalPages) {
      return {
        redirect: {
          destination: `/?page=${totalPages}${title ? `&title=${encodeURIComponent(title as string)}` : ''}${body ? `&body=${encodeURIComponent(body as string)}` : ''}`,
          permanent: false,
        },
      };
    }

    return {
      props: {
        posts: res.data.data,
        page,
        totalPages,
      },
    };
  } catch (error) {
    console.error('Error fetching posts:', error);

    // Handle the error gracefully, such as showing a fallback UI or redirecting to an error page
    return {
      props: {
        error: true, // Set an error flag or pass error information to the component
      },
    };
  }
};


export default Home;

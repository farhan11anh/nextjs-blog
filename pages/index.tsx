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
      {posts.map((post: any) => (
        <div key={post.id} style={{ width: '30%', margin: '10px', padding: '20px', backgroundColor: getRandomColor() }}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button style={{ backgroundColor: 'blue', color: 'white', padding: '10px', borderRadius: '5px', border: 'none' }} onClick={() => handleDetailClick(post.id)}>View Details</button>
        </div>
      ))}
    </div>
  );
};

function getRandomColor() {
  const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
  return colors[Math.floor(Math.random() * colors.length)];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await api.get('/posts');
  return { props: { posts: res.data.data } };
};

export default Home;

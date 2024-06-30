import React from 'react';
import Link from 'next/link';

type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

type Props = {
  posts: Post[];
};

const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.body}</p>
            <Link href={`/posts/${post.id}`}>
              <span className="text-blue-500 hover:underline" >Read more</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;

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
  handleDetailClick: (id: number) => void;
};

const PostList: React.FC<Props> = ({ posts, handleDetailClick }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Blog Posts</h1>
      <div className="grid grid-cols-3 gap-3">
        {posts.map((post) => (
          <div key={post.id} className="h-full">
            <div className="bg-white rounded-lg shadow p-4 pb-16 text-black h-full relative">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{post.body}</p>
              <div className="absolute bottom-0 left-0 p-4">                
                <button
                  className="text-blue-500 hover:underline bg-blue-200 rounded-lg px-4 py-2"
                  onClick={() => handleDetailClick(post.id)}
                >
                  Read more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;

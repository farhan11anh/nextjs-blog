import React from 'react';
import Image from 'next/image';

type Comment = {
  id: number;
  name: string;
  body: string;
};

type User = {
  id: number;
  name: string;
  email: string;
};

type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

type Props = {
  post: Post;
  comments: Comment[];
  user: User;
};

const PostDetail: React.FC<Props> = ({ post, comments, user }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white h-[90vh] rounded-lg shadow-md p-6">
        <div className="mb-8">
          <h1 className="text-2xl text-gray-600 font-bold mb-2 text-center">{post.title}</h1>
          <div className='flex flex-row justify-end' >
            <div className="text-gray-400"><span className='font-semibold' >Author </span> : {user.name} ({user.email}) </div>
          </div>
          {/* <Image
            className='rounded-lg shadow-md mx-auto'
            src="https://source.unsplash.com/technology/500x500"
            width={500}
            height={500}
            alt="Picture of the author"
          /> */}
          <div className="mt-5">
            <p className="text-gray-600">{post.body}</p>
          </div>
        </div>

        {/* <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Author</h2>
            <p className="text-gray-600">{user.name}</p>
            <p className="text-gray-600">Email: {user.email}</p>
          </div>
        </div> */}

        <div>
          <h3 className="text-lg text-gray-600 font-semibold mb-4">Comments</h3>
          {comments.length === 0 ? (
            <p className="text-gray-600">No comments exist.</p>
          ) : (
            <ul className="space-y-4">
              {comments.map((comment) => (
                <li key={comment.id} className="p-4 bg-gray-300 rounded">
                  <div className='text-gray-700 font-bold' >{comment.name}</div>
                  <p className="text-gray-800">
                    {comment.body}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

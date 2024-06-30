import React from 'react';

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
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="mb-4">{post.body}</p>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Author: {user.name}</h2>
        <p>Email: {user.email}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        <ul className="space-y-2">
          {comments.map((comment) => (
            <li key={comment.id} className="p-2 bg-gray-100 rounded">
              <p>
                <strong>{comment.name}:</strong> {comment.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostDetail;

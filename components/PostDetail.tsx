import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

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
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8} lg={6}> {/* Adjusted width for larger screens */}
        <Card variant="outlined" className="mt-8">
          <CardContent>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" align="right" gutterBottom>
              {user?.name ? `${user.name} ${user.email ? `(${user.email})` : ''}` : 'Author: -'}
            </Typography>
            <Typography variant="body1" align="justify" paragraph>
              {post.body}
            </Typography>
          </CardContent>
        </Card>

        <div className="mt-8 text-gray-600">
          <Typography variant="h5" component="h2" gutterBottom>
            Comments
          </Typography>
          {comments.length === 0 ? (
            <Typography variant="body1" color="textSecondary">
              No comments exist.
            </Typography>
          ) : (
            <ul className="space-y-4">
              {comments.map((comment) => (
                <li key={comment.id}>
                  <Card variant="outlined" className="p-4">
                    <Typography variant="subtitle1" className="font-bold" gutterBottom>
                      {comment.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {comment.body}
                    </Typography>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default PostDetail;

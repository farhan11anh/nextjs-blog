import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

type Props = {
  posts: Post[];
  handleDetailClick: (id: number) => void;
  error?: string; // Optional error message prop
};

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#2196f3',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#1976d2',
  },
}));

const PostList: React.FC<Props> = ({ posts, handleDetailClick, error }) => {
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold mb-4 text-red-600">{error}</h1>
      </div>
    );
  }



  if(posts) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold mb-4 text-gray-600">Blog Posts</h1>
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <StyledCard>
                <CardContent style={{ flex: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {post.title.length > 100 ? `${post.title.slice(0, 100)}...` : post.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {post.body.length > 100 ? `${post.body.slice(0, 100)}...` : post.body}
                  </Typography>
                </CardContent>
                <div style={{ textAlign: 'center', paddingTop: '16px', paddingBottom: '16px' }}>
                  <StyledButton variant="contained" onClick={() => handleDetailClick(post.id)}>
                    Read more
                  </StyledButton>
                </div>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </div>
    );

  }

  if (error || !posts) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold mb-4 text-gray-600">Data not found</h1>
      </div>
    );
  }
};

export default PostList;

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GOREST_API,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`,
  },
});

export default api;

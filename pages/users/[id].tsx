// pages/users/[id].tsx
import { GetServerSideProps, NextPage } from 'next';
import api from '../../utils/api'; // Adjust the import path to your API utility

interface UserDetailProps {
  user: {
    id: string;
    name: string;
    email: string;
    status: string;
  };
}

const UserDetail: NextPage<UserDetailProps> = ({ user }) => {
  return (
    <div>
      <h1>User Details</h1>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Status: {user.status}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }:any = context.params;
  const response = await api.get(`/users/${id}`);
  const user = response.data.data;
  console.log('hasil user', user);
  

  return {
    props: {
      user,
    },
  };
};

export default UserDetail;
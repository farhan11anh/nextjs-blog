import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import api from '../../utils/api';
import UserList from '../../components/UserList';
import UserForm from '../../components/UserForm';

interface UsersPageProps {
  users: any[]; // Ideally, define a more specific type than any[]
}

const UsersPage: React.FC<UsersPageProps> = () => {
  const [users, setUsers] = useState([]);
    // Function to fetch users
  const fetchUsers = async () => {
    const response = await api.get('/users');
    setUsers(response.data.data);
  };
  
  const handleSubmit = async (userData: { name: string; email: string, gender: string, status: string }) => {
    try {
      // Replace 'your/api/endpoint' with your actual API endpoint
      const response = await api.post('/users', userData);
      await fetchUsers();
      console.log('User created:', response.data);

      // Handle success (e.g., show a message, redirect, etc.)
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle error (e.g., show error message)
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Create User</h1>
      <UserForm onSubmit={handleSubmit} />
      <UserList users={users} />
    </div>
  );
};

export default UsersPage;

import React from 'react';
import Link from 'next/link';

type User = {
  id: number;
  name: string;
  email: string;
};

type Props = {
  users: User[];
};

const UserList: React.FC<Props> = ({ users }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id} className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p>Email: {user.email}</p>
            <Link href={`/users/${user.id}`}>
              <span className="text-blue-500 hover:underline" >View Details</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

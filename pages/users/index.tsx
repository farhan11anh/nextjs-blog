import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import api from '../../utils/api';
import UserList from '../../components/UserList';
import UserForm from '../../components/UserForm';
import Pagination from '../../components/Pagination';
import Modal from '../../components/Modal';
import DeleteModal from '../../components/DeleteModal';

const UsersPage: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  const fetchUsers = async (page: number, name: string = '') => {
    const response = await api.get(`/users?page=${page}&name=${name}`);
    setUsers(response.data.data);
    setTotalPages(response.data.meta.pagination.pages);
  };

  const handleSubmit = async (userData: { id?: number; name: string; email: string; gender: string; status: string }) => {
    try {
      if (userData.id) {
        await api.put(`/users/${userData.id}`, userData);
      } else {
        await api.post('/users', userData);
      }
      setIsModalOpen(false);
      await fetchUsers(currentPage, searchTerm);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleEdit = (user: { id: number; name: string; email: string; gender: string; status: string }) => {
    setModalData(user);
    setIsModalOpen(true);
  };

  const handleDelete = (userId: number) => {
    setDeleteUserId(userId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteUserId !== null) {
      try {
        await api.delete(`/users/${deleteUserId}`);
        setIsDeleteModalOpen(false);
        setDeleteUserId(null);
        await fetchUsers(currentPage, searchTerm);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  useEffect(() => {
    const page = parseInt(router.query.page as string, 10) || 1;
    const name = (router.query.name as string) || '';
    setCurrentPage(page);
    setSearchTerm(name);
    fetchUsers(page, name);
  }, [router.query.page, router.query.name]);

  const handlePageChange = (page: number) => {
    router.push(`/users?page=${page}&name=${searchTerm}`, undefined, { shallow: true });
    setCurrentPage(page);
    fetchUsers(page, searchTerm);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/users?page=1&name=${searchTerm}`, undefined, { shallow: true });
    setCurrentPage(1);
    fetchUsers(1, searchTerm);
  };

  return (
    <div className="container w-9/12 mx-auto p-4">
      <h1 className="text-2xl text-gray-600 font-bold mb-4">Users List</h1>
      <div className='flex flex-row justify-between' >
      <button
        onClick={() => {
          setModalData({});
          setIsModalOpen(true);
        }}
        className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      >
        Add User
      </button>
      <form onSubmit={handleSearchSubmit} className="mb-4 flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name"
          className="border border-gray-300 rounded-l py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-r py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>
      </div>

      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <UserForm onSubmit={handleSubmit} initialData={modalData} />
        </Modal>
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          message="Are you sure you want to delete this user?"
        />
      )}
    </div>
  );
};

export default UsersPage;

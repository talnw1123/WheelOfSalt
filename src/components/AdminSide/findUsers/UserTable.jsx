import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const UserTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const usersPerPage = 10;
  const startIndex = currentPage * usersPerPage;

  const filteredData = data.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedUsers = filteredData.slice(startIndex, startIndex + usersPerPage);

  const nextPage = () => {
    if (startIndex + usersPerPage < filteredData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(`http://localhost:4400/api/updateUser/${selectedUser._id}`, selectedUser);
      if (response.status === 200) {
        alert('User updated successfully');
      } else {
        alert('Failed to update user');
      }
    } catch (error) {
      alert('Error updating user: ' + error.message);
    }
    closeModal();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="ค้นหาโดย USERNAME หรือ EMAIL"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Username</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ยอดเงิน</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">สร้างเมื่อ (createAt)</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 min-h-table">
          {selectedUsers.map((user, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-black">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap text-black">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-black">{user.money}</td>
              <td className="px-6 py-4 whitespace-nowrap text-black">{new Date(user.createdAt).toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                <button
                  onClick={() => openModal(user)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  แก้ไข
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={previousPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
          disabled={currentPage === 0}
        >
          Previous Page
        </button>
        <button
          onClick={nextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
          disabled={startIndex + usersPerPage >= filteredData.length}
        >
          Next Page
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit User"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '500px', // Adjust width as needed
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        <h2 className="text-xl font-bold mb-4">แก้ไขผู้ใช้</h2>
        {selectedUser && (
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">ชื่อผู้ใช้ / Username</label>
              <input
                type="text"
                name="username"
                value={selectedUser.username}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">อีเมล / Email</label>
              <input
                type="email"
                name="email"
                value={selectedUser.email}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">จำนวนเงิน / Points</label>
              <input
                type="number"
                name="money"
                value={selectedUser.money}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">รหัสผ่าน / Password</label>
              <input
                type="password"
                name="password"
                value={selectedUser.password || ''}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
              >
                Save
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default UserTable;

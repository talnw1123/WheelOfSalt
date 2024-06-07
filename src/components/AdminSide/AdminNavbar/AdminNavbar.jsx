import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="bg-blue-900 text-white p-4 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Admin Panel</div>
        <ul className="flex flex-1 justify-evenly">
          <li>
            <Link to="/admin/dashboard" className="hover:text-yellow-300 transition duration-300">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/manageItem" className="hover:text-yellow-300 transition duration-300">
              จัดการสินค้า
            </Link>
          </li>
          <li>
            <Link to="/admin/manageUsers" className="hover:text-yellow-300 transition duration-300">
              จัดการผู้ใช้
            </Link>
          </li>
          <li>
            <Link to="/admin/manageTransactions" className="hover:text-yellow-300 transition duration-300">
              จัดการเติมเงิน
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;

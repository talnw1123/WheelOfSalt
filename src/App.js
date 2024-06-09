import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';

import Chest from './components/Chest/Chest';
import Dashboard from './components/AdminSide/dashBoard/Dashboard';
import UserTable from './components/AdminSide/findUsers/UserTable';
import ManageItem from './components/AdminSide/addItem/ManageItem';
import ManageTransaction from './components/AdminSide/transactions/ManageTransaction';
import RegisterForm from './components/Register/Register';
import Navbar from './components/Navbar/navbar';
import LoginForm from './components/Login/Login';
import AdminNavbar from './components/AdminSide/AdminNavbar/AdminNavbar';
import ProductDetail from './components/ProductDetail/ProductDetail';
import SlipHistoryForm from './components/SlipHistory/SlipHistory';

import './index.css';

import userState from './components/ีUserRecoil';
import { isTokenExpired } from './components/CheckToken';

const App = () => {
  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4400/api/getAllUsers');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (user.token) {
        if (isTokenExpired(user.token)) {
          setUser({ email: '', token: '' });
          localStorage.removeItem('user');
        }
      }
    }, 60000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, [user.token, setUser]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div> {/* ให้มี div หรือ fragment เพื่อครอบรอบ Navbar และ Hero */}
            <Navbar />
            <Chest />
          </div>} />
          <Route path="/register" element={<div> {/* ให้มี div หรือ fragment เพื่อครอบรอบ Navbar และ Hero */}
            <Navbar />
            <RegisterForm />
          </div>} />
          <Route path="/login" element={<div> {/* ให้มี div หรือ fragment เพื่อครอบรอบ Navbar และ Hero */}
            <Navbar />
            <LoginForm />
          </div>} />
          <Route path="/admin/dashboard" element={<div> {/* ให้มี div หรือ fragment เพื่อครอบรอบ Navbar และ Hero */}
            <AdminNavbar />
            <Dashboard />
          </div>} />
          <Route path="/admin/manageItem" element={<div> {/* ให้มี div หรือ fragment เพื่อครอบรอบ Navbar และ Hero */}
            <AdminNavbar />
            <ManageItem />
          </div>} />
          <Route path="/admin/manageUsers" element={<div> {/* ให้มี div หรือ fragment เพื่อครอบรอบ Navbar และ Hero */}
            <AdminNavbar />
            <UserTable data={users} />
          </div>} />
          <Route path="/admin/manageTransactions" element={<div> {/* ให้มี div หรือ fragment เพื่อครอบรอบ Navbar และ Hero */}
            <AdminNavbar />
            <ManageTransaction />
          </div>} />
          <Route path="/product/:id" element={<div> 
            <Navbar />
            <ProductDetail />
            </div>} /> 
          <Route path="/topup" element={<div> 
            <Navbar />
            <SlipHistoryForm/>
            </div>} /> 
            
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

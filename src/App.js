import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';

import Chest from './components/Chest/Chest';
import Dashboard from './components/AdminSide/dashBoard/Dashboard';
import UserTable from './components/AdminSide/findUsers/UserTable';
import ManageItem from './components/AdminSide/addItem/ManageItem';
import ManageTransaction from './components/AdminSide/transactions/ManageTransaction';
import RegisterForm from './components/Register/Register';
import Navbar from './components/Navbar/navbar';
import LoginForm from './components/Login/Login';
import AdminNavbar from './components/AdminSide/AdminNavbar/AdminNavbar';

import './index.css'


import userState from './components/ีUserRecoil';
import { isTokenExpired } from './components/CheckToken';

const mockData = [
  { username: 'user1', email: 'user1@example.com', amount: '100', createAt: '2023-01-01' },
  { username: 'user2', email: 'user2@example.com', amount: '200', createAt: '2023-01-02' },
  { username: 'user3', email: 'user3@example.com', amount: '300', createAt: '2023-01-03' },
  { username: 'user4', email: 'user4@example.com', amount: '400', createAt: '2023-01-04' },
  { username: 'user5', email: 'user5@example.com', amount: '500', createAt: '2023-01-05' },
  { username: 'user6', email: 'user6@example.com', amount: '600', createAt: '2023-01-06' },
  { username: 'user7', email: 'user7@example.com', amount: '700', createAt: '2023-01-07' },
  { username: 'user8', email: 'user8@example.com', amount: '800', createAt: '2023-01-08' },
  { username: 'user9', email: 'user9@example.com', amount: '900', createAt: '2023-01-09' },
  { username: 'user10', email: 'user10@example.com', amount: '1000', createAt: '2023-01-10' },
  { username: 'user11', email: 'user11@example.com', amount: '1100', createAt: '2023-01-11' },
  { username: 'user12', email: 'user12@example.com', amount: '1200', createAt: '2023-01-12' },
  { username: 'user13', email: 'user13@example.com', amount: '1300', createAt: '2023-01-13' },
  { username: 'user14', email: 'user14@example.com', amount: '1400', createAt: '2023-01-14' },
  { username: 'user15', email: 'user15@example.com', amount: '1500', createAt: '2023-01-15' },
  { username: 'user16', email: 'user16@example.com', amount: '1600', createAt: '2023-01-16' },
  { username: 'user17', email: 'user17@example.com', amount: '1700', createAt: '2023-01-17' },
  { username: 'user18', email: 'user18@example.com', amount: '1800', createAt: '2023-01-18' },
  { username: 'user19', email: 'user19@example.com', amount: '1900', createAt: '2023-01-19' },
  { username: 'user20', email: 'user20@example.com', amount: '2000', createAt: '2023-01-20' },
];

const App = () => {
  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);

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
            <Dashboard/>
          </div>} />

          <Route path="/admin/manageItem" element={<div> {/* ให้มี div หรือ fragment เพื่อครอบรอบ Navbar และ Hero */}
            <AdminNavbar />
            <ManageItem/>
          </div>} />

          <Route path="/admin/manageUsers" element={<div> {/* ให้มี div หรือ fragment เพื่อครอบรอบ Navbar และ Hero */}
            <AdminNavbar />
            <UserTable data={mockData}/>
          </div>} />

          <Route path="/admin/manageTransactions" element={<div> {/* ให้มี div หรือ fragment เพื่อครอบรอบ Navbar และ Hero */}
            <AdminNavbar />
            <ManageTransaction/>
          </div>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

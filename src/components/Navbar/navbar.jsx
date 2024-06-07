import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userState from '../ีUserRecoil';
import axios from 'axios';
import './navbar.css';

const Navbar = () => {
  const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (user.token) {
      fetchUsernameAndBalance();
    }
  }, [user.token]);

  const fetchUsernameAndBalance = async () => {
    try {
      const response = await axios.get('http://localhost:4400/api/users/username', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUsername(response.data.username);
      setBalance(response.data.money);
    } catch (error) {
      console.error('Error fetching username and balance:', error);
    }
  };

  const handleLogout = () => {
    setUser({ email: '', token: '' });
    localStorage.removeItem('user');
    setBalance(0);
  };

  const handleClick = (message) => {
    alert(message);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">หน้าหลัก</Link>
        </li>
        {user.token && (
          <li className="nav-item">
            <span className="nav-link">ยอดเงินคงเหลือ: {balance} บาท</span>
          </li>
        )}
        <li
          className="nav-item"
          onMouseEnter={() => setShowHistoryDropdown(true)}
          onMouseLeave={() => setShowHistoryDropdown(false)}
        >
          <a href="#history" className="nav-link">ประวัติ</a>
          {showHistoryDropdown && (
            <ul className="dropdown">
              {!user.token ? (
                <li className="dropdown-item" onClick={() => handleClick('โปรดล็อคอิน')}>โปรดล็อคอิน</li>
              ) : (
                <>
                  <li className="dropdown-item" onClick={() => handleClick('ประวัติเติมเงิน')}>ประวัติเติมเงิน</li>
                  <li className="dropdown-item" onClick={() => handleClick('ประวัติการซื้อสินค้า')}>ประวัติการซื้อสินค้า</li>
                </>
              )}
            </ul>
          )}
        </li>
        <li
          className="nav-item"
          onMouseEnter={() => setShowProfileDropdown(true)}
          onMouseLeave={() => setShowProfileDropdown(false)}
        >
          {!user.token ? (
            <Link to="/login" className="nav-link">ล็อกอิน</Link>
          ) : (
            <span className="nav-link">{username}</span>
          )}
          {showProfileDropdown && user.token && (
            <ul className="dropdown">
              <li className="dropdown-item" onClick={() => handleClick('โปรไฟล์')}>โปรไฟล์</li>
              <li className="dropdown-item" onClick={() => handleClick('เติมเงิน')}>เติมเงิน</li>
              <li className="dropdown-item" onClick={handleLogout}>Sign out</li>
            </ul>
          )}
        </li>
        {!user.token && (
          <li className="nav-item">
            <Link to="/register" className="nav-link">สมัครสมาชิก</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

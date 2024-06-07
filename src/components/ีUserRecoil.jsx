import { atom } from 'recoil';

// Initialize user state from localStorage if available
const getInitialUserState = () => {
  const savedUser = localStorage.getItem('user');
  return savedUser ? JSON.parse(savedUser) : { email: '', token: '' };
};

const userState = atom({
  key: 'userState',
  default: getInitialUserState(),
});

export default userState;

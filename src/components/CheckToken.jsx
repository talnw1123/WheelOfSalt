import { jwtDecode } from 'jwt-decode';

// Function to check if token is expired
export const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Consider token expired if there's an error decoding it
  }
};

const getToken = () => localStorage.getItem('token');
const clearToken = () => localStorage.removeItem('token');
const BACKEND_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}`;
import axios from "axios";


const getUser = () => {
  const token = getToken();
  if (!token) return null;

  try {

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (err) {
    console.error('Invalid token:', err.message);
    clearToken();
    return null;
  }
};

const signup = async (formData) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/users/signup`, formData)

    if (res.data.error) {
      throw new Error(res.data.error)
    }

    if (res.data.token) {
      localStorage.setItem('token', res.data.token)

      const user = JSON.parse(atob(res.data.token.split('.')[1]))
      return user
    }
    return res.data

  } catch (err) {
    console.log(err)
    throw err
  }
}

const signin = async (user) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/users/signin`, user)

    if (res.data.error) {
      throw new Error(res.data.error)
    }

    if (res.data.token) {
      localStorage.setItem('token', res.data.token)

      const user = JSON.parse(atob(res.data.token.split('.')[1]))
      return user
    }

  } catch (err) {
    console.log(err)
    throw err
  }
}

const signout = () => {
  clearToken();
};

const isAuthenticated = () => !!getToken();

export {
  signup,
  signin,
  signout,
  isAuthenticated,
  getUser
};

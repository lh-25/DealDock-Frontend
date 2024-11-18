// src/services/authService.js
// Helper function to store and get the token
const saveToken = (token) => localStorage.setItem('token', token);
const getToken = () => localStorage.getItem('token');
const clearToken = () => localStorage.removeItem('token');


const signup = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    if (json.err) {
      throw new Error(json.err);
    }
    return json;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  signup,
};

const signin = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    if (json.error) throw new Error(json.error);

    saveToken(json.token);
    return json;
  } catch (err) {
    console.log('Signin Error:', err);
    throw err;
  }
};

// Function to sign out a user
const signout = () => {
  clearToken();
  console.log('User signed out successfully');
};

// Function to check if user is authenticated
const isAuthenticated = () => !!getToken();

export {
  signup,
  signin,
  signout,
  isAuthenticated,
};
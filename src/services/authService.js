import BACKEND_URL from `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/users`;


const signup = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include', // Include cookies in the request
    });
    const json = await res.json();
    if (json.err) throw new Error(json.err);
    return json;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const signin = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include', // Include cookies in the request
    });
    const json = await res.json();
    if (json.error) throw new Error(json.error);
    return json;
  } catch (err) {
    console.log('Signin Error:', err);
    throw err;
  }
};

// Function to sign out a user
const signout = async () => {
  try {
    await fetch(`${BACKEND_URL}/users/signout`, {
      method: 'POST',
      credentials: 'include',
    });
    console.log('User signed out successfully');
  } catch (err) {
    console.log('Signout Error:', err);
  }
};
// Function to check if user is authenticated
const isAuthenticated = () => !!getToken();

export {
  signup,
  signin,
  signout,
  isAuthenticated,
};
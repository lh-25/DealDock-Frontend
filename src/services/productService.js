import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/products`;

const index = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const show = async (productId) => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(`${BASE_URL}/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const indexMyProducts = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(`${BASE_URL}/my-products`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const create = async (productFormData) => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.post(BASE_URL, productFormData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const createComment = async (productId, commentFormData) => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.post(`${BASE_URL}/${productId}/comments`, commentFormData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const deleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.delete(`${BASE_URL}/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const update = async (productId, productFormData) => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.put(`${BASE_URL}/${productId}`, productFormData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export {
  index,
  show,
  indexMyProducts,
  create,
  deleteProduct,
  update,
  createComment
}
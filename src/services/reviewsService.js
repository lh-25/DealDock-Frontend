//need index, create, update, and delete functions
import axios from 'axios'
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/reviews`


const index = async () => {
    try {
        const res = await axios.get(BASE_URL)
        return res.data
    }catch (err) {
        console.log(err)
    }
}

const createComment = async (formData) => {
    try {
        const res = await axios.post(BASE_URL, formData)
        return res.data
    } catch(err) {
        console.log(err)
    }
}

const createReview = async (userId,reviewFormData) => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post(`${BASE_URL}/${userId}/reviews`, reviewFormData,{
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

const update = async (formData, reviewId) => {
    try{
        const res = await axios.put(`${BASE_URL}/${reviewId}`, formData)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

const deleteReview = async (reviewId) => {
    try {
        const res = await axios.delete(`${BASE_URL}/${reviewId}`)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export { 
    index,
    createReview,
    createComment,
    update,
    deleteReview
}
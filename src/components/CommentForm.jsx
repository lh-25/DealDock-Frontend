import React, { useState } from 'react'
import axios from 'axios'

function CommentForm({ productId, onCommentAdded }) {
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
   
      const response = await axios.post(`/ProductList/${productId}/comments`, { text })
      
     
      setText('')
      if (onCommentAdded) onCommentAdded(response.data)
    } catch (err) {
      console.error(err)
      setError('Failed to add comment. Please try again.')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your comment here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows="4"
        ></textarea>
        <button type="submit">Add Comment</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default CommentForm

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import CommentForm from './CommentForm'

const ProductDetails = ({ products }) => {
  const { id } = useParams()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentPrice, setCurrentPrice] = useState(null)
  const [newBid, setNewBid] = useState('')

  useEffect(() => {
    
    const localProduct = products.find((product) => product._id === id)

    if (localProduct) {
      setSelectedProduct(localProduct)
      setCurrentPrice(localProduct.price)
      setLoading(false)
    } else {
      
      axios
        .get(`http://localhost:3002/products/${id}`)
        .then((response) => {
          setSelectedProduct(response.data)
          setCurrentPrice(response.data.price)
        })
        .catch((error) => {
          console.error('Error fetching product:', error)
        })
        .finally(() => setLoading(false))
    }
  }, [id, products])

  const handleBidSubmit = (e) => {
    e.preventDefault()

    const bidValue = parseFloat(newBid)

    if (isNaN(bidValue) || bidValue <= currentPrice) {
      alert('Please enter a bid higher than the current price.')
      return
    }

    setCurrentPrice(bidValue)
    setNewBid('')
  }

  if (loading) {
    return <p>Loading product details...</p>
  }

  if (!selectedProduct) {
    return <p>Product not found</p>
  }

  return (
    <div className="product-details">
      <h2>{selectedProduct.name}</h2>
      <div className="product-image">
        <img src={selectedProduct.imgURL} alt={selectedProduct.name} />
      </div>
      <div className="product-info">
        <dl>
          {selectedProduct.seller ? (
            <>
              <dt>Seller:</dt>
              <dd>{selectedProduct.seller.username}</dd>
            </>
          ) : null}
          <dt>Description:</dt>
          <dd>{selectedProduct.description}</dd>
          <dt>Current Price:</dt>
          <dd>${currentPrice.toFixed(2)}</dd>
        </dl>
      </div>
      <form onSubmit={handleBidSubmit}>
        <label htmlFor="bidInput">Place Your Bid:</label>
        <input
          type="number"
          id="bidInput"
          value={newBid}
          onChange={(e) => setNewBid(e.target.value)}
          step="0.01"
          placeholder="Enter your bid"
        />
        <button type="submit">Submit Bid</button>
      </form>
      <div className="product-comments">
        <h3>Comments</h3>
        {selectedProduct.comments && selectedProduct.comments.length > 0 ? (
          <ul>
            {selectedProduct.comments.map((comment) => (
              <li key={comment._id}>
                <p>
                  <strong>{comment.author?.username || 'Anonymous'}:</strong>{' '}
                  {comment.text}
                </p>
                <small>
                  Posted on {new Date(comment.createdAt).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
        <CommentForm productId={id} />
      </div>
    </div>
  )
}

export default ProductDetails

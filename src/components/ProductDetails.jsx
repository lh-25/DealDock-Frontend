import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentForm from './CommentForm'

const ProductDetails = ({ products }) => {
  const { productId } = useParams()

 
  const selectedProduct = products.find(
    (product) => product._id === productId
  )

  if (!selectedProduct) {
    return <p>Product not found</p>
  }

  const [currentPrice, setCurrentPrice] = useState(selectedProduct.price)
  const [newBid, setNewBid] = useState('')

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
                <p><strong>{comment.author?.username || "Anonymous"}:</strong> {comment.text}</p>
                <small>Posted on {new Date(comment.createdAt).toLocaleString()}</small> 
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
       
        <CommentForm productId={productId} />
      </div>
    </div>
  )
}

export default ProductDetails

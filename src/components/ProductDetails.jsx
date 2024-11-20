import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import CommentForm from './CommentForm'

const ProductDetails = () => {
  const { id } = useParams()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newBid, setNewBid] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        setSelectedProduct(response.data)
      } catch (error) {
        console.error('Error fetching product:', error);
        if (error.response?.status === 403) {
          alert('You are not authorized to view this product.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleBidSubmit = async (e) => {
    e.preventDefault();

    const bidValue = parseFloat(newBid);
    if (isNaN(bidValue) || bidValue <= (selectedProduct?.currentBid || selectedProduct.startingBid)) {
      alert('Please enter a bid higher than the current bid or starting price.')
      return
    }

    try {
      const response = await axios.patch(
        `http://localhost:3002/products/${id}/bid`,
        { bid: bidValue },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSelectedProduct(response.data);
      setNewBid('')
    } catch (error) {
      console.error('Error submitting bid:', error)
      if (error.response?.status === 403) {
        alert('You are not authorized to submit a bid. Please log in or provide a valid token.')
      } else {
        alert('An error occurred while submitting your bid. Please try again.')
      }
    }
  };

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
          <dt>Seller:</dt>
          <dd>{selectedProduct.seller.username || 'Unknown'}</dd>
          <dt>Description:</dt>
          <dd>{selectedProduct.description}</dd>
          <dt>Starting Price:</dt>
          <dd>${selectedProduct.startingBid.toFixed(2)}</dd>
          <dt>Current Bid:</dt>
          <dd>${(selectedProduct.currentBid || selectedProduct.startingBid).toFixed(2)}</dd>
          <dt>Buy Now Price:</dt>
          <dd>${selectedProduct.buyNowPrice.toFixed(2)}</dd>
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
                  <strong>{comment.author?.username || 'Anonymous'}:</strong> {comment.text}
                </p>
                <small>
                  Posted on {new Date(comment.createdAt).toLocaleString()}
                </small>
                {comment.replies.length > 0 && (
                  <ul>
                    {comment.replies.map((reply) => (
                      <li key={reply._id}>
                        <p>
                          <strong>{reply.author?.username || 'Anonymous'}:</strong> {reply.text}
                        </p>
                        <small>
                          Posted on {new Date(reply.createdAt).toLocaleString()}
                        </small>
                      </li>
                    ))}
                  </ul>
                )}
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
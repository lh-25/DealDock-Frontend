import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

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
    </div>
  )
}

export default ProductDetails

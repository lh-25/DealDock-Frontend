import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ProductList = () => {
    const [products, setProducts] = useState ([]);

    useEffect (() => {
        axios.get ('http://localhost:3002/products')
        .then (response => setProducts (response.data))
        .catch (error => console.error('Error getting products:', error))

    }, []);
 }
 
 return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <Link to={`/products/${product.id}`}>
            <img src={product.imgURL} alt={product.name} className="product-image" />
            <div className="product-info">
              <p>{product.name}</p>
              <p>{product.price}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
  
  export default ProductList 
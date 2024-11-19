import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import SellerReviewForm from './ReviewForm';


const ProductList = ({ seller, user }) => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3002/my-products`)
      .then(response => setProducts(response.data))
      if (!products) return "no products"
      .catch(error => console.error('Error fetching products:', error));
  }, [seller]);

  const handleAddProductClick = () => {
    setSelectedProduct(null);
    setIsModalVisible(true);
  };

  const handleEditProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleAddReviewClick = () => {
    setIsReviewModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setIsReviewModalVisible(false);
  };

  return (
    <div className="product-list">
      <h2>Your Products</h2>
      <button onClick={handleAddProductClick}>Add New Product</button>
      <button onClick={handleAddReviewClick}>Leave a Review</button>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div onClick={() => handleEditProductClick(product)}>
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <p>{product.name}</p>
                <p>{product.price}</p>
              </div>
            </div>
            <button onClick={() => handleEditProductClick(product)}>Edit Product</button>
          </div>
        ))}
      </div>

      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>X</button>
            <ProductForm 
              selected={selectedProduct}
              handleAddProduct={(product) => {
                setProducts([...products, product]);
                handleCloseModal();
              }}
              handleUpdateProduct={(updatedProduct, productId) => {
                setProducts(products.map(product => product.id === productId ? updatedProduct : product));
                handleCloseModal();
              }}
            />
          </div>
        </div>
      )}

      {isReviewModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>X</button>
            <SellerReviewForm 
              sellerId={sellerId} 
              user={user}
              onSubmit={(review) => {
                handleCloseModal();
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;

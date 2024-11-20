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
    axios.get('http://localhost:3002/my-products')
      .then(response => {
        if (response.data.length === 0) {
          setProducts([]);
        } else {
          setProducts(response.data);
        }
      })
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

  const handleAddProduct = (product) => {
    setProducts(prevProducts => [...prevProducts, product]);
    handleCloseModal();
  };

  const handleUpdateProduct = (updatedProduct, productId) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? updatedProduct : product
      )
    );
    handleCloseModal();
  };

  return (
    <div className="product-list">
      <h2>Your Products</h2>
      <button onClick={handleAddProductClick}>Add New Product</button>
      <button onClick={handleAddReviewClick}>Leave a Review</button>
      <div className="product-grid">
        {products.map((product, index) => (
          <div key={product.id || index} className="product-card">
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
              handleAddProduct={handleAddProduct}
              handleUpdateProduct={handleUpdateProduct}
            />
          </div>
        </div>
      )}

      {isReviewModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>X</button>
            <SellerReviewForm
              sellerId={seller.id} // Assuming seller has an 'id' property
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

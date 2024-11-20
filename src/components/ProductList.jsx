import { useEffect, useState } from 'react';
import ProductForm from './ProductForm';
import SellerReviewForm from './ReviewForm';
import * as productService from '../services/productService';

const ProductList = ({ seller, user }) => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productService.indexProductsbySeller();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [seller]);

  const handleAddProductClick = () => {
    setSelectedProduct(null);
    setIsModalVisible(true);
  };

  const handleEditProductClick = async (product) => {
    try {
      const productData = await productService.show(product.id);
      setSelectedProduct(productData);
      setIsModalVisible(true);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleAddReviewClick = () => {
    setIsReviewModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setIsReviewModalVisible(false);
  };

  const handleAddProduct = async (product) => {
    try {
      const newProduct = await productService.create(product);
      setProducts(prevProducts => [...prevProducts, newProduct]);
      handleCloseModal();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateProduct = async (updatedProduct, productId) => {
    try {
      const updated = await productService.update(productId, updatedProduct);
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === productId ? updated : product
        )
      );
      handleCloseModal();
    } catch (error) {
      console.error('Error updating product:', error);
    }
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

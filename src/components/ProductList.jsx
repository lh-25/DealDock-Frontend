import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import * as productService from '../services/productService';
import './ProductList.css'

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

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
  }, [props.seller]);

  const handleAddProductClick = () => {
    setSelectedProduct(null);
    setIsModalVisible(true);
  };

  const handleEditProductClick = async (product) => {
    const productId = product.id || product._id;
    if (!productId) {
      console.error('Invalid product data:', product);
      return;
    }

    try {
      const productData = await productService.show(productId);
      setSelectedProduct(productData);
      setIsModalVisible(true);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleProductClick = (product) => {
    const productId = product.id || product._id;
    navigate(`/productDetails/${productId}`);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleAddProduct = async (product) => {
    try {
      const newProduct = await productService.create(product);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      handleCloseModal();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateProduct = async (updatedProduct, productId) => {
    try {
      const updated = await productService.update(productId, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId || product._id === productId ? updated : product
        )
      );
      handleCloseModal();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await productService.deleteProduct(productId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId && product._id !== productId)
      );
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="product-list">
      <h2>Your Products</h2>
      <button onClick={handleAddProductClick}>Add New Product</button>
      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ProductForm
              selected={selectedProduct}
              handleAddProduct={handleAddProduct}
              handleUpdateProduct={handleUpdateProduct}
              handleCloseModal={handleCloseModal}
            />
          </div>
        </div>
      )}
      <div className="product-grid">
        {products.map((product, index) => (
          <div key={product.id || product._id || index} className="product-card">
            <div onClick={() => handleProductClick(product)}>
              <img src={product.imgURL} alt={product.name} className="product-image" />
              <div className="product-info">
                <p>{product.name}</p>
                <p>${product.buyNowPrice}</p>
              </div>
            </div>
            <button onClick={() => handleEditProductClick(product)}>Edit Product</button>
            <button onClick={() => handleDeleteProduct(product.id || product._id)}>Delete Product</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

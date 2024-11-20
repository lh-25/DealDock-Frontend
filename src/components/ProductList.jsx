import { useContext, useEffect, useState } from 'react';
import { AuthedUserContext } from '../App';
import axios from 'axios';
import ProductForm from './ProductForm';
import SellerReviewForm from './ReviewForm';
import { Link, useParams } from 'react-router-dom';

const ProductList = ({ seller, myProducts, handleDeleteProduct }) => {
  const {productId} = useParams()
  const {user} = useContext(AuthedUserContext)
  // const [products, setProducts] = useState([]);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState(null);
  // const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);

  // useEffect(() => {
  //   axios.get('http://localhost:3002/my-products')
  //     .then(response => {
  //       if (response.data.length === 0) {
  //         setProducts([]); // handle the empty product scenario
  //       } else {
  //         setProducts(response.data);
  //       }
  //     })
  //     .catch(error => console.error('Error fetching products:', error));
  // }, [seller]);

  // const handleAddProductClick = () => {
  //   setSelectedProduct(null);
  //   setIsModalVisible(true);
  // };

  // const handleEditProductClick = (product) => {
  //   setSelectedProduct(product);
  //   setIsModalVisible(true);
  // };

  // const handleAddReviewClick = () => {
  //   setIsReviewModalVisible(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalVisible(false);
  //   setIsReviewModalVisible(false);
  // };

  return (
    <main>
    {myProducts.map((myproduct) => (
      <div key={myproduct._id}>
        <article>
          <header>
            <h2>{myproduct.name}</h2>
            <p>
              {myproduct.seller.username} posted on
              {new Date(myproduct.createdAt).toLocaleDateString()}
            </p>
          </header>
          <p>${myproduct.buyNowPrice}</p>
        </article>
        {myproduct.seller._id === user._id && (
          <>
          <Link to={'/editProduct/:id'}>Edit</Link>
          <button onClick={() => handleDeleteProduct(productId)} >Delete</button>
          </>
        )}
        
      </div>
     
    ))}

    <ProductForm  />
  </main>
  )
}
export default ProductList;

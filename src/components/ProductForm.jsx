import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as productService from '../services/productService';

const ProductForm = (props) => {
  const { productId } = useParams();
  const initialState = {
    name: '',
    description: '',
    buyNowPrice: '',
    startingBid: '',
    imgURL: ''
  };

  const [formData, setFormData] = useState(props.selected ? props.selected : initialState);

  useEffect(() => {
    const getProduct = async () => {
      const productData = await productService.show(productId);
      if (productData) {
        setFormData({
          name: productData.name || '',
          description: productData.description || '',
          buyNowPrice: productData.buyNowPrice || '',
          startingBid: productData.startingBid || '',
          imgURL: productData.imgURL || ''
        });
      }
    };

    if (productId) getProduct();
  }, [productId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmitForm = (evt) => {
    evt.preventDefault();

    const missingFields = [];
    if (!formData.name) missingFields.push('Name');
    if (!formData.description) missingFields.push('Description');
    if (!formData.buyNowPrice) missingFields.push('Buy Now Price');
    if (!formData.startingBid) missingFields.push('Starting Bid');
    if (!formData.imgURL) missingFields.push('Image URL');

    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (props.selected) {
      props.handleUpdateProduct(formData, props.selected.id || props.selected._id);
    } else {
      props.handleAddProduct(formData);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <h1>{props.selected || productId ? 'Edit Product' : 'New Product'}</h1>
        
        <label htmlFor="name"> Name </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <label htmlFor="description"> Description </label>
        <input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        
        <label htmlFor="buyNowPrice"> Buy Now Price </label>
        <input
          id="buyNowPrice"
          name="buyNowPrice"
          value={formData.buyNowPrice}
          onChange={handleChange}
        />
        
        <label htmlFor="startingBid"> Starting Bid </label>
        <input
          id="startingBid"
          name="startingBid"
          value={formData.startingBid}
          onChange={handleChange}
        />
        
        <label htmlFor="imgURL"> Image URL </label>
        <input
          id="imgURL"
          name="imgURL"
          value={formData.imgURL}
          onChange={handleChange}
        />
        
        <button type="submit">{props.selected || productId ? 'Update Product' : 'Add New Product'}</button>
      </form>
    </div>
  );
};

export default ProductForm;

// src/components/PetForm.jsx

import { useState } from 'react';

const ProductForm = (props) => {
  const initialState = {
    name: '',
    description: '',
    price: '',
    imgURL: '',
    seller: ''
  }
  // formData state to control the form
  const [formData, setFormData] = useState(props.selected ? props.selected : initialState)

  // handleChange function to update formData state
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

const handleSubmitForm = (evt) => {
    evt.preventDefault()
    if (props.selected) {
      props.handleUpdateProduct(formData, props.selected._id)
    } else {
      props.handleAddProduct(formData)
    }

    setFormData({ name: '',
        description: '',
        price: '',
        imgURL: '',
        seller: ''})
}

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
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
        <label htmlFor="price"> Price </label>
        <input
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <label htmlFor="imgURL"> Image URL </label>
        <input
          id="imgURL"
          name="imgURL"
          value={formData.imgURL}
          onChange={handleChange}
        />
        <label htmlFor="seller"> Seller </label>
        <input
          id="Seller"
          name="Seller"
          value={formData.Seller}
          onChange={handleChange}
        />
        <button type="submit">{props.selected ? 'Update Product' : 'Add New Product'}</button>
      </form>
    </div>
  );
};

export default ProductForm;
import { useState, useEffect, createContext } from 'react'
import './App.css'

import { Routes, Route, useNavigate } from 'react-router-dom'

import AccountCreation from './components/AccountCreation'
import Shop from './components/Shop'
import LandingPage from './components/LandingPage'
import NavBar from './components/NavBar'
import ProductDetails from './components/ProductDetails'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import NotFound from './components/NotFound'

import * as authService from './services/authService'

import * as productService from './services/productService'

export const AuthedUserContext = createContext()

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [products, setProducts] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    const fetchProducts = async () => {
      if (user) {
        const productData = await productService.index();
        setProducts(productData);
      }
    }
    fetchProducts()
  }, [])


  const handleLogout = () => {
    authService.signout()
    setUser(null)
  }


  const handleAddProduct = async (productFormData) => {
    const newProduct = await productService.create(productFormData)
    setProducts([newProduct, ...products])
    navigate('/products')
  }


  const handleUpdateProduct = async (productId, productFormData) => {
    const updatedProduct = await productService.update()
    setProducts(products.map((product) => (productId === product._id ? updatedProduct : product)))
    navigate(`/productDetails/${productId}`)
  }

  const handleDeleteProduct = async (productId) => {
    const deletedProduct = await productService.deleteProduct(productId)
    setProducts(products.filter((product) => product._id !== deletedProduct._id))
    navigate('/products')
  }

  return (
    <AuthedUserContext.Provider value={{ user, handleLogout }}>
      <div>
        <NavBar user={user} handleLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={<LandingPage setUser={setUser} />} />
          <Route path="/Shop" element={<Shop products={products} user={user} />} />
          <Route path="/AccountCreation" element={<AccountCreation setUser={setUser} />} />
          <Route
            path="/products"
            element={<ProductList products={products} handleAddProduct={handleAddProduct} handleDeleteProduct={handleDeleteProduct} />}
          />
          <Route
            path="/productDetails/:id"
            element={
              <ProductDetails
                products={products}

              />
            }
          />
          <Route
            path="/addProduct"
            element={<ProductForm handleAddProduct={handleAddProduct} />}
          />
          <Route
            path="/editProduct/:id"
            element={
              <ProductForm
                selected={products.find(
                  (product) => product._id === window.location.pathname.split('/').pop()
                )}
                handleUpdateProduct={handleUpdateProduct}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthedUserContext.Provider>
  )
}

export default App

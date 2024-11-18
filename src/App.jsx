import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import AccountCreation from './components/AccountCreation'
import Dashboard from './components/Dashboard'
import LandingPage from './components/LandingPage'
import NavBar from './components/NavBar'
import ProductDetails from './components/ProductDetails'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import ReviewForm from './components/ReviewForm'
import NotFound from './components/NotFound'

import { authService } from './services/authService'
import * as productService from './services/productService'

export const AuthedUserContext = React.createContext()

const App = () => {
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await authService.getUser()
      setUser(loggedInUser)
    }

    fetchUser()
  }, [])


  useEffect(() => {
    const fetchProducts = async () => {
      const productData = await productService.index()
      setProducts(productData)
      if (user) {
        fetchProducts()
      }
    }
  }, [user])

  const handleLogin = async (email, password) => {
    try {
      const loggedInUser = await authService.login(email, password)
      setUser(loggedInUser)
    } catch (error) {
      console.error("Login failed", error)
    }
  }


  const handleLogout = () => {
    authService.logout()
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
    <AuthedUserContext.Provider value={{ user, handleLogin, handleLogout }}>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={user ? <Dashboard products={products} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<AccountCreation onLogin={handleLogin} />} />
          <Route path="/products" element={<ProductList products={products} handleDeleteProduct={handleDeleteProduct} />} />
          <Route
            path="/productDetails/:id"
            element={
              <ProductDetails
                products={products}

                renderReviewForm={(sellerId) => (
                  <ReviewForm sellerId={sellerId} onSubmit={(review) => console.log(review)} />
                )}
              />
            }
          />
          <Route
            path="/addProduct"
            element={
              <ProductForm
                handleAddProduct={handleAddProduct}
              />
            }
          />
          <Route
            path="/editProduct/:id"
            element={
              <ProductForm
                selected={products.find((product) => product._id === window.location.pathname.split('/').pop())}
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

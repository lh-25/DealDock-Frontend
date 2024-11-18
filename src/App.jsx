import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'

import AccountCreation from './components/AccountCreation'
import Dashboard from './components/Dashboard'
import LandingPage from './components/LandingPage'
import NavBar from './components/NavBar'
import ProductDetails from './components/ProductDetails'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import ReviewForm from './components/ReviewForm'
import NotFound from './components/NotFound'

import { authService } from './authService'
import axios from 'axios'

export const AuthedUserContext = React.createContext()

const App = () => {
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])
  

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await authService.getUser()
      setUser(loggedInUser)
    }

    fetchUser()
  }, [])

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/ProductList')
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  
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

 
  const handleAddProduct = async (newProduct) => {
    try {
      const response = await axios.post('/ProductList', newProduct)
      setProducts((prevProducts) => [...prevProducts, response.data])
    } catch (error) {
      console.error("Error adding product:", error)
    }
  }

 
  const handleUpdateProduct = async (updatedProduct, productId) => {
    try {
      const response = await axios.put(`/ProductList/${productId}`, updatedProduct)
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? response.data : product
        )
      )
    } catch (error) {
      console.error("Error updating product:", error)
    }
  }

  return (
      <AuthedUserContext.Provider value={{ user, handleLogin, handleLogout }}>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={user ? <Dashboard products={products} /> : <Navigate to="/login" />} />
            <Route path="/login" element={<AccountCreation onLogin={handleLogin} />} />
            <Route path="/products" element={<ProductList products={products} />} />
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

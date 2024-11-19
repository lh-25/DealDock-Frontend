import { useState, useEffect, createContext } from 'react'
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

import * as authService  from './services/authService'

import * as productService from './services/productService'

export const AuthedUserContext = createContext()

const App = () => {
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])
  const navigate = useNavigate()


  const fetchUser = () => {
    const currentUser = authService.getUser();
    if (currentUser) {
      setUser(currentUser);
    } else {
      console.log('No valid user found.');
    }
  };

  useEffect(() => {
    fetchUser();
  }, [])


  useEffect(() => {
    const fetchProducts = async () => {
      if(user) {
        const productData = await productService.index();
        setProducts(productData);
      }
    }
    fetchProducts()
  })

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
          <Route path="/" element={<LandingPage setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard products={products} user={user} />} />
          <Route path="/login" element={<AccountCreation setUser={setUser} />} />
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

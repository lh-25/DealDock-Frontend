import { useState, useEffect, createContext } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import AccountCreation from './components/AccountCreation'
import BuyerDashboard from './components/Dashboard'
import LandingPage from './components/LandingPage'
import NavBar from './components/NavBar'
import ProductDetails from './components/ProductDetails'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import ReviewForm from './components/ReviewForm'
import * as authService from './services/authService'
import * as productService from './services/productService'


export const AuthedUserContext = createContext(null)

const App = () => {

  const [user, setUser] = useState(authService.getUser)
  const [reviews, setReviews] = useState([])
  const [products, setProducts] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    const getAllProducts = async () => {
      const productData = await productService.index()
      setProducts(productData)
    }
    if (user) {
      getAllProducts
    }
  }, [user])


  return (

    <AuthedUserContext.Provider value={user}>
        <div>
          <Header />
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard  products={products}/>} />
            <Route path="/products" element={<ProductDetails />} />
            <Route path="/product/:id" element={<ProductList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
    </AuthedUserContext.Provider>

  )
}

export default App
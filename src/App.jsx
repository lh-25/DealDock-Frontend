import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route} from 'react-router-dom'
import AccountCreation from './components/AccountCreation'
import BuyerDashboard from './components/BuyerDashboard'
import LandingPage from './components/LandingPage'
import NavBar from './components/NavBar'
import ProductDetails from './components/ProductDetails'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import SellerDashboard from './components/SellerDashboard'
import ReviewForm from './components/ReviewForm'


const App = () => {

  const [ user, setUser ] = useState(authService.getUser)
  const [ reviews, setReviews ] = useState([])
  const [ products, setProducts ] = useState([])
  const [ selectedProducts, setSelectedProducts ] = useState([])
  const [ isFormOpen, setIsFormOpen ] = useState(false)


  return (
    <Router>
      <div>
        <Header /> 
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductDetails />} />
          <Route path="/product/:id" element={<ProductList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
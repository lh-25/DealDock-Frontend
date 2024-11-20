import { useState, useEffect, createContext } from 'react'
import './App.css'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import MyProducts from './components/MyProducts'
import AccountCreation from './components/AccountCreation'
import Shop from './components/Shop'
import LandingPage from './components/LandingPage'
import NavBar from './components/NavBar'
import ProductDetails from './components/ProductDetails'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import ReviewForm from './components/ReviewForm'
import NotFound from './components/NotFound'

import * as authService from './services/authService'

import * as productService from './services/productService'

export const AuthedUserContext = createContext()

const App = () => {
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])
  const [myProducts, setMyProducts] = useState([])
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
    const getMyProducts = async () => {
      try {
        const ProductsData = await productService.indexMyProducts()
        setMyProducts(ProductsData)

      } catch (error) {
        console.log('Error fetching my products', error)
      }
    }
    if (user) {
      getMyProducts()
    }
  }, [user])

  useEffect(() => {
    const fetchProducts = async () => {
      if (user) {
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
    authService.signout()
    setUser(null)
  }


  const handleAddProduct = async (productFormData) => {
    const newProduct = await productService.create(productFormData)
    setProducts([newProduct, ...products])
    navigate('/Shop')
  }


  const handleUpdateProduct = async (productId, productFormData) => {
    const updatedProduct = await productService.update(productFormData, productId)
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
        <NavBar user={user} handleLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={<LandingPage setUser={setUser} />} />
          <Route path="/Shop" element={<Shop products={products} user={user} />} />
          <Route path="/AccountCreation" element={<AccountCreation setUser={setUser} />} />
          <Route path="/my-products" element={<MyProducts myProducts={myProducts} />} />
          {/* <Route path="/products/:productId" element={<ProductDetails handleDeleteProduct={handleDeleteProduct} />} /> */}
          <Route path="/products/new" element={<ProductForm handleAddProduct={handleAddProduct} />} />
          <Route path="/products/:productId/edit" element={<ProductForm handleUpdateProduct={handleUpdateProduct} />} />
          {/* <Route
            path="/my-products"
            element={myProducts ? (
              <ProductList myProducts={myProducts} handleAddProduct={handleAddProduct} handleDeleteProduct={handleDeleteProduct} />
            ) : (
              <div>Loading...</div>
            )}
          /> */}
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
          {/* <Route
            path="/add-product"
            element={<ProductForm handleAddProduct={handleAddProduct} />}
          />
          <Route
            path="/editProduct/:id"
            element={<ProductForm handleUpdateProduct={handleUpdateProduct} />}
          />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </AuthedUserContext.Provider>
  )
}

export default App

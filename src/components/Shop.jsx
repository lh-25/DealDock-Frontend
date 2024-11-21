import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthedUserContext } from '../App'
import '../Shop.css'

export default function Shop({ products }) {
  const { user } = useContext(AuthedUserContext)

  return (
    <main >
      <h1>Shop the best deals, {user.username}!</h1>
     <div className='productGrid'>
            {products.map((product) => (
        <Link key={product._id} to={`/productDetails/${product._id}`}>
          <div className='productContainer'>
            <img src={product.imgURL} alt='product image' />
            <h2 className='productName'>{product.name}</h2>
            <p className='price'> ${product.buyNowPrice}</p>
          </div>
        </Link>
      ))}
      </div>
    </main>
  )
}
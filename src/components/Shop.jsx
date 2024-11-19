import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthedUserContext } from '../App'

export default function Shop({ products }) {
  const { user } = useContext(AuthedUserContext)

  return (
    <main>
      <h1>Welcome to DealDock {user.username}</h1>
      {products.map((product) => (
        <Link key={product._id} to={`/productDetails/${product._id}`}>
          <div>
            <img src={product.imgURL} alt='product image' />
            <h2>{product.name}</h2>
            <p> ${product.buyNowprice}</p>
          </div>
        </Link>
      ))}
    </main>
  )
}
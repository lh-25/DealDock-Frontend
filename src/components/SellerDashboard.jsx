import { useContext } from 'react'
import { AuthedUserContext } from '../../App'
import { Link } from 'react-router-dom'

export default function SellerDashboard({ products }) {
  const user = useContext(AuthedUserContext)
  return (
    <main>
      <h1>Welcome to DealDock {user.username}</h1>
      {products.map((product) => (
        <Link key={product._id} to={`/products/${product._id}`}>
          <div>
            <img src={product.imgURL} alt='product image' />
            <h2>{product.name}</h2>
            <p> ${product.price}</p>
          </div>
        </Link>
      ))}
    </main>
  )
}
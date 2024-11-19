import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthedUserContext } from '../App'

export default function Dashboard({ products }) {
  const user = useContext(AuthedUserContext)

  return (
    <main>
      <h1>Welcome to DealDock {user.username}</h1>
      {products.map((product) => (
        <Link key={product._id} to={`/productsDetails/${product._id}`}>
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
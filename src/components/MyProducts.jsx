
import { Link } from "react-router-dom"

export default function MyProducts ({myProducts}) {

  return (
    <main>
    {myProducts.map((myproduct) => (
      <Link key={myproduct._id} to={`/productDetails/${myproduct._id}`}>
        <article>
          <header>
            <h2>{myproduct.name}</h2>
            <p>
              {myproduct.seller.username} posted on
              {new Date(myproduct.createdAt).toLocaleDateString()}
            </p>
          </header>
        </article>
      </Link>
    ))}
  </main>
  )
}
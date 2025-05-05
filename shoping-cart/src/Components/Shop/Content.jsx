import { useEffect, useState } from 'react'
import { ProductCard } from './ProductCard'
import styles from '../../Styles/Shop/Shop.module.css'

const Content = ({ cart }) => {
  const [products, setProducts] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetch('https://fakestoreapi.com/products')
        const jsonData = await data.json()
        console.log(jsonData)
        setProducts(jsonData)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (error) return <p>An Error Occured</p>
  if (loading) return <p>Loading...</p>

  return (
    <div className={styles['shop-content']}>
      {products.map((product) => (
        <ProductCard
          cart={cart}
          key={product.id}
          id={product.id}
          imageUrl={product.image}
          title={product.title}
          description={product.description}
          price={product.price}
        />
      ))}
    </div>
  )
}

export { Content }

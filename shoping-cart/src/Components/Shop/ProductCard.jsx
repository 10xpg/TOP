import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../../Styles/Shop/Shop.module.css'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import PropTypes from 'prop-types'

const ProductCard = ({ id, imageUrl, title, description, price, cart }) => {
  const [quantity, setQuantity] = useState(0)

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value))
  }

  const handlePlusClick = () => {
    setQuantity((quantity) => quantity + 1)
  }

  const handleMinusClick = () => {
    if (quantity !== 0) {
      setQuantity((quantity) => quantity - 1)
    }
  }

  const handleAddToCart = () => {
    if (quantity > 0) {
      const item = {
        id: id,
        title: title,
        price: price * quantity,
        quantity: quantity
      }
      cart.setCartItems([...cart.cartItems, item])
    }
  }

  return (
    <div className={styles.card}>
      <div>
        <img src={imageUrl} alt={title} />
      </div>
      <div className={styles['product-info-container']}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>
          <p>{description}</p>
        </div>
        <div>
          <p>GH¢ {price}</p>
        </div>
        <div className={styles.qty}>
          <span>
            <label htmlFor='qty'>Qty: </label>
            <button type='button'>
              <FontAwesomeIcon icon={faMinus} onClick={handleMinusClick} />
            </button>
            <input type='number' name='qty' id='qty' placeholder='0' value={quantity} onChange={handleQuantityChange} min='0' />
            <button type='button'>
              <FontAwesomeIcon icon={faPlus} onClick={handlePlusClick} />
            </button>
          </span>
        </div>
        <div className={styles['add-to-cart']}>
          <button className={styles.btn} type='button' onClick={handleAddToCart}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}

export { ProductCard }

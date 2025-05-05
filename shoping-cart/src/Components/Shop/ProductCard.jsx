import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../../Styles/Shop/Shop.module.css'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import PropTypes from 'prop-types'

const ProductCard = ({ imageUrl, title, description, price }) => {
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
          <button type='button'>
            <FontAwesomeIcon icon={faMinus} onClick={handleMinusClick} />
          </button>

          <span>
            <label htmlFor='qty'>Qty: </label>
            <input type='number' name='qty' id='qty' placeholder='0' value={quantity} onChange={handleQuantityChange} min='0' />
          </span>
          <button type='button'>
            <FontAwesomeIcon icon={faPlus} onClick={handlePlusClick} />
          </button>
        </div>
        <div className={styles['add-to-cart']}>
          <button className={styles.btn} type='button'>
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

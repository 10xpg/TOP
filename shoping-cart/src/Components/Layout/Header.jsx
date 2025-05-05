import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import styles from '../../Styles/Layout/Header.module.css'
import PropTypes from 'prop-types'

const Navbar = () => {
  return (
    <nav className={styles.navlinks}>
      <Link to='/'>Home</Link>
      <Link to='/shop'>Shop</Link>
    </nav>
  )
}

const Logo = () => {
  return <div className={styles.logo}>TABERNA</div>
}

const Cart = ({ cart }) => {
  const handleCartClick = () => {
    const dialog = document.querySelector('dialog')
    dialog.showModal()
  }

  const handleCartClose = () => {
    const dialog = document.querySelector('dialog')
    dialog.close()
  }

  return (
    <div className={styles.cart}>
      <FontAwesomeIcon icon={faShoppingCart} onClick={handleCartClick} />
      <small>{cart.length}</small>
      <dialog className={styles.modal}>
        <div className={styles.close}>
          <button type='button' onClick={handleCartClose}>
            x
          </button>
        </div>
        <ul>
          {cart.map((item) => {
            return (
              <li key={item.id}>
                <div>Item: {item.title}</div>
                <div>Quantity: {item.quantity}</div>
                <div>Price: GH¢ {item.price}</div>
              </li>
            )
          })}
        </ul>
        <div className={styles.checkout}>
          Total: {cart.reduce((accumulator, item) => accumulator + item.price, 0)}
          <button type='button'>checkout</button>
        </div>
      </dialog>
    </div>
  )
}

const Header = ({ cart }) => {
  return (
    <header className={styles.header}>
      <Logo />
      <Navbar />
      <Cart cart={cart} />
    </header>
  )
}

export { Header }

Header.propTypes = {
  cart: PropTypes.array
}

Cart.propTypes = {
  cart: PropTypes.array
}

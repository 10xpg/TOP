import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import styles from '../../Styles/Layout/Header.module.css'

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

const Cart = () => {
  return (
    <div className={styles.cart}>
      <FontAwesomeIcon icon={faShoppingCart} />
    </div>
  )
}

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <Navbar />
      <Cart />
    </header>
  )
}

export { Header }

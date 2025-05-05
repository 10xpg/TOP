import { Outlet } from 'react-router-dom'
import { Footer, Header } from './Components/Layout'
import { useState } from 'react'

function App() {
  const [cartItems, setCartItems] = useState([])

  return (
    <>
      <Header cart={cartItems} />
      <Outlet context={{ cartItems, setCartItems }} />
      <Footer />
    </>
  )
}

export default App

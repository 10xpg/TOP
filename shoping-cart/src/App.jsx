import { Outlet } from 'react-router-dom'
import { Footer, Header } from './Components/Layout'

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App

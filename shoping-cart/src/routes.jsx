import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Home from './Pages/home/page'
import Shop from './Pages/shop/page'
import ErrorPage from './Pages/error/page'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: '/shop', element: <Shop /> }
    ]
  }
])

export default routes

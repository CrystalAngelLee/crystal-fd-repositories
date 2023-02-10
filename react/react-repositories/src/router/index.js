import { createBrowserRouter } from 'react-router-dom'
import App from '../pages/excel'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404</div>,
  },
])

export default router

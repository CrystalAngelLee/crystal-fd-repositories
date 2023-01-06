import { createBrowserRouter } from 'react-router-dom'

import App from '../pages/account'
import Statistics from '../pages/account/pages/statistics'
import Mine from '../pages/account/pages/mine'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404</div>,
    children: [
      {
        path: 'mine',
        element: <Mine />,
      },
      {
        path: '/statistics',
        element: <Statistics />,
      },
    ],
  },
])

export default router

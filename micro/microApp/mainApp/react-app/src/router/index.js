import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Vue3 from '../pages/Vue3Box'
import React18 from '../pages/React18Box'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <div>404</div>,
    children: [
      {
        path: 'vue3',
        element: <Vue3 />,
      },
      {
        path: 'react18',
        element: <React18 />,
      },
    ],
  },
])

export default router

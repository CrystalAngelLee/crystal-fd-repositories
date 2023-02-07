import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Vue3 from '../pages/Vue3'
import React18 from '../pages/React18'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <div>404</div>,
  },
  {
    path: 'react18',
    element: <React18 />,
  },
  {
    path: 'vue3',
    element: <Vue3 />,
  },
])

export default router

import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/home'

const React18 = lazy(() =>
  import(/* webpackChunkName: "react18" */ '../pages/React18')
)
const Vue3 = lazy(() => import(/* webpackChunkName: "vue3" */ '../pages/Vue3'))

const router = createBrowserRouter([
  {
    path: '/*',
    element: <Home />,
    errorElement: <div>404</div>,
    children: [
      {
        path: 'react18/*',
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <React18 />
          </Suspense>
        ),
      },
      {
        path: 'vue3/*',
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <Vue3 />
          </Suspense>
        ),
      },
    ],
  },
])

export default router

import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Home from '../pages/home'

const About = lazy(() =>
  import(/* webpackChunkName: "about" */ '../pages/about')
)
const Detail = lazy(() =>
  import(/* webpackChunkName: "detail" */ '../pages/detail')
)

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
      children: [
        {
          path: '/about',
          element: (
            <Suspense fallback={<div>loading</div>}>
              <About />
            </Suspense>
          ),
        },
        {
          path: 'detail/:id',
          element: (
            <Suspense fallback={<div>loading</div>}>
              <Detail />
            </Suspense>
          ),
        },
      ],
    },
  ],
  {
    basename: window.__MICRO_APP_BASE_ROUTE__ || '/',
  }
)

export default router

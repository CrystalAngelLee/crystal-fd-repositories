import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Loading } from '../components'
import Home from '../pages.m/Home'

const Record = lazy(() => import(/* webpackChunkName: "record" */ '../pages.m/Record'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <div>404</div>,
  },
  {
    path: '/record',
    element: (
      <Suspense fallback={<Loading />}>
        <Record />
      </Suspense>
    )
  }
], { basename: '/m' })

export default router

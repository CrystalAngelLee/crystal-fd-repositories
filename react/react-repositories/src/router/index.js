import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Loading } from '../components'
import Main from '../pages/Main'

const Excel = lazy(() =>
  import(/* webpackChunkName: "excel" */ '../pages/Excel')
)
const UserPath = lazy(() =>
  import(/* webpackChunkName: "userPath" */ '../pages/UserPath')
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <div>404</div>,
    children: [
      {
        path: 'excel',
        element: (
          <Suspense fallback={<Loading />}>
            <Excel />
          </Suspense>
        ),
      },
      {
        path: 'userpath',
        element: (
          <Suspense fallback={<Loading />}>
            <UserPath />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: <div>选择对应的功能进行测试吧</div>,
      },
    ],
  },
])

export default router

import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/home/App'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
      children: [
        // {
        //   path: 'team',
        //   element: <Team />,
        //   loader: teamLoader,
        // },
      ],
    },
  ],
  {
    basename: window.__MICRO_APP_BASE_ROUTE__ || '/',
  }
)

export default router

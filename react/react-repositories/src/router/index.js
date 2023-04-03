import { createBrowserRouter } from 'react-router-dom'
import App from '../pages/excel'
import Canvas from '../pages/canvas'
import AnalysisPath from '../pages/analysisPath'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AnalysisPath />,
    errorElement: <div>404</div>,
  },
  {
    path: '/canvas',
    element: <Canvas />,
    errorElement: <div>404</div>,
  },
  {
    path: '/excel',
    element: <App />,
    errorElement: <div>404</div>,
  },
])

export default router

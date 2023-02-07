import { Suspense, lazy } from 'react'
import { Link, Outlet, Routes, Route } from 'react-router-dom'

const React18 = lazy(() =>
  import(/* webpackChunkName: "react18" */ './React18')
)

function App() {
  return (
    <div className="App">
      hello everyone! this is main project with react18
      <div>
        <Link to="/">基座</Link>
      </div>
      <div>
        <Link to="/vue3">Vue3</Link>
      </div>
      <div>
        <Link to="/react18">React 子应用</Link>
      </div>
      <Outlet />
      <Routes>
        <Route
          path="/react18"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <React18 />
            </Suspense>
          }
        />
      </Routes>
    </div>
  )
}

export default App

import { Link, Outlet } from 'react-router-dom'

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
    </div>
  )
}

export default App

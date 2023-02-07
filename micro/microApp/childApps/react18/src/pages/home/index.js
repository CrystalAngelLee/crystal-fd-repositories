import { Link, Outlet } from 'react-router-dom'
import './App.css'
import logo from './logo.svg'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">
          <img src={logo} alt="" />
        </div>
        <Link to="/about">about</Link>
        <Link to="/detail/11">detail11</Link>
        <Link to="/detail/33">detail33</Link>
      </header>
      <Outlet />
    </div>
  )
}

export default App

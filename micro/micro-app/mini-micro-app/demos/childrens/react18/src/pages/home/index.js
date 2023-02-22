import { useEffect } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import logo from './logo.svg'

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // 接收基座传递的数据
    function dataListener(data) {
      if (data.path) {
        navigate(data.path)
      }
    }
    if (window.__MICRO_APP_ENVIRONMENT__) {
      window.microApp.addDataListener(dataListener)
    }
    return () => {
      if (window.__MICRO_APP_ENVIRONMENT__) {
        // 解绑监听函数
        window.microApp.removeDataListener(dataListener)
        // 清空当前子应用的所有绑定函数(全局数据函数除外)
        window.microApp.clearDataListener()
      }
    }
  }, [])

  useEffect(() => {
    if (window.microApp) {
      window.microApp.dispatch({
        path: location.pathname,
      })
    }
  }, [location.pathname])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Link className="App-link" to="/about">
          about
        </Link>
        <Link className="App-link" to="/detail/11">
          detail11
        </Link>
        <Link className="App-link" to="/detail/33">
          detail33
        </Link>
      </header>
      <body className="App-body">
        <Outlet />
      </body>
    </div>
  )
}

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { LOCATION } from './utils'
import pcrouter from './router'
import mbrouter from './router/index.m'
import reportWebVitals from './reportWebVitals'
import './styles/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

const router = LOCATION.isMobile() ? mbrouter : pcrouter

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

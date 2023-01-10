import React from 'react'
import { Link, BrowserRouter } from 'react-router-dom'

const Navbar = () => {
  return (
    <BrowserRouter>
      <Link to="/">@single-spa/welcome</Link>&nbsp;
      <Link to="/noframe">@mic-demo/noframe</Link>&nbsp;
      <Link to="/reactframe">@mic-demo/reactframe</Link>&nbsp;
      <Link to="/vueframe">@mic-demo/vueframe</Link>
    </BrowserRouter>
  )
}

export default Navbar

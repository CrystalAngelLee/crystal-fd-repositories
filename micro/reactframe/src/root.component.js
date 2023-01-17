import React from 'react'
import Parcel from "single-spa-react/parcel"
import { Link, Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'

const Root = () => {
  return (
    <BrowserRouter basename="/reactframe">
      <header>
        <Parcel config={System.import("@mic-demo/navbar")} />
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </header>
      <Switch>
        <Route path='/' exact><Home/></Route>
        <Route path='/about'><About/></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Root

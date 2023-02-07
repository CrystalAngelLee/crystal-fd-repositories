import React from 'react'
import { Link } from 'react-router-dom'

const Vue3 = () => {
  return (
    <div>
      <Link to="/">返回</Link>
      <micro-app name="vue3" url="http://localhost:3312/" baseroute="/vue3" />
    </div>
  )
}

export default Vue3

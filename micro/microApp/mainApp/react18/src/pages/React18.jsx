import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const React18Box = () => {
  return (
    <div>
      <Link to="/">返回</Link>
      <micro-app
        name="react18"
        url="http://localhost:3311/"
        baseroute="/react18"
      />
    </div>
  )
}

export default memo(React18Box)

import React, { memo, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import microApp from '@micro-zoe/micro-app'

const React18Box = () => {
  const location = useLocation()

  useEffect(() => {
    microApp.setData('react18', {
      path: location.pathname.replace('/react18', ''),
    })
  }, [location.pathname])

  return (
    <div>
      <micro-app
        name="react18"
        url="http://localhost:3311/"
        baseroute="/react18"
      />
    </div>
  )
}

export default memo(React18Box)

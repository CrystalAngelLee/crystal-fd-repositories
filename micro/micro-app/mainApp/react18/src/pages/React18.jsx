import React, { memo, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import microApp from '@micro-zoe/micro-app'
import { DEMOPORT } from '../../../../config'

const React18Box = () => {
  const location = useLocation()

  useEffect(() => {
    microApp.setData('react18', {
      path: location.pathname.replace('/react18', ''),
    })
  }, [location.pathname])

  console.log('DEMOPORT.CHILDREACT18', DEMOPORT.CHILDREACT18)
  return (
    <div>
      <micro-app
        name="react18"
        url={`http://localhost:${DEMOPORT.CHILDREACT18}/`}
        baseroute="/react18"
      />
    </div>
  )
}

export default memo(React18Box)

import React, { memo, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import microApp from '@micro-zoe/micro-app'
import { DEMOPORT } from '../../../../config'

const React18Box = () => {
  const location = useLocation()
  const curLocation = useMemo(
    () => location.pathname.replace('/react18', ''),
    [location.pathname]
  )

  useEffect(() => {
    microApp.setData('react18', {
      path: curLocation,
    })
  }, [curLocation])

  return (
    <div>
      <micro-app
        // 兼容问题 https://github.com/micro-zoe/micro-app/issues/849
        name={`react18${curLocation}`}
        url={`http://localhost:${DEMOPORT.CHILDREACT18}/`}
        baseroute="/react18"
      />
    </div>
  )
}

export default memo(React18Box)

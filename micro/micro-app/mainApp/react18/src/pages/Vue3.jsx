import { useEffect, memo } from 'react'
import { useLocation } from 'react-router-dom'
import microApp from '@micro-zoe/micro-app'
import { DEMOPORT } from '../../../../config'

const Vue3 = () => {
  const location = useLocation()

  useEffect(() => {
    microApp.setData('vue3', {
      path: location.pathname.replace('/vue3', ''),
    })
  }, [location.pathname])

  return (
    <div>
      <micro-app
        name="vue3"
        url={`http://localhost:${DEMOPORT.CHILDVUE3}/`}
        baseroute="/vue3"
      />
    </div>
  )
}

export default memo(Vue3)

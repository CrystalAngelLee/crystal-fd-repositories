import React from 'react'

const Vue3Box = () => {
  const onError = (...args) => {
    console.log('args', args)
  }
  return (
    <div>
      Vue3
      {/* <micro-app
        name="vue3"
        url="http://localhost:3310/"
        baseroute="/vue3"
        onError={onError}
      /> */}
    </div>
  )
}

export default Vue3Box

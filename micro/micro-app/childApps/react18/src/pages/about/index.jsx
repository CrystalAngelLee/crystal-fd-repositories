import React, { useState } from 'react'

const About = () => {
  const [blobImg, setBlobImg] = useState('')
  /**
   * 测试问题 https://github.com/micro-zoe/micro-app/issues/851
   * 测试结果 访问正常
   */
  console.log('blobImg', blobImg, '---window', window)
  return (
    <div>
      About
      <input
        type="file"
        name="getFile"
        value=""
        onChange={(e) => {
          const src = URL.createObjectURL(e.target.files[0])
          setBlobImg(src)
        }}
      />
      <img src={blobImg} alt="" />
    </div>
  )
}

export default About

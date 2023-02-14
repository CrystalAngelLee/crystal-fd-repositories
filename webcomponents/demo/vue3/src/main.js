import { createApp } from 'vue'
import App from './App.vue'
import {
  FcTypingInput,
  FcDblWarpBtn,
  Fc3DBtn,
  FcUnderlineBtn,
  FcPixelBtn,
  FcParenthesisBtn,
  FcRoundBtn,
  FcArrowBtn,
  FcWarpBtn,
  FcBubbles,
  FcChina
} from 'fancy-components'

// 想用哪个组件 在这里 new 一下就可以了 相当于注册全局组件
/* eslint-disable no-new */
new FcTypingInput()
new FcDblWarpBtn()
new Fc3DBtn()
new FcUnderlineBtn()
new FcPixelBtn()
new FcParenthesisBtn()
new FcRoundBtn()
new FcArrowBtn()
new FcWarpBtn()
new FcBubbles()
new FcChina()

createApp(App).mount('#app')

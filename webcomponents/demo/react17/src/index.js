import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
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
} from 'fancy-components';

// 想用哪个组件 在这里 new 一下就可以了 相当于注册全局组件
new FcTypingInput();
new FcDblWarpBtn();
new Fc3DBtn();
new FcUnderlineBtn();
new FcPixelBtn();
new FcParenthesisBtn();
new FcRoundBtn();
new FcArrowBtn();
new FcWarpBtn();
new FcBubbles();
new FcChina();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

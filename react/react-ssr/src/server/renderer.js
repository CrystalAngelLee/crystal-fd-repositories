import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import routes from "../share/routes";
import serialize from "serialize-javascript";

export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path}>{renderRoutes(routes)}</StaticRouter>
    </Provider>
  );
  // 使用 serialize 防范XSS攻击
  const initalState = serialize(store.getState());
  return `
    <html>
      <head>
        <title>React SSR</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script>window.INITIAL_STATE = ${initalState} </script>
        <script src='bundle.js'></script>
      </body>
    </html>
  `;
};

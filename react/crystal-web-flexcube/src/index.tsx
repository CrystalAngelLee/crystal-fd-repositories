import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Routers from "./routes";
// import reportWebVitals from "./reportWebVitals";
import "./styles/global.css";

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
window.BASEROUTE = "/";

function render(props: any = {}) {
  ReactDOM.render(
    <React.StrictMode>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </DndProvider>
    </React.StrictMode>,
    props.container
      ? props.container.querySelector("#root")
      : document.getElementById("root")
  );
}
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {}
export async function mount(props: any) {
  window.BASEROUTE = "/flexcube";
  render(props);
}
export async function unmount(props: any) {
  ReactDOM.unmountComponentAtNode(
    props.container
      ? props.container.querySelector("#root")
      : document.getElementById("root")
  );
}

import { createBrowserRouter } from "react-router-dom";
import App from "../pages/excel";
import Canvas from "../pages/canvas";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Canvas />,
    errorElement: <div>404</div>,
  },
  {
    path: "/excel",
    element: <App />,
    errorElement: <div>404</div>,
  },
]);

export default router;

import React from "react";
import { useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import Loading from "../pubcomp/Loading";
import Home from "../pages/CanvasList";
import Element from "../pages/elements";
import { RootStoreContext, rootStore as store } from "../store";

const Canvas = React.lazy(
  () =>
    import(
      /* webpackChunkName: "canvas" */
      "../pages/Canvas"
    )
);

const Routers = () => {
  const routes: RouteObject[] = [
    {
      path: window.BASEROUTE,
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "elements",
          element: <Element />,
        },
        {
          path: "canvas/:id",
          element: (
            <React.Suspense fallback={<Loading />}>
              <Canvas />
            </React.Suspense>
          ),
        },
      ],
    },
  ];
  const element = useRoutes(routes);
  return (
    <RootStoreContext.Provider value={store}>
      {element}
    </RootStoreContext.Provider>
  );
};

export default Routers;

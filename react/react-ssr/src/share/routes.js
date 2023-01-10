import Home from "./pages/Home";
import List from "./pages/List";

export default [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/list",
    ...List,
  },
];

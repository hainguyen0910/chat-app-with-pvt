import Home from "page/Home";
import Login from "page/Login";
import Notfound from "page/Notfound";

export const ROUTERS = [
  {
    name: "Login",
    component: Login,
    path: "/login",
    exact: true,
  },
  {
    name: "Home",
    component: Home,
    path: "/",
    exact: true,
  },
  {
    name: "Notfound",
    component: Notfound,
    path: "*",
  },
];

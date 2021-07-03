import Home from "page/Home";
import Login from "page/Login";
import Room from "page/Room";

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
    name: "Room",
    component: Room,
    path: "/room/:id",
    exact: false,
  },
];

import Home from "page/Home";
import Login from "page/Login";
import Notfound from "page/Notfound";
import Loadable from "react-loadable";

const HomeComponent = Loadable({
  loader: () => import("page/Home"),
  loading: Home,
});

const LoginComponent = Loadable({
  loader: () => import("page/Login"),
  loading: Login,
});

const NotfoundComponent = Loadable({
  loader: () => import("page/Notfound"),
  loading: Notfound,
});

export const ROUTERS = [
  {
    name: "Login",
    component: LoginComponent,
    path: "/login",
    exact: true,
  },
  {
    name: "Home",
    component: HomeComponent,
    path: "/",
    exact: true,
  },
  {
    name: "Notfound",
    component: NotfoundComponent,
    path: "*",
  },
];

import * as React from "react";
import { AuthContext } from "./auth.context";
import authApi from "api/auth";
import { history } from "App";
import swal from "sweetalert";

export interface IAuthProviderProps {
  children: JSX.Element;
}

const initialState = {
  avatar: JSON.parse(localStorage.getItem("auth") || "{}").avatar,
  username: JSON.parse(localStorage.getItem("auth") || "{}").username,
  fullname: JSON.parse(localStorage.getItem("auth") || "{}").fullname,
  token: JSON.parse(localStorage.getItem("auth") || "{}").token,
  birthday: JSON.parse(localStorage.getItem("auth") || "{}").birthday,
  createdAt: JSON.parse(localStorage.getItem("auth") || "{}").createdAt,
  sex: JSON.parse(localStorage.getItem("auth") || "{}").sex,
};

export default function AuthProvider(props: IAuthProviderProps) {
  const { children } = props;
  const [authReducer, setAuthReducer] = React.useState(initialState);

  const login = async (username: string, password: string) => {
    await authApi
      .login({ username, password })
      .then((res) => {
        const { data } = res;
        const auth: any = {
          avatar: data.avatar,
          username: data.username,
          fullname: data.fullname,
          token: data.token,
          birthday: data.birthday,
          createAt: data.createAt,
          sex: data.sex,
        };
        setAuthReducer(auth);
        localStorage.setItem("auth", JSON.stringify(auth));
        history.push("/");
      })
      .catch((error) => {
        swal(error.response.data.message, "", "error");
      });
  };

  const register = async (
    username: string,
    password: string,
    fullname: string
  ) => {
    await authApi
      .register({ username, password, fullname })
      .then((res) => {
        login(username, password);
      })
      .catch((error) => {
        swal(error.response.data.message, "", "error");
      });
  };

  const logout = async () => {
    await authApi.logout().then((res) => {
      localStorage.removeItem("auth");
      history.push("/login");
    });
  };

  return (
    <AuthContext.Provider
      value={{ authReducer, setAuthReducer, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

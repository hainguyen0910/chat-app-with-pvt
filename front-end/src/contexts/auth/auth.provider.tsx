import * as React from "react";
import { AuthContext } from "./auth.context";
import authApi from "api/auth";
import { history } from "App";
import swal from "sweetalert";

export interface IAuthProviderProps {
  children: JSX.Element;
}

const initialState = {
  username: null,
  fullname: null,
  token: null,
};

export default function AuthProvider(props: IAuthProviderProps) {
  const { children } = props;
  const [authReducer, setAuthReducer] = React.useState(initialState);

  const login = async (username: string, password: string) => {
    await authApi
      .login({ username, password })
      .then((res) => {
        const { data } = res;
        const auth = {
          username: data.username,
          fullname: data.fullname,
          token: data.token,
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

import userApi from "api/user";
import { history } from "App";
import { AuthContext } from "contexts/auth/auth.context";
import * as React from "react";
import swal from "sweetalert";
import { UserContext } from "./user.context";

export interface IUserProviderProps {
  children: JSX.Element;
}

const initialState = {
  avatar: JSON.parse(localStorage.getItem("user") || "{}").avatar,
  username: JSON.parse(localStorage.getItem("user") || "{}").username,
  fullname: JSON.parse(localStorage.getItem("user") || "{}").fullname,
  birthday: JSON.parse(localStorage.getItem("user") || "{}").birthday,
  createdAt: JSON.parse(localStorage.getItem("user") || "{}").createdAt,
  sex: JSON.parse(localStorage.getItem("user") || "{}").sex,
};

export default function UserProvider(props: IUserProviderProps) {
  const { children } = props;

  const [user, setUser] = React.useState(initialState);

  const updateProfile = async (formData: FormData) => {
    await userApi
      .updateProfile(formData)
      .then((res) => {
        const { data } = res;
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        swal("Your profile has been updated", "", "success");
      })
      .catch((err) => {
        swal(err.response.data.message, "", "error");
      });
  };

  const changePassword = async (
    data: any,
    onClose: any,
    clearInputPassword: any
  ) => {
    await userApi
      .changePassword(data)
      .then((res) => {
        swal("Password has been changed", "", "success");
        clearInputPassword();
        onClose();
      })
      .catch((err) => {
        swal(err.response.data.message, "", "error");
      });
  };

  return (
    <UserContext.Provider
      value={{ updateProfile, changePassword, user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

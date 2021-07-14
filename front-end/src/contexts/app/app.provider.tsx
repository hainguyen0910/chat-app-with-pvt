import * as React from "react";
import { AppContext } from "./app.context";

export interface IAppProviderProps {
  value: object;
  children: JSX.Element;
}

export default function AppProvider(props: IAppProviderProps) {
  const { value, children } = props;

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

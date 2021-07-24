import { useBoolean } from "@chakra-ui/react";
import * as React from "react";
import { AppContext } from "./app.context";

export interface IAppProviderProps {
  children: JSX.Element;
}

export default function AppProvider(props: IAppProviderProps) {
  const [disabled, setDisabled] = React.useState(false);

  const [isLoading, setIsLoading] = useBoolean();
  const { children } = props;

  return (
    <AppContext.Provider
      value={{ disabled, setDisabled, isLoading, setIsLoading }}
    >
      {children}
    </AppContext.Provider>
  );
}

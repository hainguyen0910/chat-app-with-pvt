import { ChakraProvider, theme } from "@chakra-ui/react";
import * as React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { ROUTERS } from "routers";
import LoadingOverlay from "react-loading-overlay";
import { useBoolean } from "@chakra-ui/react";
import { createBrowserHistory } from "history";
import AppProvider from "contexts/app/app.provider";
import "App.css";
import AuthProvider from "contexts/auth/auth.provider";

export const history = createBrowserHistory();

export const App = () => {
  const [isLoading, setIsLoading] = useBoolean();

  return (
    <Router history={history}>
      <ChakraProvider theme={theme}>
        <AppProvider value={{ isLoading, setIsLoading }}>
          <LoadingOverlay active={isLoading} spinner text="Wait a minute...">
            <AuthProvider>
              <Switch>
                {ROUTERS.map((item, index) => (
                  <Route
                    path={item.path}
                    exact={item.exact}
                    component={item.component}
                    key={index}
                  />
                ))}
              </Switch>
            </AuthProvider>
          </LoadingOverlay>
        </AppProvider>
      </ChakraProvider>
    </Router>
  );
};

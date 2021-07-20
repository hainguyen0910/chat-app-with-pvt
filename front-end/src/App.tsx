import { ChakraProvider, theme, useBoolean } from "@chakra-ui/react";
import "App.css";
import AppProvider from "contexts/app/app.provider";
import AuthProvider from "contexts/auth/auth.provider";
import RoomProvider from "contexts/room/room.provider";
import { createBrowserHistory } from "history";
import * as React from "react";
import LoadingOverlay from "react-loading-overlay";
import { Route, Router, Switch } from "react-router-dom";
import { ROUTERS } from "routers";

export const history = createBrowserHistory();

export const App = () => {
  const [isLoading, setIsLoading] = useBoolean();

  return (
    <Router history={history}>
      <ChakraProvider theme={theme}>
        <AppProvider value={{ isLoading, setIsLoading }}>
          <LoadingOverlay active={isLoading} spinner text="Wait a minute...">
            <AuthProvider>
              <RoomProvider>
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
              </RoomProvider>
            </AuthProvider>
          </LoadingOverlay>
        </AppProvider>
      </ChakraProvider>
    </Router>
  );
};

import { ChakraProvider, extendTheme, theme } from "@chakra-ui/react";
import * as React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { ROUTERS } from "routers";
import LoadingOverlay from "react-loading-overlay";
import { useBoolean } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { createBrowserHistory } from "history";
import AppProvider from "contexts/app/app.provider";
import "App.css";
import AuthProvider from "contexts/auth/auth.provider";
import RoomProvider from "contexts/room/room.provider";

const breakpoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
});

const newTheme = extendTheme({ breakpoints });

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

import { ChakraProvider, theme, useBoolean } from "@chakra-ui/react";
import "App.css";
import { AppContext } from "contexts/app/app.context";
import AppProvider from "contexts/app/app.provider";
import AuthProvider from "contexts/auth/auth.provider";
import RoomProvider from "contexts/room/room.provider";
import UserProvider from "contexts/user/user.provider";
import { createBrowserHistory } from "history";
import * as React from "react";
import LoadingOverlay from "react-loading-overlay";
import { Route, Router, Switch } from "react-router-dom";
import { ROUTERS } from "routers";

export const history = createBrowserHistory();

interface AppContextInterface {
  isLoading: boolean;
}

export const App = () => {
  const appContext: AppContextInterface = React.useContext(AppContext);
  const { isLoading } = appContext;

  return (
    <Router history={history}>
      <ChakraProvider theme={theme}>
        <AppProvider>
          <LoadingOverlay active={isLoading} spinner text="Wait a minute...">
            <UserProvider>
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
            </UserProvider>
          </LoadingOverlay>
        </AppProvider>
      </ChakraProvider>
    </Router>
  );
};

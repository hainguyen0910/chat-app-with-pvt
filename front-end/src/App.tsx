import { ChakraProvider, theme } from "@chakra-ui/react";
import * as React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { ROUTERS } from "routers";
import LoadingOverlay from "react-loading-overlay";
import { useBoolean } from "@chakra-ui/react";
import { createBrowserHistory } from "history";
import "App.css";

export const history = createBrowserHistory();
export const AppProvider = React.createContext({});

export const App = () => {
  const [isLoading, setIsLoading] = useBoolean();

  return (
    <Router history={history}>
      <ChakraProvider theme={theme}>
        <AppProvider.Provider value={{ isLoading, setIsLoading }}>
          <LoadingOverlay active={isLoading} spinner text="Wait a minute...">
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
          </LoadingOverlay>
        </AppProvider.Provider>
      </ChakraProvider>
    </Router>
  );
};

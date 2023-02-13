import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { QueryClientComponent } from "@ribon.io/shared/hooks";
import { ToastContextProvider } from "contexts/toastContext";
import Toast from "contexts/toastContext/toastComponent";
import { GrowthBookProvider } from "@growthbook/growthbook-react";
import { useEffect } from "react";
import {
  growthbook,
  growthbookSetAttributes,
  growthbookSetFeatures,
} from "services/growthbook";
import Zendesk from "config/zendesk";
import CurrentUserProvider from "contexts/currentUserContext";
import RoutesComponent from "./config/routes";
import GlobalStyle from "./styles/globalStyle";
import theme from "./styles/theme";
import LoadingOverlayProvider from "./contexts/loadingOverlayContext";
import ModalProvider from "./contexts/modalContext";

function App() {
  useEffect(() => {
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "test"
    )
      return;

    growthbookSetFeatures();
    // eslint-disable-next-line no-console
    growthbookSetAttributes().catch(console.error);
  }, []);

  return (
    <QueryClientComponent>
      <GrowthBookProvider growthbook={growthbook}>
        <ThemeProvider theme={theme}>
          <LoadingOverlayProvider>
            <ModalProvider>
              <GlobalStyle />
              <BrowserRouter>
                <ToastContextProvider>
                  <CurrentUserProvider>
                    <RoutesComponent />
                    <Zendesk />
                  </CurrentUserProvider>
                  <Toast />
                </ToastContextProvider>
              </BrowserRouter>
            </ModalProvider>
          </LoadingOverlayProvider>
        </ThemeProvider>
      </GrowthBookProvider>
    </QueryClientComponent>
  );
}

export default App;

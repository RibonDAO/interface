import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContextProvider } from "contexts/toastContext";
import Toast from "contexts/toastContext/toastComponent";
import { GrowthBookProvider } from "@growthbook/growthbook-react";
import { useEffect } from "react";
import {
  growthbook,
  growthbookSetAttributes,
  growthbookSetFeatures,
} from "services/growthbook";
import RoutesComponent from "./config/routes";
import GlobalStyle from "./styles/globalStyle";
import theme from "./styles/theme";
import LoadingOverlayProvider from "./contexts/loadingOverlayContext";
import ModalProvider from "./contexts/modalContext";

function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;

    growthbookSetFeatures();
    // eslint-disable-next-line no-console
    growthbookSetAttributes().catch(console.error);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GrowthBookProvider growthbook={growthbook}>
        <ThemeProvider theme={theme}>
          <LoadingOverlayProvider>
            <ModalProvider>
              <GlobalStyle />
              <BrowserRouter>
                <ToastContextProvider>
                  <RoutesComponent />
                  <Toast />
                </ToastContextProvider>
              </BrowserRouter>
            </ModalProvider>
          </LoadingOverlayProvider>
        </ThemeProvider>
      </GrowthBookProvider>
    </QueryClientProvider>
  );
}

export default App;

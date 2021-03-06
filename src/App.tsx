import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContextProvider } from "contexts/toastContext";
import Toast from "contexts/toastContext/toastComponent";
import RoutesComponent from "./config/routes";
import GlobalStyle from "./styles/globalStyle";
import theme from "./styles/theme";
import LoadingOverlayProvider from "./contexts/loadingOverlayContext";
import ModalProvider from "./contexts/modalContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { ApolloProvider } from "@apollo/client";
import { client } from "services/apolloClient";
import RoutesComponent from "./config/routes";
import GlobalStyle from "./styles/globalStyle";
import theme from "./styles/theme";

function App() {
  const queryClient = new QueryClient();

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <BrowserRouter>
            <RoutesComponent />
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default App;

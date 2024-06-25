import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { QueryClientComponent } from "@ribon.io/shared/hooks";
import { ToastContextProvider } from "contexts/toastContext";
import Toast from "contexts/toastContext/toastComponent";
import { Suspense } from "react";
import Zendesk from "config/zendesk";
import CurrentUserProvider from "contexts/currentUserContext";
import TasksProvider from "contexts/tasksContext";
import CausesProvider from "contexts/causesContext";
import NonProfitsProvider from "contexts/nonProfitsContext";
import DebugEventsView from "config/debugEventsView";
import { debugEnabled } from "config/debugEventsView/helpers";
import AuthenticationProvider from "contexts/authenticationContext";
import TagDonationProvider from "contexts/tagDonationContext";
import CauseContributionProvider from "contexts/causeContributionContext";
import UserLevelProvider from "contexts/userLevelContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import TicketsProvider from "contexts/ticketsContext";
import CouponProvider from "contexts/couponContext";
import TagsProvider from "contexts/tagsContext";
import IntegrationProvider from "contexts/integrationContext";
import LoadingOverlayProvider from "./contexts/loadingOverlayContext";
import ModalProvider from "./contexts/modalContext";
import RoutesComponent from "./config/routes";
import GlobalStyle from "./styles/globalStyle";
import theme from "./styles/theme";

function App() {
  // useEffect(() => {
  //   if (
  //     process.env.NODE_ENV === "development" ||
  //     process.env.NODE_ENV === "test"
  //   ) {
  //     if (DEBUG_EVENTS_ENABLED) growthbookSetFeatures();
  //     return;
  //   }

  //   growthbookSetFeatures();
  //   // eslint-disable-next-line no-console
  //   growthbookSetAttributes().catch(console.error);
  // }, []);

  return (
    <QueryClientComponent>
      {/* <GrowthBookProvider growthbook={growthbook}> */}
      <ThemeProvider theme={theme}>
        <LoadingOverlayProvider>
          <GlobalStyle />
          <BrowserRouter>
            {debugEnabled() && <DebugEventsView />}
            <ToastContextProvider>
              <CurrentUserProvider>
                <GoogleOAuthProvider
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
                >
                  <AuthenticationProvider>
                    <ModalProvider>
                      <Suspense fallback={<div />}>
                        <IntegrationProvider>
                          <TicketsProvider>
                            <TasksProvider>
                              <CouponProvider>
                                <TagsProvider>
                                  <NonProfitsProvider>
                                    <CausesProvider>
                                      <TagDonationProvider>
                                        <CauseContributionProvider>
                                          <UserLevelProvider>
                                            <RoutesComponent />
                                            <Zendesk />
                                          </UserLevelProvider>
                                        </CauseContributionProvider>
                                      </TagDonationProvider>
                                    </CausesProvider>
                                  </NonProfitsProvider>
                                </TagsProvider>
                              </CouponProvider>
                            </TasksProvider>
                          </TicketsProvider>
                        </IntegrationProvider>
                      </Suspense>
                    </ModalProvider>
                  </AuthenticationProvider>
                </GoogleOAuthProvider>
              </CurrentUserProvider>
              <Toast />
            </ToastContextProvider>
          </BrowserRouter>
        </LoadingOverlayProvider>
      </ThemeProvider>
      {/* </GrowthBookProvider> */}
    </QueryClientComponent>
  );
}

export default App;

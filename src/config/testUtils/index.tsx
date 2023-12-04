import React from "react";
import {
  act,
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { createMemoryHistory, MemoryHistory } from "history";
import { Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "i18n-test";
import theme from "styles/theme";
import WalletProvider, {
  IWalletContext,
  WalletContext,
} from "contexts/walletContext";
import CurrentUserProvider, {
  CurrentUserContext,
  ICurrentUserContext,
} from "contexts/currentUserContext";
import {
  IToastContext,
  ToastContext,
  ToastContextProvider,
} from "contexts/toastContext";
import LoadingOverlayProvider, {
  ILoadingOverlayContext,
  LoadingOverlayContext,
} from "contexts/loadingOverlayContext";
import ModalProvider, {
  IModalContext,
  ModalContext,
} from "contexts/modalContext";
import CardPaymentInformationProvider, {
  CardPaymentInformationContext,
  ICardPaymentInformationContext,
} from "contexts/cardPaymentInformationContext";
import NetworkProvider, {
  NetworkContext,
  INetworkContext,
} from "contexts/networkContext";
import userEvent from "@testing-library/user-event";
import CryptoPaymentProvider, {
  CryptoPaymentContext,
  ICryptoPaymentContext,
} from "contexts/cryptoPaymentContext";
import TasksProvider, {
  TasksContext,
  ITasksContext,
} from "contexts/tasksContext";
import CausesProvider, {
  CausesContext,
  ICausesContext,
} from "contexts/causesContext";

import { QueryClientComponent } from "@ribon.io/shared/hooks";
import CauseDonationProvider, {
  CauseDonationContext,
  ICauseDonationContext,
} from "contexts/causeDonationContext";
import CauseContributionProvider, {
  CauseContributionContext,
  ICauseContributionContext,
} from "contexts/causeContributionContext";
import NonProfitsProvider, {
  INonProfitsContext,
  NonProfitsContext,
} from "contexts/nonProfitsContext";
import PaymentInformationProvider, {
  IPaymentInformationContext,
  PaymentInformationContext,
} from "contexts/paymentInformationContext";
import PixPaymentInformationProvider, {
  IPixPaymentInformationContext,
  PixPaymentInformationContext,
} from "contexts/pixPaymentInformationContext";
import StripeProvider, {
  IStripeContext,
  StripeContext,
} from "contexts/stripeContext";
import UserLevelProvider, {
  IUserLevelContext,
  UserLevelContext,
} from "contexts/userLevelContext";
import AuthenticationProvider, {
  IAuthenticationContext,
  AuthenticationContext,
} from "contexts/authenticationContext";

export function renderWithTheme(children: React.ReactNode): RenderResult {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
}

export interface RenderWithContextResult {
  component: RenderResult;
  history: MemoryHistory;
  value?: IWalletContext;
}

export async function waitForPromises() {
  // eslint-disable-next-line no-promise-executor-return
  await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
}

function renderProvider(
  RProvider: any,
  RContext: React.Context<any>,
  value: Record<any, any>,
  children: JSX.Element,
) {
  return (
    <RProvider>
      <RContext.Consumer>
        {(val: Record<any, any>) => (
          <RContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{
              ...val,
              ...value,
            }}
          >
            {children}
          </RContext.Provider>
        )}
      </RContext.Consumer>
    </RProvider>
  );
}

export type RenderComponentProps = {
  history?: MemoryHistory;
  walletProviderValue?: Partial<IWalletContext>;
  tasksProviderValue?: Partial<ITasksContext>;
  causesProviderValue?: Partial<ICausesContext>;
  causeDonationProviderValue?: Partial<ICauseDonationContext>;
  causeContributionProviderValue?: Partial<ICauseContributionContext>;
  currentUserProviderValue?: Partial<ICurrentUserContext>;
  toastProviderValue?: Partial<IToastContext>;
  loadingOverlayValue?: Partial<ILoadingOverlayContext>;
  modalProviderValue?: Partial<IModalContext>;
  nonProfitsProviderValue?: Partial<INonProfitsContext>;
  cardPaymentProviderValue?: Partial<ICardPaymentInformationContext>;
  paymentProviderValue?: Partial<IPaymentInformationContext>;
  pixPaymentProviderValue?: Partial<IPixPaymentInformationContext>;
  networkProviderValue?: Partial<INetworkContext>;
  cryptoPaymentProviderValue?: Partial<ICryptoPaymentContext>;
  locationState?: Record<any, any>;
  stripeProviderValue?: Partial<IStripeContext>;
  userLevelProviderValue?: Partial<IUserLevelContext>;
  authenticationProviderValue?: Partial<IAuthenticationContext>;
};
export function renderComponent(
  component: JSX.Element,
  {
    history = createMemoryHistory(),
    walletProviderValue = {},
    tasksProviderValue = {},
    causesProviderValue = {},
    causeDonationProviderValue = {},
    causeContributionProviderValue = {},
    currentUserProviderValue = {},
    toastProviderValue = {},
    locationState = {},
    loadingOverlayValue = {},
    modalProviderValue = {},
    nonProfitsProviderValue = {},
    cardPaymentProviderValue = {},
    paymentProviderValue = {},
    networkProviderValue = {},
    cryptoPaymentProviderValue = {},
    pixPaymentProviderValue = {},
    stripeProviderValue = {},
    userLevelProviderValue = {},
    authenticationProviderValue = {},
  }: RenderComponentProps = {},
): RenderWithContextResult {
  const historyObject = history;
  historyObject.location.state = locationState;

  return {
    component: render(
      <ThemeProvider theme={theme}>
        <QueryClientComponent>
          <I18nextProvider i18n={i18n}>
            <Router history={historyObject}>
              {renderProvider(
                CurrentUserProvider,
                CurrentUserContext,
                currentUserProviderValue,
                renderProvider(
                  TasksProvider,
                  TasksContext,
                  tasksProviderValue,
                  renderProvider(
                    CausesProvider,
                    CausesContext,
                    causesProviderValue,
                    renderProvider(
                      CauseDonationProvider,
                      CauseDonationContext,
                      causeDonationProviderValue,
                      renderProvider(
                        CauseContributionProvider,
                        CauseContributionContext,
                        causeContributionProviderValue,
                        renderProvider(
                          ToastContextProvider,
                          ToastContext,
                          toastProviderValue,
                          renderProvider(
                            LoadingOverlayProvider,
                            LoadingOverlayContext,
                            loadingOverlayValue,
                            renderProvider(
                              ModalProvider,
                              ModalContext,
                              modalProviderValue,
                              renderProvider(
                                NonProfitsProvider,
                                NonProfitsContext,
                                nonProfitsProviderValue,
                                renderProvider(
                                  PaymentInformationProvider,
                                  PaymentInformationContext,
                                  paymentProviderValue,
                                  renderProvider(
                                    CardPaymentInformationProvider,
                                    CardPaymentInformationContext,
                                    cardPaymentProviderValue,
                                    renderProvider(
                                      NetworkProvider,
                                      NetworkContext,
                                      networkProviderValue,
                                      renderProvider(
                                        WalletProvider,
                                        WalletContext,
                                        walletProviderValue,
                                        renderProvider(
                                          CryptoPaymentProvider,
                                          CryptoPaymentContext,
                                          cryptoPaymentProviderValue,
                                          renderProvider(
                                            StripeProvider,
                                            StripeContext,
                                            stripeProviderValue,
                                            renderProvider(
                                              PixPaymentInformationProvider,
                                              PixPaymentInformationContext,
                                              pixPaymentProviderValue,
                                              renderProvider(
                                                UserLevelProvider,
                                                UserLevelContext,
                                                userLevelProviderValue,
                                                renderProvider(
                                                  AuthenticationProvider,
                                                  AuthenticationContext,
                                                  authenticationProviderValue,
                                                  component,
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              )}
            </Router>
          </I18nextProvider>
        </QueryClientComponent>
      </ThemeProvider>,
    ),
    history,
  };
}

export function clickOn(textOrComponent: string | any) {
  if (typeof textOrComponent === "string") {
    return fireEvent.click(screen.getByText(textOrComponent));
  }

  return fireEvent.click(textOrComponent);
}

export function fillByPlaceholder(placeholder: string, value: string) {
  userEvent.type(screen.getByPlaceholderText(placeholder), value);
}

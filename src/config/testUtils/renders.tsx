import React from "react";
import { render, RenderResult } from "@testing-library/react";
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
import CausesProvider, {
  CausesContext,
  ICausesContext,
} from "contexts/causesContext";
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
import {
  renderHook as renderTestingLibraryHook,
  RenderHookResult,
} from "@testing-library/react-hooks";
import NetworkProvider, {
  INetworkContext,
  NetworkContext,
} from "contexts/networkContext";
import { QueryClientComponent } from "@ribon.io/shared/hooks";
import TagDonationProvider, {
  TagDonationContext,
  ITagDonationContext,
} from "contexts/tagDonationContext";
import TasksProvider, {
  ITasksContext,
  TasksContext,
} from "contexts/tasksContext";
import CauseContributionProvider, {
  CauseContributionContext,
  ICauseContributionContext,
} from "contexts/causeContributionContext";
import StripeProvider, {
  IStripeContext,
  StripeContext,
} from "contexts/stripeContext";
import UserLevelProvider, {
  IUserLevelContext,
  UserLevelContext,
} from "contexts/userLevelContext";
import AuthenticationProvider, {
  AuthenticationContext,
  IAuthenticationContext,
} from "contexts/authenticationContext";
import TicketsProvider, {
  ITicketsContext,
  TicketsContext,
} from "contexts/ticketsContext";
import CouponProvider, {
  CouponContext,
  ICouponContext,
} from "contexts/couponContext";
import TagsProvider, { ITagsContext, TagsContext } from "contexts/tagsContext";

export interface RenderWithContextResult {
  component: RenderResult;
  history: MemoryHistory;
  value?: IWalletContext;
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
  authenticationProviderValue?: Partial<IAuthenticationContext>;
  ticketsProviderValue?: Partial<ITicketsContext>;
  couponProviderValue?: Partial<ICouponContext>;
  walletProviderValue?: Partial<IWalletContext>;
  causesProviderValue?: Partial<ICausesContext>;
  tagDonationProviderValue?: Partial<ITagDonationContext>;
  tagsProviderValue?: Partial<ITagsContext>;
  causeContributionProviderValue?: Partial<ICauseContributionContext>;
  currentUserProviderValue?: Partial<ICurrentUserContext>;
  toastProviderValue?: Partial<IToastContext>;
  loadingOverlayValue?: Partial<ILoadingOverlayContext>;
  modalProviderValue?: Partial<IModalContext>;
  networkProviderValue?: Partial<INetworkContext>;
  tasksProviderValue?: Partial<ITasksContext>;
  stripeProviderValue?: Partial<IStripeContext>;
  userLevelProviderValue?: Partial<IUserLevelContext>;
  locationState?: Record<any, any>;
};

function renderAllProviders(
  children: any,
  {
    history = createMemoryHistory(),
    authenticationProviderValue = {},
    ticketsProviderValue = {},
    couponProviderValue = {},
    walletProviderValue = {},
    causesProviderValue = {},
    tagDonationProviderValue = {},
    tagsProviderValue = {},
    causeContributionProviderValue = {},
    currentUserProviderValue = {},
    toastProviderValue = {},
    locationState = {},
    loadingOverlayValue = {},
    modalProviderValue = {},
    networkProviderValue = {},
    tasksProviderValue = {},
    stripeProviderValue = {},
    userLevelProviderValue = {},
  }: RenderComponentProps = {},
) {
  const historyObject = history;
  historyObject.location.state = locationState;

  return {
    component: (
      <ThemeProvider theme={theme}>
        <QueryClientComponent>
          <I18nextProvider i18n={i18n}>
            <Router history={historyObject}>
              {renderProvider(
                CurrentUserProvider,
                CurrentUserContext,
                currentUserProviderValue,
                renderProvider(
                  AuthenticationProvider,
                  AuthenticationContext,
                  authenticationProviderValue,
                  renderProvider(
                    TicketsProvider,
                    TicketsContext,
                    ticketsProviderValue,
                    renderProvider(
                      CouponProvider,
                      CouponContext,
                      couponProviderValue,
                      renderProvider(
                        TagsProvider,
                        TagsContext,
                        tagsProviderValue,
                        renderProvider(
                          WalletProvider,
                          WalletContext,
                          walletProviderValue,
                          renderProvider(
                            CausesProvider,
                            CausesContext,
                            causesProviderValue,
                            renderProvider(
                              TagDonationProvider,
                              TagDonationContext,
                              tagDonationProviderValue,
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
                                        NetworkProvider,
                                        NetworkContext,
                                        networkProviderValue,
                                        renderProvider(
                                          TasksProvider,
                                          TasksContext,
                                          tasksProviderValue,
                                          renderProvider(
                                            StripeProvider,
                                            StripeContext,
                                            stripeProviderValue,
                                            renderProvider(
                                              UserLevelProvider,
                                              UserLevelContext,
                                              userLevelProviderValue,
                                              children,
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
      </ThemeProvider>
    ),
    history: historyObject,
  };
}

export function renderComponent(
  component: JSX.Element,
  renderComponentProps: RenderComponentProps = {},
): RenderWithContextResult {
  const { component: componentWithProviders, history } = renderAllProviders(
    component,
    renderComponentProps,
  );
  return {
    component: render(componentWithProviders),
    history,
  };
}

type RenderHookReturn = {
  hook: RenderHookResult<any, any>;
  history: MemoryHistory;
};
export function renderHook(
  hook: (props: any) => any,
  renderComponentProps: RenderComponentProps = {},
): RenderHookReturn {
  let history = createMemoryHistory();
  const wrapper = ({ children }: any) => {
    const { component, history: historyObject } = renderAllProviders(
      children,
      renderComponentProps,
    );
    history = historyObject;
    return component;
  };

  return {
    hook: renderTestingLibraryHook(hook, { wrapper }),
    history,
  };
}

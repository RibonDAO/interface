import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import WalletProvider from "contexts/walletContext";
import CausesPage from "pages/donations/CausesPage";
import CurrentUserProvider from "contexts/currentUserContext";
import ConfirmEmailPage from "pages/donations/ConfirmEmailPage";
import DonationDonePage from "pages/donations/DonationDonePage";
import DonationInProcessPage from "pages/donations/DonationInProcessPage";
import ImpactPage from "pages/users/ImpactPage";
import MainLayout from "layouts/MainLayout";
import FundPage from "pages/promoters/FundPage";
import SupportFundPage from "pages/promoters/SupportFundPage";
import GivingsPage from "pages/promoters/GivingsPage";
import WalletLayout from "layouts/WalletLayout";
import CardPaymentInformationProvider from "contexts/cardPaymentInformationContext";
import NetworkProvider from "contexts/networkContext";

import { onboardingFeature } from "config/abTest/features";
import CausesPageTest from "pages/abTest/CausesPage";
import Navigation from "./Navigation";

function RoutesComponent(): JSX.Element {
  return (
    <Switch>
      <Route path="/" exact>
        <Suspense fallback={<div />}>
          <WalletProvider>
            <CurrentUserProvider>
              <MainLayout>
                {onboardingFeature() ? <CausesPage /> : <CausesPageTest />}
              </MainLayout>
            </CurrentUserProvider>
          </WalletProvider>
        </Suspense>
      </Route>

      <Route path="/confirm-email" exact>
        <Suspense fallback={<div />}>
          <CurrentUserProvider>
            <Navigation />
            <ConfirmEmailPage />
          </CurrentUserProvider>
        </Suspense>
      </Route>

      <Route path="/donation-done" exact>
        <Suspense fallback={<div />}>
          <CurrentUserProvider>
            <DonationDonePage />
          </CurrentUserProvider>
        </Suspense>
      </Route>

      <Route path="/donation-in-process" exact>
        <Suspense fallback={<div />}>
          <CurrentUserProvider>
            <DonationInProcessPage />
          </CurrentUserProvider>
        </Suspense>
      </Route>

      <Route path="/impact" exact>
        <Suspense fallback={<div />}>
          <CurrentUserProvider>
            <MainLayout>
              <ImpactPage />
            </MainLayout>
          </CurrentUserProvider>
        </Suspense>
      </Route>

      <Route path="/promoters/fund" exact>
        <Suspense fallback={<div />}>
          <CurrentUserProvider>
            <NetworkProvider>
              <WalletProvider>
                <WalletLayout>
                  <FundPage />
                </WalletLayout>
              </WalletProvider>
            </NetworkProvider>
          </CurrentUserProvider>
        </Suspense>
      </Route>

      <Route path="/promoters/support-fund" exact>
        <Suspense fallback={<div />}>
          <CurrentUserProvider>
            <NetworkProvider>
              <WalletProvider>
                <WalletLayout hideNavigation hasBackButton>
                  <CardPaymentInformationProvider>
                    <SupportFundPage />
                  </CardPaymentInformationProvider>
                </WalletLayout>
              </WalletProvider>
            </NetworkProvider>
          </CurrentUserProvider>
        </Suspense>
      </Route>

      <Route path="/promoters/show-givings" exact>
        <Suspense fallback={<div />}>
          <CurrentUserProvider>
            <WalletProvider>
              <WalletLayout hasBackButton>
                <GivingsPage />
              </WalletLayout>
            </WalletProvider>
          </CurrentUserProvider>
        </Suspense>
      </Route>

      <Route path="/fund" exact>
        <MainLayout>
          <div />
        </MainLayout>
      </Route>
    </Switch>
  );
}

export default RoutesComponent;

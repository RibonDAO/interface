import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import WalletProvider from "contexts/walletContext";
import CausesPage from "pages/donations/CausesPage";
import CurrentUserProvider from "contexts/currentUserContext";
import ConfirmEmailPage from "pages/donations/ConfirmEmailPage";
import DonationDonePage from "pages/donations/DonationDonePage";
import DonationInProcessPage from "pages/donations/DonationInProcessPage";
import MainLayout from "layouts/MainLayout";
import Navigation from "./Navigation";
import FundPage from "../../pages/promoters/FundPage";

function RoutesComponent(): JSX.Element {
  return (
    <Switch>
      <Route path="/" exact>
        <Suspense fallback={<div />}>
          <WalletProvider>
            <CurrentUserProvider>
              <MainLayout>
                <CausesPage />
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
          <MainLayout>
            <div />
          </MainLayout>
        </Suspense>
      </Route>

      <Route path="/promoters/fund" exact>
        <Suspense fallback={<div />}>
          <MainLayout>
            <FundPage />
          </MainLayout>
        </Suspense>
      </Route>
    </Switch>
  );
}

export default RoutesComponent;

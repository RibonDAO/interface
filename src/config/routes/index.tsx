import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import WalletProvider from "contexts/walletContext";
import CausesPage from "pages/donations/CausesPage";
import CurrentUserProvider from "contexts/currentUserContext";
import ConfirmEmailPage from "pages/donations/ConfirmEmailPage";
import DonationInProcesPage from "pages/donations/DonationInProcesPage";
import Protocol from "pages/Protocol";

function RoutesComponent(): JSX.Element {
  return (
    <Switch>
      <Route path="/" exact>
        <Suspense fallback={<div />}>
          <WalletProvider>
            <CurrentUserProvider>
              <CausesPage />
            </CurrentUserProvider>
          </WalletProvider>
        </Suspense>
      </Route>

      <Route path="/protocol" exact>
        <Suspense fallback={<div />}>
          <WalletProvider>
            <CurrentUserProvider>
              <Protocol />
            </CurrentUserProvider>
          </WalletProvider>
        </Suspense>
      </Route>

      <Route path="/confirm-email" exact>
        <Suspense fallback={<div />}>
          <CurrentUserProvider>
            <ConfirmEmailPage />
          </CurrentUserProvider>
        </Suspense>
      </Route>

      <Route path="/donation-in-process" exact>
        <Suspense fallback={<div />}>
          <CurrentUserProvider>
            <DonationInProcesPage />
          </CurrentUserProvider>
        </Suspense>
      </Route>
    </Switch>
  );
}

export default RoutesComponent;

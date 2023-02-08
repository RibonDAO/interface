import React, { Suspense, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import WalletProvider from "contexts/walletContext";
import CausesPage from "pages/donations/CausesPage";
import ConfirmEmailPage from "pages/donations/ConfirmEmailPage";
import DonationDonePage from "pages/donations/DonationDonePage";
import DonationDoneCausePage from "pages/donations/DonationDoneCausePage";
import ImpactPage from "pages/users/ImpactPage";
import MainLayout from "layouts/MainLayout";
import TreasurePage from "pages/promoters/TreasurePage";
import SupportTreasurePage from "pages/promoters/SupportTreasurePage";
import SupportCausePage from "pages/promoters/SupportCausePage";
import BillingInformationPage from "pages/promoters/SupportTreasurePage/CardSection/BillingInformationPage";
import PaymentInformationPage from "pages/promoters/SupportTreasurePage/CardSection/PaymentInformationPage";
import GivingsPage from "pages/promoters/GivingsPage";
import WalletLayout from "layouts/WalletLayout";
import CardPaymentInformationProvider from "contexts/cardPaymentInformationContext";
import NetworkProvider from "contexts/networkContext";
import CausesProvider from "contexts/causesContext";
import CommunityAddPage from "pages/promoters/SupportCausePage/CommunityAddPage";
import PostDonationPage from "pages/donations/PostDonationPage";
import CryptoPaymentProvider from "contexts/cryptoPaymentContext";
import SupportNonProfitPage from "pages/promoters/SupportNonProfitPage";
import PaymentPage from "pages/promoters/PaymentPage";
import { useLocation } from "react-router";
import { logPageView } from "lib/events";
import AppInDevelopmentPage from "pages/users/AppInDevelopmentPage";
import Navigation from "./Navigation";

function RoutesComponent(): JSX.Element {
  const location = useLocation();

  useEffect(() => {
    const urlName = location.pathname.replace(/\/\d+/, "");
    const { search, state } = location;

    logPageView(urlName, search, state);
  }, [location]);

  return (
    <Switch>
      <Route path="/" exact>
        <Suspense fallback={<div />}>
          <WalletProvider>
            <CausesProvider>
              <MainLayout>
                <CausesPage />
              </MainLayout>
            </CausesProvider>
          </WalletProvider>
        </Suspense>
      </Route>

      <Route path="/app-in-development" exact>
        <Suspense fallback={<div />}>
          <AppInDevelopmentPage />
        </Suspense>
      </Route>

      <Route path="/confirm-email" exact>
        <Suspense fallback={<div />}>
          <Navigation />
          <ConfirmEmailPage />
        </Suspense>
      </Route>

      <Route path="/donation-done" exact>
        <Suspense fallback={<div />}>
          <DonationDonePage />
        </Suspense>
      </Route>

      <Route path="/donation-done-cause" exact>
        <Suspense fallback={<div />}>
          <DonationDoneCausePage />
        </Suspense>
      </Route>

      <Route path="/post-donation" exact>
        <Suspense fallback={<div />}>
          <PostDonationPage />
        </Suspense>
      </Route>

      <Route path="/impact" exact>
        <Suspense fallback={<div />}>
          <WalletProvider>
            <MainLayout>
              <ImpactPage />
            </MainLayout>
          </WalletProvider>
        </Suspense>
      </Route>

      <Route path="/promoters/treasure" exact>
        <Suspense fallback={<div />}>
          <NetworkProvider>
            <WalletProvider>
              <WalletLayout hasBackButton hideNavigation hideWallet>
                <TreasurePage />
              </WalletLayout>
            </WalletProvider>
          </NetworkProvider>
        </Suspense>
      </Route>

      <Route path="/promoters/support-treasure" exact>
        <Suspense fallback={<div />}>
          <NetworkProvider>
            <WalletProvider>
              <WalletLayout>
                <CardPaymentInformationProvider>
                  <SupportTreasurePage />
                </CardPaymentInformationProvider>
              </WalletLayout>
            </WalletProvider>
          </NetworkProvider>
        </Suspense>
      </Route>

      <Route path="/promoters/support-cause" exact>
        <Suspense fallback={<div />}>
          <NetworkProvider>
            <WalletProvider>
              <WalletLayout>
                <CardPaymentInformationProvider>
                  <CryptoPaymentProvider>
                    <SupportCausePage />
                  </CryptoPaymentProvider>
                </CardPaymentInformationProvider>
              </WalletLayout>
            </WalletProvider>
          </NetworkProvider>
        </Suspense>
      </Route>

      <Route path="/promoters/support-treasure/billing-information" exact>
        <Suspense fallback={<div />}>
          <WalletProvider>
            <WalletLayout hasBackButton>
              <CardPaymentInformationProvider>
                <BillingInformationPage />
              </CardPaymentInformationProvider>
            </WalletLayout>
          </WalletProvider>
        </Suspense>
      </Route>

      <Route path="/promoters/support-treasure/payment-information" exact>
        <Suspense fallback={<div />}>
          <WalletProvider>
            <WalletLayout hasBackButton>
              <CardPaymentInformationProvider>
                <PaymentInformationPage />
              </CardPaymentInformationProvider>
            </WalletLayout>
          </WalletProvider>
        </Suspense>
      </Route>

      <Route path="/promoters/show-givings" exact>
        <Suspense fallback={<div />}>
          <WalletProvider>
            <WalletLayout hasBackButton>
              <GivingsPage />
            </WalletLayout>
          </WalletProvider>
        </Suspense>
      </Route>

      <Route path="/treasure" exact>
        <MainLayout>
          <div />
        </MainLayout>
      </Route>

      <Route path="/promoters/community-add" exact>
        <Suspense fallback={<div />}>
          <CardPaymentInformationProvider>
            <CommunityAddPage />
          </CardPaymentInformationProvider>
        </Suspense>
      </Route>

      <Route path="/promoters/support-non-profit" exact>
        <Suspense fallback={<div />}>
          <NetworkProvider>
            <WalletProvider>
              <WalletLayout>
                <CardPaymentInformationProvider>
                  <CryptoPaymentProvider>
                    <SupportNonProfitPage />
                  </CryptoPaymentProvider>
                </CardPaymentInformationProvider>
              </WalletLayout>
            </WalletProvider>
          </NetworkProvider>
        </Suspense>
      </Route>

      <Route path="/promoters/payment" exact>
        <Suspense fallback={<div />}>
          <NetworkProvider>
            <WalletProvider>
              <WalletLayout hideNavigation>
                <CardPaymentInformationProvider>
                  <PaymentPage />
                </CardPaymentInformationProvider>
              </WalletLayout>
            </WalletProvider>
          </NetworkProvider>
        </Suspense>
      </Route>
    </Switch>
  );
}

export default RoutesComponent;

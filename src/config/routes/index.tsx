import React, { Suspense, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import WalletProvider from "contexts/walletContext";
import CausesPage from "pages/donations/CausesPage";
import ConfirmDonationPage from "pages/donations/ConfirmDonationPage";
import DonationDonePage from "pages/donations/DonationDonePage";
import DonationDoneCausePage from "pages/donations/DonationDoneCausePage";
import ImpactPage from "pages/users/ImpactPage";
import MainLayout from "layouts/MainLayout";
import CheckoutPage from "pages/promoters/CheckoutPage";
import SupportCausePage from "pages/promoters/SupportCausePage";
import GivingsPage from "pages/promoters/GivingsPage";
import WalletLayout from "layouts/WalletLayout";
import CardPaymentInformationProvider from "contexts/cardPaymentInformationContext";
import NetworkProvider from "contexts/networkContext";
import CommunityAddPage from "pages/promoters/SupportCausePage/CommunityAddPage";
import PostDonationPage from "pages/donations/PostDonationPage";
import CryptoPaymentProvider from "contexts/cryptoPaymentContext";
import SupportNonProfitPage from "pages/promoters/SupportNonProfitPage";
import DeleteAccountPage from "pages/users/DeleteAccountPage";
import { useLocation } from "react-router";
import { logPageView } from "lib/events";
import AppInDevelopmentPage from "pages/users/AppDownloadPage";
import ForYouPage from "pages/users/ForYouPage";
import GiveTicketPage from "pages/donations/GiveTicketPage";
import ReceiveTicketPage from "pages/donations/ReceiveTicketPage";
import LoadingPage from "pages/donations/LoadingPage";
import ContributionStatsPage from "pages/users/ContributionStatsPage";
import ReturnToIntegrationPage from "pages/donations/ReturnToIntegrationPage";
import StripeProvider from "contexts/stripeContext";
import PixPaymentInformationProvider from "contexts/pixPaymentInformationContext";
import PaymentInformationProvider from "contexts/paymentInformationContext";
import useQueryParams from "hooks/useQueryParams";
import RecurrencePage from "pages/promoters/CheckoutPage/RecurrencePage";
import NavigationBackHeader from "./Navigation/NavigationBackHeader";

function RoutesComponent(): JSX.Element {
  const location = useLocation();

  useEffect(() => {
    const urlName = location.pathname.replace(/\/\d+/, "");
    const { search, state } = location;

    logPageView(urlName, search, state);
  }, [location]);

  const params = useQueryParams();

  return (
    <Switch>
      <Route path="/" exact>
        <Suspense fallback={<div />}>
          <LoadingPage />
        </Suspense>
      </Route>

      <Route path="/causes" exact>
        <Suspense fallback={<div />}>
          <WalletProvider>
            <MainLayout>
              <CausesPage />
            </MainLayout>
          </WalletProvider>
        </Suspense>
      </Route>

      <Route path="/intro" exact>
        <Suspense fallback={<div />}>
          <GiveTicketPage isOnboarding />
        </Suspense>
      </Route>

      <Route path="/tickets" exact>
        <Suspense fallback={<div />}>
          <GiveTicketPage />
        </Suspense>
      </Route>

      <Route path="/return-to-integration" exact>
        <Suspense fallback={<div />}>
          <ReturnToIntegrationPage />
        </Suspense>
      </Route>

      <Route path="/app-download" exact>
        <Suspense fallback={<div />}>
          <AppInDevelopmentPage />
        </Suspense>
      </Route>

      <Route path="/receive-ticket" exact>
        <Suspense fallback={<div />}>
          <ReceiveTicketPage />
        </Suspense>
      </Route>

      <Route path="/confirm-donation" exact>
        <Suspense fallback={<div />}>
          <NavigationBackHeader />
          <ConfirmDonationPage />
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

      <Route path="/contribution-stats/:contributionId" exact>
        <Suspense fallback={<div />}>
          <WalletProvider>
            <MainLayout hasBackButton>
              <ContributionStatsPage />
            </MainLayout>
          </WalletProvider>
        </Suspense>
      </Route>

      <Route path="/forYou" exact>
        <Suspense fallback={<div />}>
          <WalletProvider>
            <MainLayout>
              <ForYouPage />
            </MainLayout>
          </WalletProvider>
        </Suspense>
      </Route>

      <Route path="/promoters/support-cause" exact>
        <Suspense fallback={<div />}>
          <NetworkProvider>
            <WalletProvider>
              <WalletLayout
                hideWallet={params.get("payment_method") !== "crypto"}
              >
                <PaymentInformationProvider>
                  <CardPaymentInformationProvider>
                    <CryptoPaymentProvider>
                      <SupportCausePage />
                    </CryptoPaymentProvider>
                  </CardPaymentInformationProvider>
                </PaymentInformationProvider>
              </WalletLayout>
            </WalletProvider>
          </NetworkProvider>
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
          <PaymentInformationProvider>
            <CardPaymentInformationProvider>
              <CommunityAddPage />
            </CardPaymentInformationProvider>
          </PaymentInformationProvider>
        </Suspense>
      </Route>

      <Route path="/promoters/support-non-profit" exact>
        <Suspense fallback={<div />}>
          <NetworkProvider>
            <WalletProvider>
              <WalletLayout hideWallet>
                <PaymentInformationProvider>
                  <CardPaymentInformationProvider>
                    <CryptoPaymentProvider>
                      <SupportNonProfitPage />
                    </CryptoPaymentProvider>
                  </CardPaymentInformationProvider>
                </PaymentInformationProvider>
              </WalletLayout>
            </WalletProvider>
          </NetworkProvider>
        </Suspense>
      </Route>

      <Route path="/promoters/checkout" exact>
        <Suspense fallback={<div />}>
          <NetworkProvider>
            <WalletProvider>
              <WalletLayout
                hideNavigation
                hideWallet={params.get("currency") !== "USDC"}
              >
                <PaymentInformationProvider>
                  <CardPaymentInformationProvider>
                    <CryptoPaymentProvider>
                      <StripeProvider>
                        <PixPaymentInformationProvider>
                          <CheckoutPage />
                        </PixPaymentInformationProvider>
                      </StripeProvider>
                    </CryptoPaymentProvider>
                  </CardPaymentInformationProvider>
                </PaymentInformationProvider>
              </WalletLayout>
            </WalletProvider>
          </NetworkProvider>
        </Suspense>
      </Route>

      <Route path="/promoters/recurrence" exact>
        <Suspense fallback={<div />}>
          <NetworkProvider>
            <WalletProvider>
              <WalletLayout hideNavigation>
                <PaymentInformationProvider>
                  <CardPaymentInformationProvider>
                    <CryptoPaymentProvider>
                      <StripeProvider>
                        <RecurrencePage />
                      </StripeProvider>
                    </CryptoPaymentProvider>
                  </CardPaymentInformationProvider>
                </PaymentInformationProvider>
              </WalletLayout>
            </WalletProvider>
          </NetworkProvider>
        </Suspense>
      </Route>

      <Route path="/delete_account" exact>
        <Suspense fallback={<div />}>
          <DeleteAccountPage />
        </Suspense>
      </Route>
    </Switch>
  );
}

export default RoutesComponent;

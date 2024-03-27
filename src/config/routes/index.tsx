import React, { Suspense, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import WalletProvider from "contexts/walletContext";
import CausesPage from "pages/donations/CausesPage";
import ContributionDonePage from "pages/promoters/ContributionDonePage";
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
import AppDownloadPage from "pages/users/AppDownloadPage";
import ForYouPage from "pages/users/ForYouPage";
import GiveTicketPage from "pages/donations/GiveTicketPage";
import ReceiveTicketPage from "pages/donations/ReceiveTicketPage";
import AboutPage from "pages/promoters/AboutPage";
import LoadingPage from "pages/donations/LoadingPage";
import ContributionStatsPage from "pages/users/ContributionStatsPage";
import ReturnToIntegrationPage from "pages/donations/ReturnToIntegrationPage";
import SurveyPage from "pages/promoters/SurveyPage";
import MonthlyContributionsPage from "pages/promoters/MonthlyContributionsPage";
import StripeProvider from "contexts/stripeContext";
import PixPaymentInformationProvider from "contexts/pixPaymentInformationContext";
import PaymentInformationProvider from "contexts/paymentInformationContext";
import useQueryParams from "hooks/useQueryParams";
import RecurrencePage from "pages/promoters/CheckoutPage/RecurrencePage";
import ContributionCanceledPage from "pages/promoters/ContributionCanceledPage";
import ExperimentRouteComponent from "services/growthbook/ExperimentRouteComponent";
import CampaignPage from "pages/campaigns/CampaignPage";
import PixInstructionsPage from "pages/promoters/CheckoutPage/Components/PixInstructionsPage";
import ExpiredLinkPage from "pages/auth/ExpiredLinkPage";
import ValidateExtraTicket from "pages/auth/ValidateExtraTicketPage";
import InsertEmailAccountPage from "pages/donations/auth/InsertEmailAccountPage";
import ExtraTicketPage from "pages/auth/ExtraTicketPage";
import SignInExtraTicketPage from "pages/auth/SignInExtraTicketPage";
import RedirectPage from "pages/campaigns/redirectPage";
import ReceiveExtraTicketPage from "pages/auth/ReceiveExtraTicketPage";
import CustomLinkPage from "pages/users/CustomLinkPage";
import CustomLinkCreatedPage from "pages/users/CustomLinkCreatedPage";
import SignInByMagicLinkPage from "pages/donations/auth/SignInByMagicLinkPage";
import DonationSignInPage from "pages/donations/auth/SignInPage";
import SignedInPage from "pages/donations/auth/SignedInPage";
import SignInCustomLinkPage from "pages/auth/SignInCustomLinkPage";
import SignInPage from "pages/auth/SignInPage";
import InsertEmailPage from "pages/auth/InsertEmailPage";
import SentMagicLinkEmailPage from "pages/auth/SentMagicLinkEmailPage";
import TicketDonationDonePage from "pages/donations/TicketDonationDonePage";
import SelectTicketsPage from "pages/donations/SelectTicketsPage";
import ValidateAccountPage from "pages/auth/ValidateAccountPage";
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

      <Route path="/auth/sign-in" exact>
        <Suspense fallback={<div />}>
          <NavigationBackHeader />
          <SignInPage />
        </Suspense>
      </Route>

      <Route path="/auth/insert-email" exact>
        <Suspense fallback={<div />}>
          <NavigationBackHeader />
          <InsertEmailPage />
        </Suspense>
      </Route>

      <Route path="/auth/sent-magic-link-email" exact>
        <Suspense fallback={<div />}>
          <NavigationBackHeader />
          <SentMagicLinkEmailPage />
        </Suspense>
      </Route>

      <Route path="/redirect">
        <Suspense fallback={<div />}>
          <RedirectPage />
        </Suspense>
      </Route>

      <Route path="/auth">
        <Suspense fallback={<div />}>
          <SignInByMagicLinkPage />
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

      <Route path="/ticket-donation-done" exact>
        <Suspense fallback={<div />}>
          <TicketDonationDonePage />
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
          <AppDownloadPage />
        </Suspense>
      </Route>

      <Route path="/receive-ticket" exact>
        <Suspense fallback={<div />}>
          <ReceiveTicketPage />
        </Suspense>
      </Route>

      <Route path="/donation/auth/sign-in" exact>
        <Suspense fallback={<div />}>
          <NavigationBackHeader />
          <DonationSignInPage />
        </Suspense>
      </Route>

      <Route path="/signed-in" exact>
        <Suspense fallback={<div />}>
          <NavigationBackHeader />
          <SignedInPage />
        </Suspense>
      </Route>

      <Route path="/insert-email" exact>
        <Suspense fallback={<div />}>
          <NavigationBackHeader />
          <InsertEmailAccountPage />
        </Suspense>
      </Route>

      <Route path="/extra-ticket" exact>
        <Suspense fallback={<div />}>
          <ExtraTicketPage />
        </Suspense>
      </Route>

      <Route path="/sign-in-extra-ticket" exact>
        <Suspense fallback={<div />}>
          <NavigationBackHeader />
          <SignInExtraTicketPage />
        </Suspense>
      </Route>

      <Route path="/sign-in-custom-link" exact>
        <Suspense fallback={<div />}>
          <NavigationBackHeader />
          <SignInCustomLinkPage />
        </Suspense>
      </Route>

      <Route path="/receive-extra-ticket" exact>
        <Suspense fallback={<div />}>
          <ReceiveExtraTicketPage />
        </Suspense>
      </Route>

      <Route path="/validate-extra-ticket" exact>
        <Suspense fallback={<div />}>
          <ValidateExtraTicket />
        </Suspense>
      </Route>

      <Route path="/select-tickets" exact>
        <Suspense fallback={<div />}>
          <NavigationBackHeader hasTicketCounter />
          <SelectTicketsPage />
        </Suspense>
      </Route>

      <Route path="/validate-account" exact>
        <Suspense fallback={<div />}>
          <ValidateAccountPage />
        </Suspense>
      </Route>

      <Route path="/contribution-done" exact>
        <Suspense fallback={<div />}>
          <ContributionDonePage />
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
            <ExperimentRouteComponent
              featureFlagId="impact-page-feature-flag"
              source="https://projetos.ribon.io/impact"
            >
              <ImpactPage />
            </ExperimentRouteComponent>
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
              <ExperimentRouteComponent
                featureFlagId="support-cause-page-feature-flag"
                source="https://projetos.ribon.io/support-cause"
              >
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
              </ExperimentRouteComponent>
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
              <ExperimentRouteComponent
                featureFlagId="support-non-profit-page-feature-flag"
                source="https://projetos.ribon.io/support-non-profit"
              >
                <WalletLayout hideWallet>
                  <PaymentInformationProvider>
                    <CardPaymentInformationProvider>
                      <CryptoPaymentProvider>
                        <SupportNonProfitPage />
                      </CryptoPaymentProvider>
                    </CardPaymentInformationProvider>
                  </PaymentInformationProvider>
                </WalletLayout>
              </ExperimentRouteComponent>
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

      <Route path="/promoters/checkout/pix-instructions" exact>
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
                          <PixInstructionsPage />
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

      <Route path="/expired-link" exact>
        <Suspense fallback={<div />}>
          <ExpiredLinkPage />
        </Suspense>
      </Route>

      <Route path="/benefits" exact>
        <Suspense fallback={<div />}>
          <MainLayout hideHeader fullSize>
            <AboutPage />
          </MainLayout>
        </Suspense>
      </Route>

      <Route path="/monthly-contribution-canceled" exact>
        <Suspense fallback={<div />}>
          <ContributionCanceledPage />
        </Suspense>
      </Route>

      <Route path="/monthly-contributions" exact>
        <Suspense fallback={<div />}>
          <MonthlyContributionsPage />
        </Suspense>
      </Route>

      <Route path="/survey" exact>
        <Suspense fallback={<div />}>
          <SurveyPage />
        </Suspense>
      </Route>

      <Route path="/campaign" exact>
        <Suspense fallback={<div />}>
          <CampaignPage />
        </Suspense>
      </Route>

      <Route path="/dia-de-doar" exact>
        <Suspense fallback={<div />}>
          <MainLayout hideHeader fullSize>
            <AboutPage />
          </MainLayout>
        </Suspense>
      </Route>

      <Route path="/custom-link" exact>
        <Suspense fallback={<div />}>
          <MainLayout hideHeader>
            <CustomLinkPage />
          </MainLayout>
        </Suspense>
      </Route>

      <Route path="/custom-link-created" exact>
        <Suspense fallback={<div />}>
          <CustomLinkCreatedPage />
        </Suspense>
      </Route>
    </Switch>
  );
}

export default RoutesComponent;

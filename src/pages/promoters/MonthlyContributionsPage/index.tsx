import ArrowLeft from "assets/icons/arrow-left-green.svg";
import useNavigation from "hooks/useNavigation";
import DeleteButton from "assets/icons/delete-icon.svg";
import useToast from "hooks/useToast";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { logEvent } from "lib/events";
import useSubscriptions from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import * as S from "./styles";

function MonthlyContributionPage(): JSX.Element {
  const { navigateBack } = useNavigation();
  const { currentUser } = useCurrentUser();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.monthlyContributionsPage",
  });

  const { userSubscriptions, cancelSubscription } = useSubscriptions();
  const { subscriptions } = userSubscriptions(currentUser?.id);

  useEffect(() => {
    logEvent("P25_view");
  });

  const handleCancelSubscription = (subscriptionId?: string | number) => {
    logEvent("cancelSubs_click");
    if (subscriptionId) {
      cancelSubscription(subscriptionId);
    }
  };

  const personPaymentItems: JSX.Element[] | undefined = subscriptions?.flatMap(
    (subscription: any) =>
      subscription.personPayments.map((personPayment: any) => (
        <S.PaymentContainer key={personPayment.id}>
          <S.IconTextContainer>
            <S.Amount>{personPayment.offer.price}</S.Amount>
            <S.Icon
              src={DeleteButton}
              onClick={() => handleCancelSubscription(subscription.id)}
            />
          </S.IconTextContainer>

          <S.Text>
            {t("to")}
            <S.HighlightedText>{personPayment.receiver.name}</S.HighlightedText>
          </S.Text>
          <S.Text>
            {t("nextContribution")}
            <S.HighlightedText>
              {new Date(personPayment.paidDate).toLocaleDateString()}
            </S.HighlightedText>
          </S.Text>
        </S.PaymentContainer>
      )),
  );
  return (
    <S.Container>
      <S.BackArrowButton src={ArrowLeft} onClick={navigateBack} />
      <S.Title>{t("title")}</S.Title>
      <S.SubscriptionContainer>{personPaymentItems}</S.SubscriptionContainer>
      <CancelSubscriptionModal
        visible={cancelModalVisible}
        onClose={() => closeCancelModal()}
        sendCancelEmail={() => {
          handleCancelSubscription();
        }}
      />
    </S.Container>
  );
}

export default MonthlyContributionPage;

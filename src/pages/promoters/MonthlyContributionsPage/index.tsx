import ArrowLeft from "assets/icons/arrow-left-green.svg";
import useNavigation from "hooks/useNavigation";
import DeleteButton from "assets/icons/delete-icon.svg";
import useToast from "hooks/useToast";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { logEvent } from "lib/events";
import { useSubscriptions } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import CancelSubscriptionModal from "./CancelSubscriptionModal";
import * as S from "./styles";
import { logError } from "services/crashReport";

function MonthlyContributionPage(): JSX.Element {
  const { navigateBack } = useNavigation();
  const { currentUser } = useCurrentUser();
  const { userSubscriptions, cancelSubscription } = useSubscriptions();
  const { subscriptions } = userSubscriptions(currentUser?.id);

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.monthlyContributionsPage",
  });

  const toast = useToast();
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [cancelSubscriptionId, setSubscriptionId] = useState<string | number>(
    "",
  );

  useEffect(() => {
    logEvent("P25_view");
  });

  const openCancelModal = (subscriptionId: string | number) => {
    setSubscriptionId(subscriptionId);
    setCancelModalVisible(true);
  };

  const closeCancelModal = () => {
    setSubscriptionId("");
    setCancelModalVisible(false);
  };

  const handleCancelSubscription = async () => {
    if (!cancelSubscriptionId) {
      return;
    }

    logEvent("cancelSubs_click");
    try {
      const response = await cancelSubscription(cancelSubscriptionId);
      console.log(response);
      // toast({
      //   type: "success",
      //   message: t("cancelSubscriptionSuccess"),
      //   icon: "check_circle",
      //   position: "top-right",
      // });
    } catch (error) {
      logError(error);
    } finally {
      closeCancelModal();
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
              onClick={() => openCancelModal(personPayment.subscriptionId)}
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

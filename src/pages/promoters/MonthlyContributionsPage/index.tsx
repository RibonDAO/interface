import ArrowLeft from "assets/icons/arrow-left-green.svg";
import useNavigation from "hooks/useNavigation";
import useToast from "hooks/useToast";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { logEvent } from "lib/events";
import { useSubscriptions } from "@ribon.io/shared/hooks";
import { logError } from "services/crashReport";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared/styles";
import { useLocation } from "react-router-dom";
import {
  add30DaysAndFormatDate,
  stringToLocaleDateString,
} from "lib/formatters/dateFormatters";
import { useLanguage } from "hooks/useLanguage";
import Subscription from "@ribon.io/shared/types/entities/Subscription";
import CancelSubscriptionModal from "./CancelSubscriptionModal";
import * as S from "./styles";

type LocationState = {
  from: string;
};
function MonthlyContributionPage(): JSX.Element {
  const { navigateBack, navigateTo } = useNavigation();
  const { userSubscriptions, sendCancelSubscriptionEmail } = useSubscriptions();
  const { subscriptions } = userSubscriptions();
  const { currentLang } = useLanguage();
  const {
    state: { from },
  } = useLocation<LocationState>();

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

  const nextPaymetAttempt = (subscription: Subscription) =>
    subscription.nextPaymentAttempt
      ? stringToLocaleDateString(subscription.nextPaymentAttempt)
      : add30DaysAndFormatDate(subscription.createdAt, currentLang);

  const handleCancelSubscription = async () => {
    if (!cancelSubscriptionId) {
      return;
    }

    logEvent("cancelSubs_click");
    try {
      const response = await sendCancelSubscriptionEmail(cancelSubscriptionId);
      if (response) {
        toast({
          type: "success",
          message: t("cancelSubscriptionSuccess"),
          icon: "check_circle",
          position: "top-right",
        });
      }
    } catch (error) {
      logError(error);
    } finally {
      closeCancelModal();
    }
  };

  const subscriptionItems: JSX.Element[] = [];

  subscriptions?.forEach((subscription: any) => {
    subscriptionItems.push(
      <S.PaymentContainer key={subscription.id}>
        <S.IconTextContainer>
          <S.Amount>{subscription.offer?.price}</S.Amount>
          <Icon
            name="delete"
            onClick={() => openCancelModal(subscription.id)}
            backgroundColor={theme.colors.brand.secondary[600]}
            hoveredBackgroundColor={theme.colors.brand.primary[600]}
            color={theme.colors.neutral10}
          />
        </S.IconTextContainer>
        <S.Text>
          {t("to")}
          <S.HighlightedText>{subscription.receiver.name}</S.HighlightedText>
        </S.Text>
        <S.Text>
          {t("nextContribution")}
          <S.HighlightedText>
            {nextPaymetAttempt(subscription)}
          </S.HighlightedText>
        </S.Text>
      </S.PaymentContainer>,
    );
  });

  return (
    <S.Container>
      <S.BackArrowButton
        src={ArrowLeft}
        onClick={() =>
          from === "donation-done-cause"
            ? navigateTo("promoters/support-cause")
            : navigateBack()
        }
      />
      <S.Title>{t("title")}</S.Title>
      {subscriptions && (
        <S.SubscriptionContainer>{subscriptionItems}</S.SubscriptionContainer>
      )}
      <CancelSubscriptionModal
        visible={cancelModalVisible}
        onClose={closeCancelModal}
        sendCancelEmail={handleCancelSubscription}
      />
    </S.Container>
  );
}

export default MonthlyContributionPage;

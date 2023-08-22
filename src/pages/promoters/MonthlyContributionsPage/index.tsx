// import { PersonPayment } from "@ribon.io/shared";
import ArrowLeft from "assets/icons/arrow-left-green.svg";

// import useSubscriptions from "hooks/apiHooks/useSubscriptions";
import useNavigation from "hooks/useNavigation";
import DeleteButton from "assets/icons/delete-icon.svg";
import { useTranslation } from "react-i18next";
import useSubscriptions from "hooks/apiHooks/useSubscriptions";
import * as S from "./styles";

function MonthlyContributionPage(): JSX.Element {
  const { navigateBack } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.monthlyContributionsPage",
  });
  const { useUserSubscriptions } = useSubscriptions();
  const { data: userSubscriptions } = useUserSubscriptions();

  const personPaymentItems: JSX.Element[] | undefined =
    userSubscriptions?.flatMap((subscription) =>
      subscription.personPayments.map((personPayment) => (
        <S.PaymentContainer key={personPayment.id}>
          <S.IconTextContainer>
            <S.Amount>R$ {personPayment.amountCents}</S.Amount>
            <S.Icon src={DeleteButton} />
          </S.IconTextContainer>

          <S.Text>
            {t("to")}
            <S.HighlightedText>lala</S.HighlightedText>
          </S.Text>
          <S.Text>
            {t("nextContribution")}
            <S.HighlightedText>{personPayment.paidDate}</S.HighlightedText>
          </S.Text>
        </S.PaymentContainer>
      )),
    );
  return (
    <S.Container>
      <S.BackArrowButton src={ArrowLeft} onClick={navigateBack} />
      <S.Title>{t("title")}</S.Title>
      <S.SubscriptionContainer>{personPaymentItems}</S.SubscriptionContainer>
    </S.Container>
  );
}

export default MonthlyContributionPage;

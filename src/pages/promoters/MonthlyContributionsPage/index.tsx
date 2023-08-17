// import { PersonPayment } from "@ribon.io/shared";
import ArrowLeft from "assets/icons/arrow-left-green.svg";
// import Loader from "components/atomics/Loader";
// import useSubscriptions from "hooks/apiHooks/useSubscriptions";
import useNavigation from "hooks/useNavigation";
import DeleteButton from "assets/icons/delete-icon.svg";
import { useTranslation } from "react-i18next";
import * as S from "./styles";

function MonthlyContributionPage(): JSX.Element {
  const { navigateBack } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.monthlyContributionsPage",
  });
  // const { useUserSubscriptions } = useSubscriptions();
  // const { data: userSubscriptions, isLoading } = useUserSubscriptions();
  const userSubscriptions = [
    {
      id: 1,
      personPayments: [
        {
          id: 1,
          amountCents: 1000,
          receiverName: "Saúde",
          paidDate: "12/12/2012",
        },
      ],
    },
    {
      id: 2,
      personPayments: [
        {
          id: 3,
          amountCents: 1000,
          receiverName: "Against Malaria Foundation",
          paidDate: "12/12/2012",
        },
      ],
    },
    {
      id: 3,
      personPayments: [
        {
          id: 1,
          amountCents: 1000,
          receiverName: "teste",
          paidDate: "12/12/2012",
        },
      ],
    },
    {
      id: 4,
      personPayments: [
        {
          id: 3,
          amountCents: 1000,
          receiverName: "teste",
          paidDate: "12/12/2012",
        },
      ],
    },
  ];

  const personPaymentItems: JSX.Element[] = userSubscriptions.flatMap(
    (subscription) =>
      subscription.personPayments.map((personPayment) => (
        <S.PaymentContainer key={personPayment.id}>
          <S.IconTextContainer>
            <S.Amount>R$ {personPayment.amountCents}</S.Amount>
            <S.Icon src={DeleteButton} />
          </S.IconTextContainer>

          <S.Text>
            {t("to")}
            <S.HighlightedText>{personPayment.receiverName}</S.HighlightedText>
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

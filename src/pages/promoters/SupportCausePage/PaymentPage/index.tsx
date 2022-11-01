import ArrowLeft from "assets/icons/arrow-left-green.svg";
import useNavigation from "hooks/useNavigation";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Offer from "types/entities/Offer";
import Cause from "types/entities/Cause";
import * as S from "./styles";

type LocationState = {
  offer: Offer;
  cause: Cause;
};

function PaymentPage(): JSX.Element {
  const { navigateBack } = useNavigation();
  const { state } = useLocation<LocationState>();
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportWithCommunityPage.paymentPage",
  });

  return (
    <S.Container>
      <S.MainContainer>
        <S.BackArrowButton src={ArrowLeft} onClick={navigateBack} />
        <S.Title>
          {t("title")} <S.TitleHighlight>{state.cause.name}</S.TitleHighlight>
        </S.Title>
        <S.DonationValueText>{state.offer.price}</S.DonationValueText>
        <S.DonateButton text={t("button")} onClick={navigateBack} />
      </S.MainContainer>
    </S.Container>
  );
}

export default PaymentPage;

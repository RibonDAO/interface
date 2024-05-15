import RibonLogo from "assets/images/logo-ribon.svg";
import { useTranslation } from "react-i18next";
import useNavigation from "hooks/useNavigation";
import Ticket from "../../donations/GiveTicketPage/assets/ticket.svg";
import * as S from "./styles";

function CouponCollectedPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "coupons.couponCollectedPage",
  });

  const { navigateTo } = useNavigation();

  return (
    <S.Container>
      <S.MainContainer>
        <S.Header>
          <S.Logo src={RibonLogo} alt="ribon-logo" />
        </S.Header>
        <S.ContentContainer>
          <S.DefaultImage src={Ticket} />
          <S.TextContainer>
            <S.Title>{t("title")}</S.Title>
          </S.TextContainer>
        </S.ContentContainer>
        <S.ButtonContainer>
          <S.TextContainer>
            <S.Description>{t("description")}</S.Description>
          </S.TextContainer>
          <S.Link
            onClick={() => {
              navigateTo("/app-download");
            }}
          >
            {t("buttonText")}
          </S.Link>
        </S.ButtonContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default CouponCollectedPage;

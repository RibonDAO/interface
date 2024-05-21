import RibonLogo from "assets/images/logo-ribon.svg";
import { useTranslation } from "react-i18next";
import { useCouponContext } from "contexts/couponContext";
import { useEffect } from "react";
import useNavigation from "hooks/useNavigation";
import { logEvent } from "lib/events";
import ExpiredTicket from "./assets/off-ticket.svg";
import * as S from "./styles";

function ExpiredCouponPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "coupons.expiredCouponPage",
  });

  const { setCouponId } = useCouponContext();
  const { navigateTo } = useNavigation();

  useEffect(() => {
    logEvent("P38_view");
    setCouponId(undefined);
  }, []);

  return (
    <S.Container>
      <S.MainContainer>
        <S.Header>
          <S.Logo src={RibonLogo} alt="ribon-logo" />
        </S.Header>
        <S.ContentContainer>
          <S.DefaultImage src={ExpiredTicket} />
          <S.TextContainer>
            <S.Title>{t("title")}</S.Title>
            <S.Description>{t("subtitle")}</S.Description>
          </S.TextContainer>
        </S.ContentContainer>
        <S.ButtonContainer>
          <S.FilledButton
            onClick={() => {
              navigateTo("/causes");
            }}
          >
            {t("button")}
          </S.FilledButton>
        </S.ButtonContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default ExpiredCouponPage;

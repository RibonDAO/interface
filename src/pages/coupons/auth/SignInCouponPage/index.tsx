import { useTranslation } from "react-i18next";
import GoogleLogin from "components/moleculars/buttons/GoogleLogin";
import MagicLinkLogin from "components/moleculars/buttons/MagicLinkLogin";
import useNavigation from "hooks/useNavigation";
import AppleLogin from "components/moleculars/buttons/AppleLogin";
import { logEvent } from "lib/events";
import { useEffect } from "react";
import UserAvatar from "../../../auth/assets/user-avatar.svg";
import * as S from "./styles";

function SignInCouponPage() {
  const { t } = useTranslation("translation", {
    keyPrefix: "coupons.auth.signInPage",
  });

  const { navigateTo } = useNavigation();

  useEffect(() => {
    logEvent("P27_view", {
      from: "coupon_flow",
    });
  }, []);

  const onContinue = (pathname: string) => {
    navigateTo({
      pathname,
    });
  };

  return (
    <S.Container>
      <S.ImageContainer>
        <S.MainImage src={UserAvatar} />
      </S.ImageContainer>
      <S.ContentContainer>
        <S.Title>{t("title")}</S.Title>
        <S.ButtonContainer>
          <GoogleLogin
            onContinue={() => onContinue("/coupons/give-ticket")}
            from="coupon_flow"
          />
          <AppleLogin
            onContinue={() => onContinue("/coupons/give-ticket")}
            from="coupon_flow"
          />
          <MagicLinkLogin
            onContinue={() => onContinue("/coupons/insert-email")}
            from="coupon_flow"
          />
        </S.ButtonContainer>

        <S.FooterText>
          {t("footerStartText")}{" "}
          <a href={t("termsLink")} target="_blank" rel="noreferrer">
            {t("termsText")}
          </a>
          {t("footerEndText")}{" "}
          <a href={t("privacyPolicyLink")} target="_blank" rel="noreferrer">
            {t("privacyPolicyText")}
          </a>
        </S.FooterText>
      </S.ContentContainer>
    </S.Container>
  );
}

export default SignInCouponPage;

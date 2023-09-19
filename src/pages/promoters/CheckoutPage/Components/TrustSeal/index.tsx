import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import StripeIcon from "assets/icons/stripe.svg";
import * as S from "./styles";

function TrustSeal(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.recurrencePage",
  });

  return (
    <S.Container>
      <Icon
        name="verified_user"
        size="25px"
        color={theme.colors.brand.primary[600]}
      />
      <S.SealText>{t("sealText")}</S.SealText>
      <S.SealImage src={StripeIcon} />
    </S.Container>
  );
}

export default TrustSeal;

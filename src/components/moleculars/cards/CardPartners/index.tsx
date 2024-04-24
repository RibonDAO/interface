import { useTranslation } from "react-i18next";
import { useLanguage } from "hooks/useLanguage";
import { logEvent } from "lib/events";
import HandShake from "./assets/handshake.svg";
import BrazilianBrands from "./assets/br-brands.svg";
import * as S from "./styles";

function CardPartners(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "cardPartners",
  });

  const { currentLang } = useLanguage();

  const handleClick = () => {
    logEvent("partnersPage_click");
    window.open(t("ctaLink"), "_blank");
  };

  return (
    <S.Container>
      <S.Image src={HandShake} />
      <S.Title>{t("title")}</S.Title>
      <S.Subtitle>{t("subtitle")}</S.Subtitle>
      {currentLang === "pt-BR" && <S.Brands src={BrazilianBrands} />}
      <S.Cta onClick={handleClick}>{t("ctaText")}</S.Cta>
    </S.Container>
  );
}

export default CardPartners;

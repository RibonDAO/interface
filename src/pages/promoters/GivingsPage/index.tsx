import { useTranslation } from "react-i18next";
import * as S from "./styles";

function GivingsPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportTreasurePage.givingsPage",
  });
  return (
    <S.BodyContainer>
      <S.Title>{t("title")}</S.Title>
    </S.BodyContainer>
  );
}

export default GivingsPage;

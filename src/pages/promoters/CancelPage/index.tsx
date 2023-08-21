import { useTranslation } from "react-i18next";
import Illustration from "assets/images/cancel-subscription-illustration.svg";
import LeftImage from "assets/images/bottom-left-shape-red.svg";
import RightImage from "assets/images/top-right-shape.svg";
import LogoRibon from "assets/images/logo-ribon.svg";
import * as S from "./styles";

function ContributionCanceledPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.contributionCanceledPage",
  });

  return (
    <S.Container>
      <S.MainContainer>
        <S.LeftImage src={LeftImage} />
        <S.RightImage src={RightImage} />

        <S.ContentContainer>
          <S.LogoImage src={LogoRibon} />
          <S.DefaultImage src={Illustration} />

          <S.TextContainer>
            <S.Title>{t("title")}</S.Title>
            <S.Description>{t("description")}</S.Description>
          </S.TextContainer>
        </S.ContentContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default ContributionCanceledPage;

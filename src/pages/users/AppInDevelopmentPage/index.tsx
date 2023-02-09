import { useTranslation } from "react-i18next";
import LeftArrow from "assets/icons/arrow-left-green.svg";
import { newLogEvent } from "lib/events";
import useNavigation from "hooks/useNavigation";
import * as S from "./styles";
import IllustrationMobile from "./assets/illustration-mobile.svg";
import LeftImage from "./assets/left-image.svg";
import RightImage from "./assets/right-image.svg";
import SurveyIcon from "./assets/survey-icon.svg";

function AppInDevelopmentPage() {
  const { t } = useTranslation("translation", {
    keyPrefix: "appInDevelopmentPage",
  });

  const { navigateBack } = useNavigation();

  const handleGoBack = () => {
    navigateBack();
  };
  return (
    <>
      <S.LeftImage src={LeftImage} />
      <S.RightImage src={RightImage} />

      <S.Container>
        <S.LeftArrow
          src={LeftArrow}
          alt="back-arrow-button"
          onClick={() => handleGoBack()}
        />
        <S.Wrapper>
          <S.Image src={IllustrationMobile} />
          <S.Title>{t("title")}</S.Title>
          <S.Description>{t("description")}</S.Description>
          <S.SurveyCard>
            <S.Image src={SurveyIcon} />
            <S.SurveyDescription>{t("surveyDescription")}</S.SurveyDescription>
            <S.SurveyButton
              href={t("surveyLink")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => newLogEvent("click", "webDwnldSurveyBtn")}
            >
              {t("surveyButton")}
            </S.SurveyButton>
          </S.SurveyCard>
        </S.Wrapper>
      </S.Container>
    </>
  );
}

export default AppInDevelopmentPage;

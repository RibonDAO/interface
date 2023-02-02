import { useTranslation } from "react-i18next";
import LeftArrow from "assets/icons/arrow-left-green.svg";
import { logEvent } from "services/analytics/firebase";
import useNavigation from "hooks/useNavigation";
import { useLanguage } from "hooks/useLanguage";
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

  const { currentLang } = useLanguage();

  const handleSurveyButtonClick = () => {
    logEvent("webDwnldSurveyBtn_click");

    if (currentLang === "pt-BR") {
      return "https://docs.google.com/forms/d/e/1FAIpQLSfBpxhZIYl5QKvtlPGP3UOWpVskIRn_RD5-o1QF6b4QcO0lsA/viewform?usp=sf_link";
    }
    return "https://docs.google.com/forms/d/e/1FAIpQLSc6Z7YQh56lIxD3uh1kX8TwlbkF6c9Q4nkQ1SXdblOljzFs-w/viewform?usp=sf_link";
  };

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
              href={handleSurveyButtonClick()}
              target="_blank"
              rel="noopener noreferrer"
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

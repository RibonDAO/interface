import { useTranslation } from "react-i18next";
import useBreakpoint from "hooks/useBreakpoint";
import theme from "styles/theme";
import NewsImage from "./assets/news-image.svg";
import AppDownloadSection from "../AppDownloadSection";
import LeftImage from "./assets/left-background.svg";
import RightImage from "./assets/right-background.svg";
import BackgroundImage from "./assets/for-you-background.svg";
import * as S from "./styles";

function ForYouPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage",
  });

  const { isMobile } = useBreakpoint();

  function renderPage() {
    return (
      <S.Container>
        {isMobile ? (
          <S.TopImageBackground src={BackgroundImage} />
        ) : (
          <>
            <S.LeftImage src={LeftImage} />
            <S.RightImage src={RightImage} />
          </>
        )}
        <AppDownloadSection
          title={t("title")}
          image={NewsImage}
          hasBackButton={false}
          firstButton={{
            text: t("getAppButtonText"),
            backgroundColor: theme.colors.brand.primary[800],
            textColor: theme.colors.neutral10,
          }}
        />
      </S.Container>
    );
  }

  return <S.Container>{renderPage()}</S.Container>;
}

export default ForYouPage;

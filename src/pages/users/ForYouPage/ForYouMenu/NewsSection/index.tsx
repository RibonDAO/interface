import theme from "styles/theme";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { logEvent } from "lib/events";
import AppDownloadTemplate from "pages/users/AppDownloadPage/AppDownloadTemplate";
import NewsImage from "./assets/news-image.svg";
import * as S from "./styles";

function NewsSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage.newsSection",
  });

  useEffect(() => {
    logEvent("P15_view");
  }, []);

  function renderPage() {
    return (
      <S.Container>
        <AppDownloadTemplate
          title={t("title")}
          image={NewsImage}
          hasBackButton={false}
          description={t("description")}
          firstButton={{
            text: t("buttonDownloadApp"),
            backgroundColor: theme.colors.brand.primary[800],
            textColor: theme.colors.neutral10,
          }}
          spacingTopDonationFlow
        />
      </S.Container>
    );
  }

  return renderPage();
}

export default NewsSection;

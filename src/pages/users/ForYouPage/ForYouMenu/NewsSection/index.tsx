import theme from "styles/theme";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { logEvent } from "lib/events";
import NewAppDownloadTemplate from "pages/users/AppDownloadPage/NewAppDownloadTemplate";
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
        <NewAppDownloadTemplate
          title={t("newTitle")}
          image={NewsImage}
          hasBackButton={false}
          description={t("newDescription")}
          firstButton={{
            text: t("newButtonDownloadApp"),
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

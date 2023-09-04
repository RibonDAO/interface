import AppDownloadTemplate from "pages/users/AppDownloadPage/AppDownloadTemplate";
import theme from "styles/theme";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { logEvent } from "lib/events";
import { useExperiment } from "@growthbook/growthbook-react";
import NewAppDownloadTemplate from "pages/users/AppDownloadPage/NewAppDownloadTemplate";
import NewsImage from "./assets/news-image.svg";
import * as S from "./styles";

function NewsSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage.newsSection",
  });

  const variation = useExperiment({
    key: "understanding-test",
    variations: ["control", "product", "growth"],
  });

  useEffect(() => {
    logEvent("P15_view");
  }, []);

  function renderPage() {
    return (
      <S.Container>
        {variation.value === "product" ? (
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
        ) : (
          <AppDownloadTemplate
            title={t("title")}
            image={NewsImage}
            hasBackButton={false}
            firstButton={{
              text: t("getAppButtonText"),
              backgroundColor: theme.colors.brand.primary[800],
              textColor: theme.colors.neutral10,
            }}
            spacingTopDonationFlow
          />
        )}
      </S.Container>
    );
  }

  return renderPage();
}

export default NewsSection;

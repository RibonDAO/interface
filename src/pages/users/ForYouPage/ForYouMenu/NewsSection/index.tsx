import AppDownloadTemplate from "pages/users/AppDownloadPage/AppDownloadTemplate";
import theme from "styles/theme";
import { useTranslation } from "react-i18next";
import NewsImage from "./assets/news-image.svg";
import * as S from "./styles";

function NewsSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage.newsSection",
  });

  function renderPage() {
    return (
      <S.Container>
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
      </S.Container>
    );
  }

  return renderPage();
}

export default NewsSection;

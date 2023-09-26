import { useTranslation } from "react-i18next";

import ArticleLayout from "components/moleculars/layouts/ArticleLayout";
import { RibonOnboarding } from "utils/constants/Articles";

function RibonArticleOnboarding() {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage.newsSection",
  });

  return <ArticleLayout article={RibonOnboarding(t)} readMoreText="" />;
}

export default RibonArticleOnboarding;

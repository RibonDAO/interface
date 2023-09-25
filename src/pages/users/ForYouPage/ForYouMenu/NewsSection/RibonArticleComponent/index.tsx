import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { logEvent } from "lib/events";

import ArticleLayout from "components/moleculars/layouts/ArticleLayout";
import { RibonOnboarding } from "utils/constants/Articles";

function RibonArticleOnboarding() {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage.newsSection",
  });

  useEffect(() => {
    logEvent("P15_view");
  }, []);

  return <ArticleLayout article={RibonOnboarding(t)} readMoreText="" />;
}

export default RibonArticleOnboarding;

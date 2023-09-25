import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { logEvent } from "lib/events";
import ArticleLayout from "components/moleculars/layouts/ArticleLayout";
import { useArticles } from "@ribon.io/shared/hooks";
import { Article } from "@ribon.io/shared/types";
import { getLocalStorageItem, setLocalStorageItem } from "@ribon.io/shared/lib";
import { useCurrentUser } from "contexts/currentUserContext";
import * as S from "./styles";
import RibonArticleOnboarding from "./RibonArticleComponent";

function NewsSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage.newsSection",
  });

  const IS_USER_ONBOARDING = "IS_USER_ONBOARDING";

  const [articles, setArticles] = useState<Article[]>([]);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const { currentUser } = useCurrentUser();

  const { getUserArticles } = useArticles();

  useEffect(() => {
    const fetchArticles = async () => {
      const currentArticles = await getUserArticles();
      setArticles(currentArticles);
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    logEvent("P15_view");
  }, []);

  useEffect(() => {
    const fetchFirstTimeSeeingOnboarding = async () => {
      const firstTimeSeeingOnboarding = await getLocalStorageItem(
        `${IS_USER_ONBOARDING}_${currentUser?.id}`,
      );

      if (
        firstTimeSeeingOnboarding === null ||
        Number(firstTimeSeeingOnboarding) < 3
      ) {
        await setLocalStorageItem(
          `${IS_USER_ONBOARDING}_${currentUser?.id}`,
          String(Number(firstTimeSeeingOnboarding) + 1),
        );
        setIsOnboarding(true);
      } else {
        setIsOnboarding(false);
      }
    };

    fetchFirstTimeSeeingOnboarding();
  }, []);

  return (
    <S.Container>
      <S.ArticlesContainer>
        {isOnboarding && <RibonArticleOnboarding />}
        {articles &&
          articles.map((article) => (
            <ArticleLayout
              key={article.id}
              article={article}
              readMoreText={t("openPostButtonText")}
            />
          ))}
      </S.ArticlesContainer>
    </S.Container>
  );
}

export default NewsSection;

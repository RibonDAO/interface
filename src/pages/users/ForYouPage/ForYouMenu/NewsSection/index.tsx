import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { logEvent } from "lib/events";
import ArticleLayout from "components/moleculars/layouts/ArticleLayout";
import { useArticles, useDonatedToday } from "@ribon.io/shared/hooks";
import { Article } from "@ribon.io/shared/types";
import { getLocalStorageItem, setLocalStorageItem } from "@ribon.io/shared/lib";
import { useCurrentUser } from "contexts/currentUserContext";
import useNavigation from "hooks/useNavigation";

import { useTasksContext } from "contexts/tasksContext";

import NewsImage from "./assets/news-image.svg";
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
  const { donatedToday } = useDonatedToday();
  const { getUserArticles } = useArticles();

  const { navigateTo } = useNavigation();

  const { registerAction } = useTasksContext();

  useEffect(() => {
    const fetchArticles = async () => {
      const currentArticles = await getUserArticles();
      setArticles(currentArticles);
    };

    fetchArticles();
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

  useEffect(() => {
    if (isOnboarding) {
      logEvent("P20_onboardingPost_view");
    }
  }, [isOnboarding]);

  useEffect(() => {
    if (donatedToday) {
      logEvent("P20_view");
      registerAction("for_you_news_tab_view");
    } else {
      logEvent("P16_view");
    }
  }, [donatedToday]);

  function renderPage() {
    if (donatedToday) {
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

    return (
      <S.BlockedContainer>
        <S.Image src={NewsImage} />
        <S.TextContainer>
          <S.Title>{t("title")}</S.Title>
          <S.Text>{t("text")}</S.Text>
        </S.TextContainer>
        <S.Button
          onClick={() => {
            navigateTo("/causes");
          }}
        >
          {t("donateButtonText")}
        </S.Button>
      </S.BlockedContainer>
    );
  }
  return renderPage();
}

export default NewsSection;

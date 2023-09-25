import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { logEvent } from "lib/events";
import ArticleLayout from "components/moleculars/layouts/ArticleLayout";
import { useArticles, useCanDonate } from "@ribon.io/shared/hooks";
import { Article } from "@ribon.io/shared/types";
import useNavigation from "hooks/useNavigation";
import { useIntegrationId } from "hooks/useIntegrationId";
import extractUrlValue from "lib/extractUrlValue";
import { PLATFORM } from "utils/constants";
import NewsImage from "./assets/news-image.svg";
import * as S from "./styles";

function NewsSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage.newsSection",
  });

  const [articles, setArticles] = useState<Article[]>([]);

  const { getUserArticles } = useArticles();
  const integrationId = useIntegrationId();
  const { history, navigateTo } = useNavigation();
  const externalId = extractUrlValue("external_id", history.location.search);
  const { canDonate } = useCanDonate(integrationId, PLATFORM, externalId);

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

  function renderPage() {
    if (!canDonate) {
      return (
        <S.Container>
          <S.ArticlesContainer>
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

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { logEvent } from "lib/events";
import ArticleLayout from "components/moleculars/layouts/ArticleLayout";
import { useArticles } from "@ribon.io/shared/hooks";
import { Article } from "@ribon.io/shared/types";
import * as S from "./styles";

function NewsSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage.newsSection",
  });

  const [articles, setArticles] = useState<Article[]>([]);

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

  function renderPage() {
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

  return renderPage();
}

export default NewsSection;

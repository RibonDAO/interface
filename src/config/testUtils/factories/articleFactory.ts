import { Article } from "@ribon.io/shared/types";

function ArticleFactory(params: Partial<Article> = {}): Article {
  const defaultValues: Article = {
    id: 1,
    title: "How to donate", 
    imageUrl: "imageurl", 
    visible: true,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    publishedAt: new Date().toDateString(),
    publishedAtInWords: "1 day ago",
    author: {
      id: 1,
      name: "Ribon"
    }
  };
  return Object.assign(defaultValues, params) as Article;
}

export default ArticleFactory;

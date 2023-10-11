import { Article } from "@ribon.io/shared/types";
import Icon from "components/atomics/Icon";
import { logEvent } from "lib/events";
import { theme } from "@ribon.io/shared/styles";
import VendorIcon from "./assets/VendorIcon";
import * as S from "./styles";

const VENDOR = "Ribon";

const PROTOCOL_REGEX = /^(http|https):\/\//;

export type Props = {
  article: Article;
  readMoreText: string;
};

export default function ArticleLayout({ article, readMoreText }: Props) {
  const hasLink = Boolean(article?.link);

  const { secondary } = theme.colors.brand;

  const renderIcon = () => {
    const { name } = article.author;

    return name === VENDOR ? (
      <VendorIcon />
    ) : (
      <Icon name="newspaper" size="20px" color={secondary[400]} />
    );
  };

  const renderAuthorName = () => {
    const { name } = article.author;
    const style =
      name === VENDOR ? (
        <S.greenText>{name}</S.greenText>
      ) : (
        <S.orangeText>{name}</S.orangeText>
      );

    return style;
  };

  const handlePress = () => {
    logEvent("P20_postBtn_click", { idPost: article.id });

    let link = article?.link;

    if (link) {
      if (!PROTOCOL_REGEX.test(link)) link = `https://${link}`;
      window.open(link);
    }

    return null;
  };

  const renderContentFooter = () => (
    <S.containerFooter onClick={handlePress}>
      <S.footerText>{readMoreText}</S.footerText>
      <Icon size="20px" name="arrow_right_alt" color={secondary[900]} />
    </S.containerFooter>
  );

  return (
    <S.Container onClick={handlePress}>
      <S.authorContainer>
        {renderIcon()}
        {renderAuthorName()}
        <S.textDivider>·</S.textDivider>
        <S.textSecondary>{article.publishedAtInWords}</S.textSecondary>
      </S.authorContainer>
      <S.Title>{article.title}</S.Title>

      <S.imageContainer>
        <S.Image src={article.imageUrl} />
        {hasLink && renderContentFooter()}
      </S.imageContainer>
    </S.Container>
  );
}

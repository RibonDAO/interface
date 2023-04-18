import { useTranslation } from "react-i18next";
import ForYouMenu from "./ForYouMenu";
import * as S from "./styles";

function ForYouPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage",
  });

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <ForYouMenu />
    </S.Container>
  );
}

export default ForYouPage;

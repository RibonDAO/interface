import ArrowLeft from "assets/icons/arrow-left-green.svg";
import useNavigation from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import * as S from "./styles";

function MonthlyContributionPage(): JSX.Element {
  const { navigateBack } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.monthlyContributionsPage",
  });

  return (
    <S.Container>
      <S.BackArrowButton src={ArrowLeft} onClick={navigateBack} />
      <S.Title>{t("title")}</S.Title>
    </S.Container>
  );
}

export default MonthlyContributionPage;

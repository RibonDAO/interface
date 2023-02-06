import DownloadIcon from "assets/icons/download-app-icon-green.svg";
import CardIconText from "components/moleculars/cards/CardIconText";
import { useTranslation } from "react-i18next";
import ArrowRight from "assets/icons/arrow-right-blue-icon.svg";
import useNavigation from "hooks/useNavigation";
import * as S from "./styles";

function GetTheAppItem(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.layoutHeader.getTheAppItem",
  });

  const { navigateTo } = useNavigation();

  const handleClick = () => {
    navigateTo("/app-in-development");
  };

  return (
    <S.Container onClick={handleClick}>
      <CardIconText
        text={t("getTheAppText")}
        icon={DownloadIcon}
        rightComponent={<S.GoButton src={ArrowRight} onClick={handleClick} />}
      />
    </S.Container>
  );
}

export default GetTheAppItem;

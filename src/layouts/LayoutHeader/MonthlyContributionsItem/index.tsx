import contributionIcon from "assets/icons/volunteer-activism-dark-green.svg";
import CardIconText from "components/moleculars/cards/CardIconText";
import { useTranslation } from "react-i18next";
import ArrowRight from "assets/icons/arrow-right-blue-icon.svg";
import { logEvent, newLogEvent } from "lib/events";
import useNavigation from "hooks/useNavigation";
import * as S from "./styles";

function MonthlyContributionsItem(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.layoutHeader.monthlyContributionsItem",
  });
  const { navigateTo } = useNavigation();

  const handleClick = () => {
    logEvent("manageSubscription_click");
    navigateTo("/monthly-contributions");

    newLogEvent("click", "manageSubscription", {
      from: "configPage",
    });
  };

  return (
    <S.Container onClick={handleClick}>
      <CardIconText
        text={t("monthlyContributionsText")}
        icon={contributionIcon}
        rightComponent={<S.GoButton src={ArrowRight} onClick={handleClick} />}
      />
    </S.Container>
  );
}

export default MonthlyContributionsItem;

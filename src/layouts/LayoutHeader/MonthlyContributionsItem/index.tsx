import contributionIcon from "assets/icons/volunteer-activism-dark-green.svg";
import CardIconText from "components/moleculars/cards/CardIconText";
import { useTranslation } from "react-i18next";
import ArrowRight from "assets/icons/arrow-right-blue-icon.svg";
import { logEvent } from "lib/events";
import { useSubscriptions } from "@ribon.io/shared/hooks";
import useNavigation from "hooks/useNavigation";
import Loader from "components/atomics/Loader";
import * as S from "./styles";

function MonthlyContributionsItem(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.layoutHeader.monthlyContributionsItem",
  });
  const { navigateTo } = useNavigation();
  const { userSubscriptions } = useSubscriptions();

  const { isLoading, subscriptions } = userSubscriptions();

  const handleClick = () => {
    logEvent("manageSubs_click", {
      from: "configPage",
    });

    if (isLoading) return <Loader />;

    if (subscriptions?.length === 0 || !subscriptions) {
      navigateTo("/promoters/support-cause");
    } else {
      navigateTo("/monthly-contributions");
    }

    return navigateTo("/monthly-contributions");
  };

  return (
    <S.Container onClick={handleClick}>
      <CardIconText
        text={t("monthlyContributionsText")}
        icon={contributionIcon}
        rightComponent={
          <S.GoButton src={ArrowRight} onClick={() => handleClick} />
        }
      />
    </S.Container>
  );
}

export default MonthlyContributionsItem;

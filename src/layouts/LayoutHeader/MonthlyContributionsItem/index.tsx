import contributionIcon from "assets/icons/volunteer-activism-dark-green.svg";
import CardIconText from "components/moleculars/cards/CardIconText";
import { useTranslation } from "react-i18next";
import ArrowRight from "assets/icons/arrow-right-blue-icon.svg";
import { logEvent } from "lib/events";
import { useSubscriptions } from "@ribon.io/shared/hooks";
import useNavigation from "hooks/useNavigation";
import Loader from "components/atomics/Loader";
import { useCurrentUser } from "contexts/currentUserContext";
import * as S from "./styles";

function MonthlyContributionsItem(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.layoutHeader.monthlyContributionsItem",
  });

  const { navigateTo } = useNavigation();
  const { userSubscriptions } = useSubscriptions();
  const { isLoading, subscriptions } = userSubscriptions();
  const { currentUser } = useCurrentUser();

  const handleClick = () => {
    logEvent("manageSubs_click", {
      from: "configPage",
    });

    if (!currentUser) return navigateTo("/promoters/support-cause");

    if (isLoading) return <Loader />;

    if (subscriptions && subscriptions?.length > 0) {
      return navigateTo("/monthly-contributions");
    } else {
      return navigateTo("/promoters/support-cause");
    }
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

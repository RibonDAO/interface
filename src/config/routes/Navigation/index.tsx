import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { logEvent } from "lib/events";
import { useTasksContext } from "contexts/tasksContext";
import useContributionActivity from "hooks/useContributionActivity";
import useAboutPageActivity from "hooks/useAboutPageActivity";
import { useExperiment } from "@growthbook/growthbook-react";
import CausesIconOn from "./assets/causesIconOn.svg";
import CausesIconOff from "./assets/causesIconOff.svg";
import ForYouIconOn from "./assets/forYouIconOn.svg";
import ForYouIconOff from "./assets/forYouIconOff.svg";
import ImpactIconOn from "./assets/impactIconOn.svg";
import ImpactIconOff from "./assets/impactIconOff.svg";
import GivingIconOn from "./assets/givingIconOn.svg";
import GivingIconOff from "./assets/givingIconOff.svg";
import AboutIconOn from "./assets/aboutIconOn.svg";
import AboutIconOff from "./assets/aboutIconOff.svg";
import * as S from "./styles";
import NavigationLink from "./NavigationLink";

export type Props = {
  isImpactPage: boolean;
};
function Navigation(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.menu",
  });
  const location = useLocation();
  const { search } = location;
  const { hasCompletedATask } = useTasksContext();
  const { newContributionActivity } = useContributionActivity();
  const { hasSeenAboutPageToday } = useAboutPageActivity();

  const variation = useExperiment({
    key: "understanding-test",
    variations: ["control", "product", "growth"],
  });

  function isInPath(route: any): boolean {
    const { menuOptions, path } = route;

    if (menuOptions) {
      return menuOptions.some((menuOption: any) =>
        [menuOption.path].includes(location.pathname),
      );
    }

    return [path].includes(location.pathname);
  }

  const communityDonationText =
    variation.value === "growth"
      ? t("donateWithRibonMenuItem")
      : t("communityMenuItem");

  let routes = [
    {
      path: "/causes",
      iconOn: CausesIconOn,
      iconOff: CausesIconOff,
      title: t("causesPageTitle"),
      event: "homeNavBtn_click",
    },
    {
      path: "/forYou",
      iconOn: ForYouIconOn,
      iconOff: ForYouIconOff,
      title: t("forYouPageTitle"),
      event: "forYouNavBtn_click",
      showActivityIndicatorCircle: hasCompletedATask,
    },
    {
      path: "/promoters/support-non-profit",
      iconOn: GivingIconOn,
      iconOff: GivingIconOff,
      title: t("givingPageTitle"),
      event: "giveCauseCard_click",
      showNewLabel: false,
      params: { from: "header" },
      menuOptions: [
        {
          path: "/promoters/support-cause",
          title: communityDonationText,
          event: "giveCauseCard_click",
          params: { from: "subheader" },
        },
        {
          path: "/promoters/support-non-profit",
          title: t("directDonationMenuItem"),
          event: "giveNonProfitCard_click",
          params: { from: "subheader" },
        },
      ],
    },
    {
      path: "/impact",
      iconOn: ImpactIconOn,
      iconOff: ImpactIconOff,
      title: t("impactPageTitle"),
      event: "impactNavBtn_click",
      showActivityIndicatorCircle: newContributionActivity,
    },
  ];

  if (variation.value === "growth") {
    routes = [
      ...routes,
      {
        path: "/about",
        iconOn: AboutIconOn,
        iconOff: AboutIconOff,
        title: t("aboutPageTitle"),
        event: "aboutNavBtn_click",
        showActivityIndicatorCircle: !hasSeenAboutPageToday,
      },
    ];
  }

  const handleEvent = (event: string, params = {}) => {
    logEvent(event, params);
  };

  return (
    <S.Container>
      {routes.map((route) => (
        <NavigationLink
          key={route.path}
          onClick={() => handleEvent(route.event, route.params)}
          to={{ pathname: route.path, search }}
          icon={isInPath(route) ? route.iconOn : route.iconOff}
          title={route.title}
          enabled={isInPath(route)}
          showActivityIndicatorCircle={route.showActivityIndicatorCircle}
          showNewLabel={route.showNewLabel}
          menuOptions={route?.menuOptions?.map((option) => ({
            ...option,
            onClick: () => handleEvent(option.event, option.params),
            search,
          }))}
        />
      ))}
    </S.Container>
  );
}

export default Navigation;

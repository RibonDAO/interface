import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { logEvent } from "lib/events";
import CausesIconOn from "./assets/causesIconOn.svg";
import CausesIconOff from "./assets/causesIconOff.svg";
import ImpactIconOn from "./assets/impactIconOn.svg";
import ImpactIconOff from "./assets/impactIconOff.svg";
import GivingIconOn from "./assets/givingIconOn.svg";
import GivingIconOff from "./assets/givingIconOff.svg";
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

  function isInPath(route: any): boolean {
    const { menuOptions, path } = route;

    if (menuOptions) {
      return menuOptions.some((menuOption: any) =>
        [menuOption.path].includes(location.pathname),
      );
    }

    return [path].includes(location.pathname);
  }

  const routes = [
    {
      path: "/",
      iconOn: CausesIconOn,
      iconOff: CausesIconOff,
      title: t("causesPageTitle"),
      event: "homeNavBtn_click",
    },
    {
      path: "/promoters/support-cause",
      iconOn: GivingIconOn,
      iconOff: GivingIconOff,
      title: t("givingPageTitle"),
      event: "givingNavBtn_click",
      menuOptions: [
        {
          path: "/promoters/support-cause",
          title: t("communityMenuItem"),
          event: "communityMenuBtn_click",
        },
        {
          path: "/promoters/support-non-profit",
          title: t("directDonationMenuItem"),
          event: "directDonationMenuBtn_click",
        },
      ],
    },
    {
      path: "/impact",
      iconOn: ImpactIconOn,
      iconOff: ImpactIconOff,
      title: t("impactPageTitle"),
      event: "impactNavBtn_click",
    },
  ];

  const handleEvent = (event: string) => {
    logEvent(event);
  };

  return (
    <S.Container>
      {routes.map((route) => (
        <NavigationLink
          key={route.path}
          onClick={() => handleEvent(route.event)}
          to={{ pathname: route.path, search }}
          icon={isInPath(route) ? route.iconOn : route.iconOff}
          title={route.title}
          enabled={isInPath(route)}
          menuOptions={route?.menuOptions?.map((option) => ({
            ...option,
            onClick: () => handleEvent(option.event),
            search,
          }))}
        />
      ))}
    </S.Container>
  );
}

export default Navigation;

import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { logEvent } from "lib/events";
import { useLanguage } from "hooks/useLanguage";
import { getMobileOS } from "lib/getMobileOS";
import useBreakpoint from "hooks/useBreakpoint";
import CausesIconOn from "./assets/causesIconOn.svg";
import CausesIconOff from "./assets/causesIconOff.svg";
import HomeIconOn from "./assets/homeIconOn.svg";
import HomeIconOff from "./assets/homeIconOff.svg";
import NavigationLink from "./NavigationLink";
import * as S from "./styles";

export type Props = {
  isImpactPage: boolean;
};

export type NavigationItem = {
  path: string;
  iconOn: string;
  iconOff: string;
  title: string;
  event: string;
  showNewLabel?: boolean;
  showActivityIndicatorCircle?: boolean;
  params?: any;
  menuOptions?: {
    path: string;
    title: string;
    event: string;
    params?: any;
  }[];
};

function Navigation(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.menu",
  });
  const location = useLocation();
  const { search } = location;
  const { currentLang } = useLanguage();
  const { isMobile } = useBreakpoint();

  function isInPath(route: any): boolean {
    const { menuOptions, path } = route;

    if (menuOptions) {
      return menuOptions.some((menuOption: any) =>
        [menuOption.path].includes(location.pathname),
      );
    }

    return [path].includes(location.pathname);
  }

  const routes: NavigationItem[] = [
    {
      path: "/causes",
      iconOn: HomeIconOn,
      iconOff: HomeIconOff,
      title: t("homeTitle"),
      event: "homeNavBtn_click",
    },
    {
      path: "/earn",
      iconOn: CausesIconOn,
      iconOff: CausesIconOff,
      title: t("earnTicketsPageTitle"),
      event: "earnTicketsNavBtn_click",
      params: {
        utmSource: currentLang === "pt-BR" ? "ribonweb_pt" : "ribonweb_en",
        utmMedium: "feature_toggle",
        utmCampaign: isMobile ? "mobile" : `desktop_${getMobileOS()}`,
      },
    },
  ];

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

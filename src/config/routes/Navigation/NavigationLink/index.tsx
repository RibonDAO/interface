import { LocationDescriptor } from "history";
import useBreakpoint from "hooks/useBreakpoint";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import FloatingSideMenu from "../NavigationMenus/FloatingSideMenu";
import AccordionMenu from "../NavigationMenus/AccordionMenu";
import * as S from "../styles";

export type Props = {
  to: LocationDescriptor;
  icon: string;
  enabled?: boolean;
  title: string;
  onClick: () => void;
  menuOptions?: {
    path: LocationDescriptor;
    title: string;
    search?: string;
    onClick?: () => void;
  }[];
  showActivityIndicatorCircle?: boolean;
  showNewLabel?: boolean;
};

function NavigationLink({
  to,
  icon,
  title,
  enabled = false,
  onClick,
  menuOptions,
  showActivityIndicatorCircle = false,
  showNewLabel = false,
}: Props): JSX.Element {
  const [menuVisible, setMenuVisible] = useState(false);

  const { isMobile } = useBreakpoint();
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.menu",
  });

  const renderFloatingSideMenu = () => {
    if (menuOptions && !isMobile) {
      return (
        <FloatingSideMenu
          visible={menuVisible}
          onMouseLeave={() => setMenuVisible(false)}
          menuOptions={menuOptions}
        />
      );
    }
    return null;
  };

  const renderSwipingMenu = () => {
    if (menuOptions && isMobile) {
      return <AccordionMenu menuOptions={menuOptions} />;
    }
    return null;
  };

  return (
    <>
      <S.StyledLinkContainer>
        <S.StyledLink
          onMouseEnter={() => setMenuVisible(true)}
          to={to}
          onClick={onClick}
        >
          <S.IconContainer>
            <S.Icon src={icon} />
            {showActivityIndicatorCircle && <S.RedBall />}
            {showNewLabel && <S.NewLabel>{t("new")}</S.NewLabel>}
          </S.IconContainer>
          <S.Title enabled={enabled}>{title}</S.Title>
        </S.StyledLink>
        {renderFloatingSideMenu()}
      </S.StyledLinkContainer>
      {renderSwipingMenu()}
    </>
  );
}

export default NavigationLink;

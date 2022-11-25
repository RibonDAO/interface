import { LocationDescriptor } from "history";
import SwipeUpIcon from "assets/icons/swipe-up.svg";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useScrollPosition } from "hooks/useScrollPosition";
import * as S from "./styles";

export type Props = {
  menuOptions: {
    path: LocationDescriptor;
    title: string;
  }[];
};

function AccordionMenu({ menuOptions }: Props): JSX.Element {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const [firstScroll, setFirstScroll] = useState(true);
  const [swiperPressed, setSwiperPressed] = useState(false);

  useEffect(() => {
    if (swiperPressed) {
      setTimeout(() => {
        setSwiperPressed(false);
      }, 100);
    }
  }, [swiperPressed]);

  useScrollPosition(
    ({ currPos }) => {
      const isShow = currPos.y > 0;
      if (isShow !== collapsed && firstScroll) {
        setCollapsed(isShow);
        setFirstScroll(false);
      }
    },
    [collapsed],
  );

  function showMenu(): boolean {
    if (menuOptions) {
      return menuOptions.some((menuOption: any) =>
        [menuOption.path].includes(location.pathname),
      );
    }
    return false;
  }

  function isButtonActive(path: LocationDescriptor): boolean {
    return [path].includes(location.pathname);
  }

  const handleSwiperClick = (): void => {
    setCollapsed(!collapsed);
    setSwiperPressed(true);
  };

  return (
    <S.Container visible={showMenu()}>
      <S.MenuSwiper pressed={swiperPressed} onClick={handleSwiperClick}>
        <S.Icon src={SwipeUpIcon} reversed={collapsed} />
      </S.MenuSwiper>
      <S.Menu collapsed={collapsed}>
        {menuOptions.map((option, index) => (
          <S.MenuItem
            $active={isButtonActive(option.path)}
            key={index.toString(10)}
            to={option.path}
          >
            {option.title}
          </S.MenuItem>
        ))}
      </S.Menu>
    </S.Container>
  );
}

export default AccordionMenu;

import { LocationDescriptor } from "history";
import { useState } from "react";
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
  }[];
};

function NavigationLink({
  to,
  icon,
  title,
  enabled = false,
  onClick,
  menuOptions,
}: Props): JSX.Element {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <S.StyledLink
      onMouseEnter={() => setMenuVisible(true)}
      to={to}
      onClick={onClick}
    >
      <S.Icon src={icon} />
      <S.Title enabled={enabled}>{title}</S.Title>
      {menuOptions && (
        <S.Menu
          visible={menuVisible}
          onMouseLeave={() => setMenuVisible(false)}
        >
          {menuOptions.map((option) => (
            <S.MenuItem to={option.path} onClick={onClick}>
              {option.title}
            </S.MenuItem>
          ))}
        </S.Menu>
      )}
    </S.StyledLink>
  );
}

export default NavigationLink;

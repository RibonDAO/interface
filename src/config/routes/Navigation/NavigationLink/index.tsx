import { LocationDescriptor } from "history";
import * as S from "../styles";

export type Props = {
  to: LocationDescriptor;
  icon: string;
  enabled?: boolean;
  title: string;
  onClick: () => void;
};
function NavigationLink({
  to,
  icon,
  title,
  enabled = false,
  onClick,
}: Props): JSX.Element {
  return (
    <S.StyledLink to={to} onClick={onClick}>
      <S.Icon src={icon} />
      <S.Title enabled={enabled}>{title}</S.Title>
    </S.StyledLink>
  );
}

export default NavigationLink;

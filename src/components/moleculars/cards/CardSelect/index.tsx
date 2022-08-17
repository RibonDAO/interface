import Dropdown, { Props as DropdownProps } from "components/atomics/Dropdown";
import * as S from "./styles";

export type Props = {
  dropdownProps: DropdownProps;
  children?: JSX.Element | JSX.Element[];
};
function CardSelect({ dropdownProps, children }: Props): JSX.Element {
  return (
    <S.Container>
      <Dropdown {...dropdownProps} />
      {children}
    </S.Container>
  );
}

export default CardSelect;

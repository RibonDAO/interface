import { LocationDescriptor } from "history";
import * as S from "./styles";

export type Props = {
  visible: boolean;
  onMouseLeave: () => void;
  menuOptions: {
    path: LocationDescriptor;
    title: string;
  }[];
};

function FloatingSideMenu({
  visible,
  onMouseLeave,
  menuOptions,
}: Props): JSX.Element {
  return (
    <S.Menu visible={visible} onMouseLeave={onMouseLeave}>
      {menuOptions.map((option, index) => (
        <S.MenuItem key={index.toString(10)} to={option.path}>
          {option.title}
        </S.MenuItem>
      ))}
    </S.Menu>
  );
}

export default FloatingSideMenu;

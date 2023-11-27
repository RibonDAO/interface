import Icon from "components/atomics/Icon";
import theme from "styles/theme";
import * as S from "./styles";

type IconProps = {
  name: string;
  color?: string;
};
type Props = {
  icon?: IconProps;
  text: string;
  customIcon?: string;
  onClickHandler: () => void;
};

function Item({ icon, text, customIcon, onClickHandler }: Props): JSX.Element {
  return (
    <S.Container onClick={() => onClickHandler()}>
      <S.ContainerIcon>
        {icon ? (
          <Icon
            name={icon.name ?? ""}
            color={icon.color ? icon.color : theme.colors.brand.primary[600]}
            size="24"
          />
        ) : null}
        {customIcon ? <S.CustomIcon src={customIcon} /> : null}
        <S.Text>{text}</S.Text>
      </S.ContainerIcon>
      <Icon
        name="arrow_forward_ios"
        size="24"
        color={icon?.color ? icon.color : ""}
      />
    </S.Container>
  );
}

export default Item;

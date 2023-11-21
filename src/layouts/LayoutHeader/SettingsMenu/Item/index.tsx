import Icon from "components/atomics/Icon";
import theme from "styles/theme";
import * as S from "./styles";

type Props = {
  icon?: string;
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
            name={icon ?? ""}
            color={theme.colors.brand.primary[600]}
            size="24"
          />
        ) : null}
        {customIcon ? <S.CustomIcon src={customIcon} /> : null}
        <S.Text>{text}</S.Text>
      </S.ContainerIcon>
      <Icon name="arrow_forward_ios" size="24" />
    </S.Container>
  );
}

export default Item;

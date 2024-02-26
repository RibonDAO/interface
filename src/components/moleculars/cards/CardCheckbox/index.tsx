import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import { useState } from "react";
import * as S from "./styles";

export type Props = {
  firstDescription: string;
  firstIconName: string;
  secondDescription: string;
  secondIconName: string;
  value: string;
  recurrence: string;
  tagText?: string;
  checked?: boolean;
  onClick?: () => void;
};
function CardCheckbox({
  firstDescription,
  firstIconName,
  secondDescription,
  secondIconName,
  value,
  recurrence,
  tagText,
  checked = false,
  onClick,
}: Props): JSX.Element {
  const [selected, setSelected] = useState(checked);

  const handleClick = () => {
    if (onClick !== undefined) {
      onClick();
    } else {
      setSelected(!selected);
    }
  };

  return (
    <S.Container
      onClick={handleClick}
      checked={onClick !== undefined ? checked : selected}
      data-testid="card-checkbox"
    >
      {tagText && <S.Tag>{tagText}</S.Tag>}
      <S.MainContent>
        <S.SelectValue>
          <S.Text>
            <S.Value>{value}</S.Value>/<S.Recurrence>{recurrence}</S.Recurrence>
          </S.Text>
          <S.Checkbox
            checked={onClick !== undefined ? checked : selected}
            data-testid="checkbox"
          />
        </S.SelectValue>
        <S.Description>
          <Icon
            name={firstIconName}
            size="24px"
            color={theme.colors.neutral[700]}
          />
          <S.DescriptionText>{firstDescription}</S.DescriptionText>
        </S.Description>
        <S.Description>
          <Icon
            name={secondIconName}
            size="24px"
            color={theme.colors.neutral[700]}
          />
          <S.DescriptionText>{secondDescription}</S.DescriptionText>
        </S.Description>
      </S.MainContent>
    </S.Container>
  );
}

export default CardCheckbox;

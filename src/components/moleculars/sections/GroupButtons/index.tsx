import { useEffect, useState } from "react";
import theme from "styles/theme";
import * as S from "./styles";

export type Props = {
  elements: any[];
  onChange?: (element: any, index: number) => void;
  nameExtractor: (element: any) => string;
  indexSelected?: number;
  backgroundColor?: string;
  backgroundColorOutline?: string;
  textColor?: string;
  textColorOutline?: string;
  borderColor?: string;
  borderColorOutline?: string;
};

function GroupButtons({
  elements,
  onChange,
  nameExtractor,
  indexSelected,
  backgroundColor = theme.colors.green40,
  backgroundColorOutline = theme.colors.neutral10,
  textColor = theme.colors.neutral10,
  textColorOutline = theme.colors.green40,
  borderColor = theme.colors.green40,
  borderColorOutline = theme.colors.green30,
}: Props): JSX.Element {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  const handleElementClick = (index: number, element: any) => {
    setSelectedButtonIndex(index);
    if (onChange) onChange(element, index);
  };

  useEffect(() => {
    if (indexSelected !== undefined) {
      handleElementClick(indexSelected, elements[indexSelected]);
    }
  }, [indexSelected]);

  function renderGroupButtons() {
    return elements?.map((element, index) => (
      <S.Button
        outline={index !== selectedButtonIndex}
        onClick={() => handleElementClick(index, element)}
        key={index.toString()}
        backgroundColor={backgroundColor}
        backgroundColorOutline={backgroundColorOutline}
        textColor={textColor}
        textColorOutline={textColorOutline}
        borderColor={borderColor}
        borderColorOutline={borderColorOutline}
      >
        <S.ButtonText>{nameExtractor(element)}</S.ButtonText>
      </S.Button>
    ));
  }

  return <S.Container>{renderGroupButtons()}</S.Container>;
}

export default GroupButtons;

import { newLogEvent } from "lib/events";
import { useState } from "react";
import theme from "styles/theme";
import * as S from "./styles";

export type Props = {
  elements: any[];
  onChange?: (element: any, index: number, event?: any) => void;
  nameExtractor: (element: any) => string;
  indexSelected?: number;
  backgroundColor?: string;
  backgroundColorOutline?: string;
  textColor?: string;
  textColorOutline?: string;
  borderColor?: string;
  borderColorOutline?: string;
  eventName?: string;
  eventParams?: (element: any) => Record<string, any>;
};

const { primary } = theme.colors.brand;

function GroupButtons({
  elements,
  onChange,
  nameExtractor,
  indexSelected,
  backgroundColor = primary[800],
  backgroundColorOutline = theme.colors.neutral10,
  textColor = theme.colors.neutral10,
  textColorOutline = primary[800],
  borderColor = primary[800],
  borderColorOutline = primary[300],
  eventName,
  eventParams,
}: Props): JSX.Element {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(
    indexSelected || 0,
  );

  const handleElementClick = (index: number, element: any, event?: any) => {
    setSelectedButtonIndex(index);
    if (eventName && eventParams) {
      newLogEvent("click", eventName, eventParams(element));
    }
    if (onChange) onChange(element, index, event);
  };

  function renderGroupButtons() {
    return elements?.map((element, index) => (
      <S.Button
        outline={index !== selectedButtonIndex}
        onClick={(e) => handleElementClick(index, element, e)}
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

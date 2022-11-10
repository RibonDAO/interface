import { useState } from "react";
import * as S from "./styles";

export type Props = {
  elements: any[];
  onChange?: (element: any, index: number) => void;
  nameExtractor: (element: any) => string;
};

function GroupButtons({ elements, onChange, nameExtractor }: Props): JSX.Element {

  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  const handleElementClick = (index: number, element: any) => {
    setSelectedButtonIndex(index);
    if (onChange) onChange(element, index);
  };

  function renderCausesButtons() {
    return elements?.map(
      (element, index) =>
        <S.Button
          outline={index !== selectedButtonIndex}
          onClick={() => handleElementClick(index, element)}
          key={index.toString()}
        >
          <S.ButtonText>{nameExtractor(element)}</S.ButtonText>
        </S.Button>
    );
  }

  return (
    <S.Container>
      {renderCausesButtons()}
    </S.Container>
  );
}

export default GroupButtons;

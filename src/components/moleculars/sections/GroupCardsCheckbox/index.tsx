import CardCheckbox from "components/moleculars/cards/CardCheckbox";
import { useState } from "react";
import * as S from "./styles";

export type Props = {
  elements: any[];
  onChange?: (element: any, index: number) => void;
  indexSelected?: number;
};

function GroupCardsCheckbox({
  elements,
  onChange,
  indexSelected,
}: Props): JSX.Element {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(
    indexSelected || 0,
  );

  const handleElementClick = (index: number, element: any) => {
    setSelectedButtonIndex(index);
    if (onChange) onChange(element, index);
  };

  function renderGroupCardsCheckbox() {
    return elements.map((element: any, index: number) => (
      <S.Container
        onClick={() => handleElementClick(index, element)}
        key={index.toString()}
        data-testid={index.toString()}
        style={{ border: "none", background: "none" }}
      >
        <CardCheckbox
          firstDescription={element.firstDescription}
          firstIconName={element.firstIconName}
          secondDescription={element.secondDescription}
          secondIconName={element.secondIconName}
          value={element.value}
          recurrence={element.recurrence}
          tagText={element.tagText}
          onClick={() => handleElementClick(index, element)}
          checked={index === selectedButtonIndex}
        />
      </S.Container>
    ));
  }

  return <S.Container>{renderGroupCardsCheckbox()}</S.Container>;
}

export default GroupCardsCheckbox;

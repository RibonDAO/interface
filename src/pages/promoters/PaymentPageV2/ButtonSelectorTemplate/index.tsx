import { useModalContext } from "contexts/modalContext";
import { useState } from "react";
import * as S from "./styles";

export type Props = {
  items: {
    label: string;
    onClick: () => void;
  }[];
  current: number;
};

export default function ButtonSelectorTemplate({ items, current }: Props) {
  const { hideModal } = useModalContext();
  const [currentIndex, setCurrentIndex] = useState(current);

  const handleClick = (onClick: () => void, index: number) => {
    onClick();
    setCurrentIndex(index);

    setTimeout(() => {
      hideModal();
    }, 100);
  };

  return (
    <S.Container>
      {items.map((item, index) => (
        <S.SelectButton
          key={item.label}
          onClick={() => handleClick(item.onClick, index)}
          type="button"
          text={item.label}
          selected={index === currentIndex}
        />
      ))}
    </S.Container>
  );
}

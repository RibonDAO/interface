import { useEffect, useState } from "react";
import * as S from "./styles";

type AccordionItem = {
  title: string;
  children?: JSX.Element;
  rightIcon?: any;
  onClick?: () => void;
};

export type Props = {
  current?: number;
  items: AccordionItem[];
};

function RadioAccordion({ current, items }: Props): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number | undefined>(current);

  useEffect(() => {
    if (typeof current === "undefined") return;
    if (current > items.length - 1 || current < 0) return;

    setCurrentIndex(current);
  }, [current]);

  useEffect(() => {
    if (typeof currentIndex === "undefined") return;

    const { onClick } = items[currentIndex];
    if (onClick) onClick();
  }, [currentIndex]);

  const onClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <S.Container>
      {items.map((item, index) => {
        const { title, children, rightIcon } = item;
        const isLast = index === items.length - 1;

        return (
          <S.RadioListItem
            key={title}
            last={isLast}
            onClick={() => onClick(index)}
          >
            <S.RadioRow>
              <S.TitleContainer>
                <S.Thumb selected={index === currentIndex} />
                {title}
              </S.TitleContainer>
              {rightIcon && <S.RightIcon src={rightIcon} />}
            </S.RadioRow>
            {children && index === currentIndex && (
              <S.RadioContent>{children}</S.RadioContent>
            )}
          </S.RadioListItem>
        );
      })}
    </S.Container>
  );
}

export default RadioAccordion;

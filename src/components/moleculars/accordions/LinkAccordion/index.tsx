import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import { useState, useEffect } from "react";
import * as S from "./styles";

type AccordionItem = {
  title: string;
  leftIcon?: string;
  handleClick?: (index: number) => void;
  children?: JSX.Element;
  rightIcon?: any;
  onClick?: () => void;
};

export type Props = {
  items: AccordionItem[];
  isRadio?: boolean;
  current?: number;
};
function LinkAccordion({ items, current, isRadio }: Props): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number | undefined>(current);

  useEffect(() => {
    if (!isRadio) return;
    if (typeof current === "undefined") return;
    if (current > items.length - 1 || current < 0) return;

    setCurrentIndex(current);
  }, [current]);

  useEffect(() => {
    if (!isRadio) return;
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
        const { title, leftIcon, handleClick, children, rightIcon } = item;
        const isLast = index === items.length - 1;

        return (
          <S.LinkListItem
            key={title}
            last={isLast}
            onClick={() =>
              !isRadio && handleClick ? handleClick(index) : onClick(index)
            }
          >
            <S.LinkRow>
              <S.TitleContainer>
                {isRadio ? (
                  <>
                    <S.Thumb selected={index === currentIndex} />
                    {title}
                  </>
                ) : (
                  <>
                    {leftIcon && (
                      <Icon
                        name={leftIcon}
                        size="25px"
                        color={theme.colors.brand.primary[600]}
                      />
                    )}
                    <S.Title>{title}</S.Title>
                  </>
                )}
              </S.TitleContainer>
              {isRadio && rightIcon && <S.RightIcon src={rightIcon} />}
              {!isRadio && (
                <S.RightElement>
                  <Icon
                    name="arrow_forward"
                    size="25px"
                    color={theme.colors.brand.primary[900]}
                  />
                </S.RightElement>
              )}
            </S.LinkRow>
            {isRadio && children && index === currentIndex && (
              <S.RadioContent>{children}</S.RadioContent>
            )}
          </S.LinkListItem>
        );
      })}
    </S.Container>
  );
}

export default LinkAccordion;

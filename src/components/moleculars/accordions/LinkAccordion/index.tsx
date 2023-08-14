import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import * as S from "./styles";

type AccordionItem = {
  title: string;
  leftIcon?: string;
  handleClick: (index: number) => void;
};

export type Props = {
  items: AccordionItem[];
};
function LinkAccordion({ items }: Props): JSX.Element {
  return (
    <S.Container>
      {items.map((item, index) => {
        const { title, leftIcon, handleClick } = item;
        const isLast = index === items.length - 1;

        return (
          <S.LinkListItem
            key={title}
            last={isLast}
            onClick={() => handleClick(index)}
          >
            <S.LinkRow>
              <S.TitleContainer>
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
              </S.TitleContainer>

              <S.RightElement>
                <Icon
                  name="arrow_forward"
                  size="25px"
                  color={theme.colors.brand.primary[900]}
                />
              </S.RightElement>
            </S.LinkRow>
          </S.LinkListItem>
        );
      })}
    </S.Container>
  );
}

export default LinkAccordion;

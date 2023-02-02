import { useState, useRef, useEffect } from "react";
import RoundedArrow from "components/atomics/arrows/RoundedArrow";
import theme from "styles/theme";
import * as S from "./styles";

export type Props = {
  children: React.ReactNode;
  scrollOffset: number;
  color?: string;
};

const { primary } = theme.colors.brand;

function SliderCards({
  children,
  scrollOffset,
  color = primary[300],
}: Props): JSX.Element {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [scrollInTheBeginning, setScrollInTheBeginning] = useState(true);
  const [scrollInTheEnd, setScrollInTheEnd] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const endOfScolling = () => {
    if (sliderRef.current) {
      return sliderRef.current.scrollWidth - sliderRef.current.offsetWidth;
    }

    return 0;
  };

  useEffect(() => {
    if (sliderRef.current) {
      setScrollInTheBeginning(sliderRef.current.scrollLeft === 0);
      setScrollInTheEnd(sliderRef.current.scrollLeft === endOfScolling());
    }
  }, [sliderPosition, children]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setSliderPosition(e.currentTarget.scrollLeft);
  };

  const handleScrollWithClick = (offset: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += offset;
    }
  };

  return (
    <S.SlideCardsContainer>
      <S.LeftSide visible={!scrollInTheBeginning}>
        <RoundedArrow
          onClick={() => handleScrollWithClick(-scrollOffset)}
          direction="left"
          color={color}
        />
      </S.LeftSide>

      <S.Slider ref={sliderRef} onScroll={handleScroll}>
        {children}
      </S.Slider>

      <S.RightSide visible={!scrollInTheEnd}>
        <RoundedArrow
          onClick={() => handleScrollWithClick(scrollOffset)}
          direction="right"
          color={color}
        />
      </S.RightSide>
    </S.SlideCardsContainer>
  );
}

export default SliderCards;

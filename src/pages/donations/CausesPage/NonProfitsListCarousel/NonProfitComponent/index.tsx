import { NonProfit } from "@ribon.io/shared";
import SliderCardsEnhanced from "components/moleculars/sliders/SliderCardsEnhanced";
import FirstCard from "pages/donations/CausesPage/NonProfitsListCarousel/NonProfitComponent/FirstCard";
import { useState, ReactElement } from "react";
import StoriesSection from "../../StoriesSection";
import CardNonProfitStories from "./CardNonProfitStories";
import * as S from "./styles";

interface Props {
  nonProfit: NonProfit;
  onButtonClick: () => void;
  onClickImage: (nonProfit: NonProfit) => void;
}

function NonProfitComponent({
  nonProfit,
  onButtonClick,
  onClickImage,
}: Props): ReactElement {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [storiesSectionVisible, setStoriesSectionVisible] = useState(false);

  const storiesNumber = nonProfit?.stories?.length || 0;
  const MINIMUM_CARDS_TO_LOOP = 2;
  const nonProfitStories = nonProfit?.stories || [];

  const storyElements: JSX.Element[] = nonProfitStories.flatMap((story) => [
    <CardNonProfitStories
      key={`${story.id}-text`}
      markdownText={story.description}
    />,
    <CardNonProfitStories
      key={`${story.id}-image`}
      backgroundImage={story.image}
    />,
  ]);

  return (
    <S.Container>
      <StoriesSection
        nonProfit={nonProfit}
        visible={storiesSectionVisible}
        setVisible={setStoriesSectionVisible}
        onButtonClick={onButtonClick}
      />
      <SliderCardsEnhanced
        currentSlide={currentCardIndex}
        onCurrentSlideChange={(index) => setCurrentCardIndex(index)}
        saveStateIdentifier="nonProfitsList"
        loop={storiesNumber >= MINIMUM_CARDS_TO_LOOP + 1}
        slideWidthOnDesktop={306}
      >
        {[
          <FirstCard
            key="first-card"
            nonProfit={nonProfit}
            buttonOnClick={onButtonClick}
            buttonDisabled={false}
            ticketsQuantity={10}
          />,
          ...storyElements,
        ]}
      </SliderCardsEnhanced>
    </S.Container>
  );
}

export default NonProfitComponent;

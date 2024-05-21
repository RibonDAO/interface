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
  const MINIMUM_CARDS_TO_LOOP = 3;

  const storyElements =
    nonProfit.stories?.map((story) => (
      <div key={story.id}>
      <CardNonProfitStories
        key={story.id}
        markdownText={story.description}
        // backgroundImage={story.image}
      />
      </div>
    )) || [];

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
        <FirstCard
          nonProfit={nonProfit}
          buttonOnClick={onButtonClick}
          buttonDisabled={false}
          ticketsQuantity={10}
        />
        {/* {storyElements.length > 0 ? (
            storyElements
          ) : (
            <div>No stories available</div>
          )} */}
          <p>No stories available</p>
      </SliderCardsEnhanced>
    </S.Container>
  );
}

export default NonProfitComponent;

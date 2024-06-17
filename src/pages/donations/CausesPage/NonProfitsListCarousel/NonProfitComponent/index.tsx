import { NonProfit, Story } from "@ribon.io/shared/types";
import { useStories } from "@ribon.io/shared/hooks";
import SliderCardsEnhanced from "components/moleculars/sliders/SliderCardsEnhanced";
import { useTicketsContext } from "contexts/ticketsContext";
import { logError } from "services/crashReport";
import FirstCard from "pages/donations/CausesPage/NonProfitsListCarousel/NonProfitComponent/FirstCard";
import { useState, ReactElement, useEffect } from "react";
import { useTranslation } from "react-i18next";
import CardMarginButtonImage from "./CardMarginButtonImage";
import CardNonProfitStories from "./CardNonProfitStories";
import * as S from "./styles";

interface Props {
  nonProfit: NonProfit;
  onFirstButtonClick: (nonProfit: NonProfit, from: string) => void;
  onSecondButtonClick: (nonProfit: NonProfit) => void;
}

function NonProfitComponent({
  nonProfit,
  onFirstButtonClick,
  onSecondButtonClick,
}: Props): ReactElement {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [nonProfitStories, setNonProfitStories] = useState<Story[]>([]);
  const { hasTickets, ticketsCounter } = useTicketsContext();
  const { fetchNonProfitStories } = useStories();

  const minNumberOfTickets =
    nonProfit?.nonProfitImpacts?.[0]?.minimumNumberOfTickets ?? 0;
  const hasEnoughTickets = hasTickets && ticketsCounter >= minNumberOfTickets;

  const storyElements: JSX.Element[] = nonProfitStories.flatMap((story) => [
    <CardNonProfitStories
      key={`${story.id}-card-story`}
      markdownText={story.description}
      backgroundImage={story.image}
    />,
  ]);

  const loadStories = async () => {
    try {
      const stories = await fetchNonProfitStories(nonProfit.id);
      if (stories.length === 0) return;
      setNonProfitStories(stories);
    } catch (e) {
      logError(e);
    }
  };

  useEffect(() => {
    loadStories();
  }, [nonProfit]);

  return (
    <S.Container>
      <SliderCardsEnhanced
        currentSlide={currentCardIndex}
        onCurrentSlideChange={(index) => setCurrentCardIndex(index)}
        saveStateIdentifier="nonProfitsList"
      >
        {[
          <FirstCard
            key="first-card"
            nonProfit={nonProfit}
            buttonOnClick={() => onFirstButtonClick(nonProfit, "stories")}
            buttonText={
              hasEnoughTickets ? t("donateText") : t("notEnoughTickets")
            }
            buttonDisabled={!hasEnoughTickets}
            ticketsQuantity={minNumberOfTickets}
          />,
          ...storyElements,
          <CardMarginButtonImage
            key="last-card"
            firstButtonText={
              hasEnoughTickets ? t("donateText") : t("notEnoughTickets")
            }
            secondButtonText={t("donateCash")}
            onFirstButtonClick={() =>
              onFirstButtonClick(nonProfit, "firstCard")
            }
            firstButtonDisabled={!hasEnoughTickets}
            onSecondButtonClick={() => onSecondButtonClick(nonProfit)}
            topImage={nonProfit.logo}
            bottomImage={nonProfit.icon}
            description={nonProfit.name}
          />,
        ]}
      </SliderCardsEnhanced>
    </S.Container>
  );
}

export default NonProfitComponent;

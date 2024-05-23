import { NonProfit } from "@ribon.io/shared";
import SliderCardsEnhanced from "components/moleculars/sliders/SliderCardsEnhanced";
import { useTicketsContext } from "contexts/ticketsContext";
import FirstCard from "pages/donations/CausesPage/NonProfitsListCarousel/NonProfitComponent/FirstCard";
import { useState, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import CardMarginButtonImage from "./CardMarginButtonImage";
import CardNonProfitStories from "./CardNonProfitStories";
import * as S from "./styles";

interface Props {
  nonProfit: NonProfit;
  onButtonClick: (nonProfit: NonProfit, from: string) => void;
}

function NonProfitComponent({ nonProfit, onButtonClick }: Props): ReactElement {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { hasTickets, ticketsCounter } = useTicketsContext();

  const nonProfitStories = nonProfit?.stories || [];
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

  return (
    <S.Container>
      <SliderCardsEnhanced
        currentSlide={currentCardIndex}
        onCurrentSlideChange={(index) => setCurrentCardIndex(index)}
        saveStateIdentifier="nonProfitsList"
        slideWidthOnDesktop={306}
      >
        {[
          <FirstCard
            key="first-card"
            nonProfit={nonProfit}
            buttonOnClick={() => onButtonClick(nonProfit, "stories")}
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
            onFirstButtonClick={() => onButtonClick(nonProfit, "firstCard")}
            firstButtonDisabled={!hasEnoughTickets}
            onSecondButtonClick={() => {}}
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

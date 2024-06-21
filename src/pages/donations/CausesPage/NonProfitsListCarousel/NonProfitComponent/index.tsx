import { NonProfit } from "@ribon.io/shared/types";

import SliderCardsEnhanced from "components/moleculars/sliders/SliderCardsEnhanced";
import { useTicketsContext } from "contexts/ticketsContext";
import useNavigation from "hooks/useNavigation";
import { logError } from "services/crashReport";
import FirstCard from "pages/donations/CausesPage/NonProfitsListCarousel/NonProfitComponent/FirstCard";
import { useState, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useTagDonationContext } from "contexts/tagDonationContext";
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
  const { hasTickets, ticketsCounter } = useTicketsContext();

  const { nonProfitsTag } = useTagDonationContext();

  const { navigateTo } = useNavigation();

  const minNumberOfTickets =
    nonProfit?.nonProfitImpacts?.[0]?.minimumNumberOfTickets ?? 0;
  const hasEnoughTickets = hasTickets && ticketsCounter >= minNumberOfTickets;
  const storyElements: JSX.Element[] | undefined = nonProfit.stories
    ?.sort((a, b) => a.position! - b.position!)
    .flatMap((story) => [
      <CardNonProfitStories
        key={`${story.id}-card-story`}
        markdownText={story.description}
        backgroundImage={story.image}
      />,
    ]);

  const handleFirstButtonClick = (from: string) => {
    if (!hasEnoughTickets) {
      navigateTo("/earn");
    } else {
      onFirstButtonClick(nonProfit, from);
    }
  };

  return (
    <S.Container>
      <SliderCardsEnhanced
        currentSlide={currentCardIndex}
        onCurrentSlideChange={(index) => setCurrentCardIndex(index)}
        saveStateIdentifier="nonProfitsList"
        show={nonProfitsTag?.map((np) => np.id).includes(nonProfit.id) ?? false}
      >
        {[
          <FirstCard
            key="first-card"
            nonProfit={nonProfit}
            buttonOnClick={() => handleFirstButtonClick("stories")}
            buttonText={
              hasEnoughTickets ? t("donateText") : t("notEnoughTickets")
            }
            buttonDisabled={!hasEnoughTickets}
            ticketsQuantity={minNumberOfTickets}
          />,
          ...(storyElements ?? []),
          <CardMarginButtonImage
            key="last-card"
            firstButtonText={
              hasEnoughTickets ? t("donateText") : t("notEnoughTickets")
            }
            secondButtonText={t("donateCash")}
            onFirstButtonClick={() => handleFirstButtonClick("lastCard")}
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

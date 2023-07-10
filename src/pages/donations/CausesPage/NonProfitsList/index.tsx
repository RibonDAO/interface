import CardCenterImageButton from "components/moleculars/cards/CardCenterImageButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useNavigation from "hooks/useNavigation";
import { newLogEvent } from "lib/events";
import { NonProfit, Integration } from "@ribon.io/shared/types";
import SliderCardsEnhanced from "components/moleculars/sliders/SliderCardsEnhanced";
import { useBlockedDonationModal } from "hooks/modalHooks/useBlockedDonationModal";
import { useLocation } from "react-router-dom";
import useVoucher from "hooks/useVoucher";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import causeIllustration from "assets/images/direct-illustration.svg";
import { useBlockedDonationContributionModal } from "hooks/modalHooks/useBlockedDonationContributionModal";
import { useImpactConversion } from "hooks/useImpactConversion";
import { shouldRenderVariation } from "lib/handleVariation";
import StoriesSection from "../StoriesSection";
import * as S from "../styles";

type LocationStateType = {
  failedDonation: boolean;
  blockedDonation: boolean;
};

type Props = {
  nonProfits: NonProfit[];
  integration: Integration | undefined;
  canDonate: boolean;
};

const MINIMUM_NON_PROFITS_TO_LOOP = 3;

function NonProfitsList({
  nonProfits,
  canDonate,
  integration,
}: Props): JSX.Element {
  const { state } = useLocation<LocationStateType>();

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  const { navigateTo } = useNavigation();

  const [currentNonProfitIndex, setCurrentNonProfitIndex] = useState(0);

  const { showBlockedDonationModal } = useBlockedDonationModal(
    state?.blockedDonation,
    integration,
  );
  const { contribution, variation } = useImpactConversion();

  const { showBlockedDonationContributionModal } =
    useBlockedDonationContributionModal();

  const { formattedImpactText } = useFormattedImpactText();
  const { isVoucherAvailable } = useVoucher();

  const canDonateAndHasVoucher = canDonate && isVoucherAvailable();

  function handleButtonClick(nonProfit: NonProfit) {
    if (canDonateAndHasVoucher) {
      newLogEvent("click", "P1_donateBtn", {
        nonProfitId: nonProfit.id,
      });
      navigateTo({ pathname: "confirm-donation", state: { nonProfit } });
    } else {
      newLogEvent("click", "P1_donateBlockedBtn", {
        nonProfitId: nonProfit.id,
      });
      if (shouldRenderVariation(variation) && !!contribution) {
        showBlockedDonationContributionModal();
      } else {
        showBlockedDonationModal();
      }
    }
  }
  const handleEmptyButtonClick = () => {
    navigateTo("/promoters/support-cause");
  };

  const [currentNonProfitWithStories, setCurrentNonProfitWithStories] =
    useState(nonProfits[0]);
  const [storiesSectionVisible, setStoriesSectionVisible] = useState(false);

  const handleImageClick = (nonProfit: NonProfit) => {
    const stories = nonProfit.stories || [];

    if (stories.length > 0) {
      setCurrentNonProfitWithStories(nonProfit);
      setStoriesSectionVisible(true);
    }
  };

  return (
    <S.NonProfitsListContainer>
      {currentNonProfitWithStories && (
        <StoriesSection
          nonProfit={currentNonProfitWithStories}
          visible={storiesSectionVisible}
          setVisible={setStoriesSectionVisible}
          canDonateAndHasVoucher={Boolean(canDonateAndHasVoucher)}
          onButtonClick={() => handleButtonClick(currentNonProfitWithStories)}
        />
      )}
      {nonProfits.length > 0 ? (
        <SliderCardsEnhanced
          currentSlide={currentNonProfitIndex}
          onCurrentSlideChange={(index) => setCurrentNonProfitIndex(index)}
          saveStateIdentifier="nonProfitsList"
          loop={nonProfits.length >= MINIMUM_NON_PROFITS_TO_LOOP + 1}
        >
          {nonProfits.map(
            (nonProfit: any) =>
              nonProfit && (
                <S.CardWrapper key={nonProfit.id}>
                  <CardCenterImageButton
                    image={nonProfit.mainImage || nonProfit.cause?.mainImage}
                    title={formattedImpactText(
                      nonProfit,
                      undefined,
                      false,
                      false,
                      undefined,
                      t("impactPrefix"),
                    )}
                    buttonText={
                      canDonateAndHasVoucher
                        ? t("donateText")
                        : t("donateBlockedText")
                    }
                    onClickButton={() => handleButtonClick(nonProfit)}
                    onClickImage={() => handleImageClick(nonProfit)}
                    softDisabled={!canDonateAndHasVoucher}
                    infoTextLeft={nonProfit.name}
                    infoTextRight={nonProfit.cause?.name}
                    infoText={
                      nonProfit.stories?.length ? t("learnMore") : undefined
                    }
                    fullWidth
                  />
                </S.CardWrapper>
              ),
          )}
        </SliderCardsEnhanced>
      ) : (
        <S.EmptySectionContainer>
          <S.EmptySectionBox>
            <S.EmptyImage src={causeIllustration} />
            <S.EmptyTitle>{t("noCauses.title")}</S.EmptyTitle>
            <S.EmptyText>{t("noCauses.text")}</S.EmptyText>
            <S.EmptyButton
              text={t("noCauses.button")}
              size="medium"
              onClick={handleEmptyButtonClick}
            />
          </S.EmptySectionBox>
        </S.EmptySectionContainer>
      )}
    </S.NonProfitsListContainer>
  );
}

export default NonProfitsList;

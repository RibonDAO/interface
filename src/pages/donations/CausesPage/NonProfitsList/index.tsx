import CardCenterImageButton from "components/moleculars/cards/CardCenterImageButton";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { newLogEvent } from "lib/events";
import { NonProfit, Integration } from "@ribon.io/shared/types";
import SliderCardsEnhanced from "components/moleculars/sliders/SliderCardsEnhanced";
import { useBlockedDonationModal } from "hooks/modalHooks/useBlockedDonationModal";
import { useLocation } from "react-router-dom";
import useVoucher from "hooks/useVoucher";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import StoriesSection from "../StoriesSection";
import * as S from "../styles";

type LocationStateType = {
  failedDonation: boolean;
  blockedDonation: boolean;
};

type Props = {
  nonProfits: NonProfit[];
  integration: Integration | undefined;
  setChosenNonProfit: (nonProfit: NonProfit) => void;
  setConfirmModalVisible: (visible: boolean) => void;
  canDonate: boolean;
};

const MINIMUM_NON_PROFITS_TO_LOOP = 3;

function NonProfitsList({
  nonProfits,
  setChosenNonProfit,
  setConfirmModalVisible,
  canDonate,
  integration,
}: Props): JSX.Element {
  const { state } = useLocation<LocationStateType>();

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

  const [currentNonProfitIndex, setCurrentNonProfitIndex] = useState(0);

  const { showBlockedDonationModal } = useBlockedDonationModal(
    state?.blockedDonation,
    integration,
  );

  const chooseNonProfit = useCallback((nonProfit: NonProfit) => {
    setChosenNonProfit(nonProfit);
  }, []);

  const { formattedImpactText } = useFormattedImpactText();
  const { isVoucherAvailable } = useVoucher();

  const canDonateAndHasVoucher = canDonate && isVoucherAvailable();

  function handleButtonClick(nonProfit: NonProfit) {
    chooseNonProfit(nonProfit);
    if (canDonate) {
      newLogEvent("click", "P1_donateBtn", {
        nonProfitId: nonProfit.id,
      });
      setConfirmModalVisible(true);
    } else {
      newLogEvent("click", "P1_donateBlockedBtn", {
        nonProfitId: nonProfit.id,
      });
      showBlockedDonationModal();
    }
  }

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
      <StoriesSection
        nonProfit={currentNonProfitWithStories}
        visible={storiesSectionVisible}
        setVisible={setStoriesSectionVisible}
        canDonateAndHasVoucher={Boolean(canDonateAndHasVoucher)}
      />
      <SliderCardsEnhanced
        currentSlide={currentNonProfitIndex}
        onCurrentSlideChange={(index) => setCurrentNonProfitIndex(index)}
        saveStateIdentifier="nonProfitsList"
        loop={nonProfits.length >= MINIMUM_NON_PROFITS_TO_LOOP + 1}
      >
        {nonProfits.map((nonProfit: any) => (
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
              infoText={nonProfit.stories?.length ? t("learnMore") : undefined}
              fullWidth
            />
          </S.CardWrapper>
        ))}
      </SliderCardsEnhanced>
    </S.NonProfitsListContainer>
  );
}

export default NonProfitsList;

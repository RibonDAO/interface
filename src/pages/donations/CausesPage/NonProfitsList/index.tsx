import CardCenterImageButton from "components/moleculars/cards/CardCenterImageButton";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import NonProfit from "types/entities/NonProfit";
import Integration from "types/entities/Integration";
import SliderCardsEnhanced from "components/moleculars/sliders/SliderCardsEnhanced";
import { useBlockedDonationModal } from "hooks/modalHooks/useBlockedDonationModal";
import { useLocation } from "react-router-dom";
import useVoucher from "hooks/useVoucher";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import * as S from "../styles";
import StoriesSection from "../StoriesSection";

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
  currentNonProfit: number;
  onCurrentNonProfitChange: (index: number) => void;
};

function NonProfitsList({
  nonProfits,
  setChosenNonProfit,
  setConfirmModalVisible,
  canDonate,
  integration,
  currentNonProfit,
  onCurrentNonProfitChange,
}: Props): JSX.Element {
  const { state } = useLocation<LocationStateType>();

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

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
    logEvent("donateCardButton_click", {
      causeId: nonProfit.id,
    });
    chooseNonProfit(nonProfit);
    if (canDonate) {
      setConfirmModalVisible(true);
      logEvent("authDonationDial_view");
    } else {
      logEvent("donateBlockedButton_click");
      showBlockedDonationModal();
      logEvent("donateBlockedDonation_view");
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
        currentSlide={currentNonProfit}
        onCurrentSlideChange={onCurrentNonProfitChange}
        saveStateIdentifier="nonProfitsList"
        loop
      >
        {nonProfits.map((nonProfit: any, idx: number) => (
          <S.CardWrapper key={idx.toString()}>
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
              fullWidth
            />
          </S.CardWrapper>
        ))}
      </SliderCardsEnhanced>
    </S.NonProfitsListContainer>
  );
}

export default NonProfitsList;

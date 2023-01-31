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
  currentNonProfit: number;
  onCurrentNonProfitChange: (index: number) => void;
};

const MINIMUM_SLIDES_TO_LOOP = 5;

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

  const loopSlider = nonProfits.length >= MINIMUM_SLIDES_TO_LOOP;

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

  const [storiesSectionVisible, setStoriesSectionVisible] = useState(false);

  const { showBlockedDonationModal } = useBlockedDonationModal(
    state?.blockedDonation,
    integration,
  );

  const chooseNonProfit = useCallback((nonProfit: NonProfit) => {
    setChosenNonProfit(nonProfit);
  }, []);

  const { formattedImpactText } = useFormattedImpactText();
  const { isVoucherAvailable } = useVoucher();

  const canDonateAndHasVoucher = Boolean(canDonate && isVoucherAvailable());

  const [storiesSectionProps, setStoriesSectionProps] = useState<any>({
    nonProfit: nonProfits[0],
    stories: [],
  });

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

  const handleImageClick = (nonProfit: NonProfit) => {
    const stories = nonProfit.stories || [];

    if (stories.length > 0) {
      setStoriesSectionProps({
        nonProfit,
        stories,
      });
      setStoriesSectionVisible(true);
    }
  };

  return (
    <S.NonProfitsListContainer>
      <StoriesSection
        {...storiesSectionProps}
        canDonateAndHasVoucher
        visible={storiesSectionVisible}
        setVisible={setStoriesSectionVisible}
      />
      <SliderCardsEnhanced
        currentSlide={currentNonProfit}
        onCurrentSlideChange={onCurrentNonProfitChange}
        saveStateIdentifier="nonProfitsList"
        loop={loopSlider}
      >
        {nonProfits.map((nonProfit: any) => (
          <S.CardWrapper key={Math.random().toString(36).slice(2, 7)}>
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

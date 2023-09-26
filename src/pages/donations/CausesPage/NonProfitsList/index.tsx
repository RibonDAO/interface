import CardCenterImageButton from "components/moleculars/cards/CardCenterImageButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useNavigation from "hooks/useNavigation";
import { logEvent, newLogEvent } from "lib/events";
import { NonProfit } from "@ribon.io/shared/types";
import SliderCardsEnhanced from "components/moleculars/sliders/SliderCardsEnhanced";
import useVoucher from "hooks/useVoucher";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import causeIllustration from "assets/images/direct-illustration.svg";
import { useBlockedDonationContributionModal } from "hooks/modalHooks/useBlockedDonationContributionModal";
import { useExperiment } from "@growthbook/growthbook-react";
import StoriesSection from "../StoriesSection";
import * as S from "../styles";

type Props = {
  nonProfits: NonProfit[];
  canDonate: boolean;
};

const MINIMUM_NON_PROFITS_TO_LOOP = 3;

function NonProfitsList({ nonProfits, canDonate }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  const { navigateTo } = useNavigation();

  const [currentNonProfitIndex, setCurrentNonProfitIndex] = useState(0);

  const { showBlockedDonationContributionModal } =
    useBlockedDonationContributionModal();

  const { formattedImpactText } = useFormattedImpactText();
  const { isVoucherAvailable } = useVoucher();

  const canDonateAndHasVoucher = canDonate && isVoucherAvailable();

  function handleButtonClick(nonProfit: NonProfit, from: string) {
    if (canDonateAndHasVoucher) {
      logEvent("donateTicketBtn_start", {
        nonProfitId: nonProfit.id,
        from,
      });
      navigateTo({ pathname: "confirm-donation", state: { nonProfit } });
    } else {
      newLogEvent("click", "P1_donateBlockedBtn", {
        nonProfitId: nonProfit.id,
      });
      showBlockedDonationContributionModal();
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

  const oldImpactFormat = (nonProfit: NonProfit) =>
    formattedImpactText(
      nonProfit,
      undefined,
      false,
      false,
      undefined,
      t("impactPrefix"),
    );

  const newImpactFormat = (nonProfit: NonProfit) => (
    <div>
      <h3>
        {nonProfit.cause.name.toLowerCase().includes("animal")
          ? t("impactOneLife")
              .replace("pessoa", "animal")
              .replace("person", "animal")
          : t("impactOneLife")}
      </h3>
      <p>
        {t("impactDescription", {
          value: nonProfit.impactDescription.split(",")[0],
        })}
      </p>
    </div>
  );

  const variation = useExperiment({
    key: "progression-test-first-stage",
    variations: [false, true],
  });

  return (
    <S.NonProfitsListContainer>
      {currentNonProfitWithStories && (
        <StoriesSection
          nonProfit={currentNonProfitWithStories}
          visible={storiesSectionVisible}
          setVisible={setStoriesSectionVisible}
          canDonateAndHasVoucher={Boolean(canDonateAndHasVoucher)}
          onButtonClick={() =>
            handleButtonClick(currentNonProfitWithStories, "stories")
          }
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
                    title={
                      variation.value
                        ? newImpactFormat(nonProfit)
                        : oldImpactFormat(nonProfit)
                    }
                    buttonText={
                      canDonateAndHasVoucher
                        ? t("donateText")
                        : t("donateBlockedText")
                    }
                    onClickButton={() =>
                      handleButtonClick(nonProfit, "nonProfitCard")
                    }
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

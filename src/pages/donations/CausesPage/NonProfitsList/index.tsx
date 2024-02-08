import CardCenterImageButton from "components/moleculars/cards/CardCenterImageButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useNavigation from "hooks/useNavigation";
import { logEvent } from "lib/events";
import { Categories, Currencies, NonProfit } from "@ribon.io/shared/types";
import SliderCardsEnhanced from "components/moleculars/sliders/SliderCardsEnhanced";
import useVoucher from "hooks/useVoucher";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import causeIllustration from "assets/images/direct-illustration.svg";
import { useIntegrationId } from "hooks/useIntegrationId";
import { useOffers } from "@ribon.io/shared/hooks";
import { useLanguage } from "hooks/useLanguage";
import { useCurrentUser } from "contexts/currentUserContext";
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

  const { formattedImpactText } = useFormattedImpactText();
  const { isVoucherAvailable } = useVoucher();
  const { signedIn } = useCurrentUser();

  const canDonateAndHasVoucher = canDonate && isVoucherAvailable();

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
      logEvent("storiesBtn_click", {
        nonProfitId: nonProfit.id,
        from: "NGOCard",
      });
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

  const { offers: offersBrl } = useOffers(
    Currencies.BRL,
    false,
    Categories.DIRECT_CONTRIBUTION,
  );
  const { offers: offersUsd } = useOffers(
    Currencies.USD,
    false,
    Categories.DIRECT_CONTRIBUTION,
  );

  const { currentLang } = useLanguage();

  const currentOffer = () =>
    currentLang === "pt-BR" ? offersBrl?.[0] : offersUsd?.[0];

  const integrationId = useIntegrationId();

  const navigateToCheckout = (nonProfit: NonProfit) => {
    const searchParams = new URLSearchParams({
      integration_id: integrationId?.toString() || "",
      offer: currentOffer()?.priceCents?.toString() ?? "1000",
      target: "non_profit",
      target_id: nonProfit.id.toString(),
      currency: currentLang === "pt-BR" ? "BRL" : "USD",
      subscription: "false",
      from: "DirectCardNgo",
    });

    navigateTo({
      pathname: "/promoters/checkout",
      search: searchParams.toString(),
    });
  };

  function handleButtonClick(nonProfit: NonProfit, from: string) {
    if (canDonateAndHasVoucher) {
      logEvent("donateTicketBtn_start", {
        nonProfitId: nonProfit.id,
        from,
      });
      if (signedIn) {
        navigateTo({ pathname: "/signed-in", state: { nonProfit } });
      } else {
        navigateTo({
          pathname: "/donation/auth/sign-in",
          state: { nonProfit },
        });
      }
    } else {
      navigateToCheckout(nonProfit);
    }
  }

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
          slideWidthOnDesktop={256}
        >
          {nonProfits.map(
            (nonProfit: any) =>
              nonProfit && (
                <S.CardWrapper key={nonProfit.id}>
                  <CardCenterImageButton
                    image={nonProfit.mainImage || nonProfit.cause?.mainImage}
                    title={oldImpactFormat(nonProfit)}
                    buttonText={
                      canDonateAndHasVoucher
                        ? t("donateText")
                        : t("doMore", {
                            value: currentOffer()?.price ?? "1000",
                          })
                    }
                    onClickButton={() =>
                      handleButtonClick(nonProfit, "nonProfitCard")
                    }
                    onClickImage={() => handleImageClick(nonProfit)}
                    infoTextTop={nonProfit.name}
                    infoTextBottom={nonProfit.cause?.name}
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

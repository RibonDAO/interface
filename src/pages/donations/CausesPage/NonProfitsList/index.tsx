import CardCenterImageButton from "components/moleculars/cards/CardCenterImageButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useNavigation from "hooks/useNavigation";
import { logEvent } from "lib/events";
import { Currencies, NonProfit } from "@ribon.io/shared/types";
import SliderCardsEnhanced from "components/moleculars/sliders/SliderCardsEnhanced";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import causeIllustration from "assets/images/direct-illustration.svg";
import { useIntegrationContext } from "contexts/integrationContext";
import { useOffers } from "@ribon.io/shared/hooks";
import { useLanguage } from "hooks/useLanguage";
import { useCurrentUser } from "contexts/currentUserContext";
import { useTicketsContext } from "contexts/ticketsContext";
import ticketIcon from "assets/icons/ticket-icon-on.svg";
import * as S from "../styles";

type Props = {
  nonProfits: NonProfit[];
};

const MINIMUM_NON_PROFITS_TO_LOOP = 3;

function NonProfitsList({ nonProfits }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  const { navigateTo } = useNavigation();
  const { hasTickets, ticketsCounter } = useTicketsContext();

  const [currentNonProfitIndex, setCurrentNonProfitIndex] = useState(0);

  const { formattedImpactText } = useFormattedImpactText();
  const { signedIn } = useCurrentUser();

  const handleEmptyButtonClick = () => {
    navigateTo("/promoters/support-cause");
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

  const { offers: offersBrl } = useOffers(Currencies.BRL, false);
  const { offers: offersUsd } = useOffers(Currencies.USD, false);

  const { currentLang } = useLanguage();

  const currentOffer = () =>
    currentLang === "pt-BR" ? offersBrl?.[0] : offersUsd?.[0];

  const { currentIntegrationId: integrationId } = useIntegrationContext();

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
    if (hasTickets) {
      logEvent("donateTicketBtn_start", {
        nonProfitId: nonProfit.id,
        from,
      });
      if (signedIn) {
        navigateTo({ pathname: "/select-tickets", state: { nonProfit } });
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
      {nonProfits.length > 0 ? (
        <SliderCardsEnhanced
          currentSlide={currentNonProfitIndex}
          onCurrentSlideChange={(index) => setCurrentNonProfitIndex(index)}
          saveStateIdentifier="nonProfitsList"
          loop={nonProfits.length >= MINIMUM_NON_PROFITS_TO_LOOP + 1}
          slideWidthOnDesktop={256}
        >
          {nonProfits.map((nonProfit: any) => {
            const minNumberOfTickets =
              nonProfit?.nonProfitImpacts?.[0]?.minimumNumberOfTickets ?? 0;
            const hasEnoughTickets =
              hasTickets && ticketsCounter >= minNumberOfTickets;

            return (
              <S.CardWrapper key={nonProfit.id}>
                <CardCenterImageButton
                  image={nonProfit.mainImage || nonProfit.cause?.mainImage}
                  title={oldImpactFormat(nonProfit)}
                  buttonText={
                    hasEnoughTickets ? t("donateText") : t("notEnoughTickets")
                  }
                  onClickButton={() =>
                    handleButtonClick(nonProfit, "nonProfitCard")
                  }
                  infoTextTop={nonProfit.name}
                  iconSubtitle={{
                    icon: ticketIcon,
                    boldText: String(minNumberOfTickets),
                    text: t("iconText"),
                  }}
                  disabled={!hasEnoughTickets}
                  fullWidth
                />
              </S.CardWrapper>
            );
          })}
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

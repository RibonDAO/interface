import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import useNavigation from "hooks/useNavigation";
import { logEvent } from "lib/events";
import { Currencies, NonProfit } from "@ribon.io/shared/types";
import causeIllustration from "assets/images/direct-illustration.svg";
import { useIntegrationContext } from "contexts/integrationContext";
import { useOffers } from "@ribon.io/shared/hooks";
import { useLanguage } from "hooks/useLanguage";
import { useCurrentUser } from "contexts/currentUserContext";
import { useTicketsContext } from "contexts/ticketsContext";
import * as S from "../styles";
import NonProfitComponent from "./NonProfitComponent";

type Props = {
  nonProfits: NonProfit[];
};

function NonProfitsListCarousel({ nonProfits }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  const { navigateTo } = useNavigation();
  const { hasTickets } = useTicketsContext();

  const { signedIn } = useCurrentUser();

  const handleEmptyButtonClick = () => {
    navigateTo("/promoters/support-cause");
  };

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

  const handleButtonClick = useCallback(
    (nonProfit: NonProfit, from: string) => {
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
    },
    [hasTickets, signedIn],
  );

  return (
    <S.NonProfitsListContainer>
      {nonProfits.length > 0 ? (
        <div>
          {nonProfits.map((nonProfit: any) => (
            <NonProfitComponent
              key={nonProfit.id}
              nonProfit={nonProfit}
              onFirstButtonClick={handleButtonClick}
              onSecondButtonClick={navigateToCheckout}
            />
          ))}
        </div>
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

export default NonProfitsListCarousel;

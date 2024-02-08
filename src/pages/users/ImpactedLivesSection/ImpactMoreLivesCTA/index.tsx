import CardLargeImage from "components/moleculars/cards/CardLargeImage";
import { useTranslation } from "react-i18next";
import useCheckoutNavigation from "hooks/useCheckoutNavigation";
import {
  useNonProfits,
  useOffers,
  useStatistics,
} from "@ribon.io/shared/hooks";
import { useEffect, useState } from "react";
import { coinByLanguage } from "lib/coinByLanguage";
import { useLanguage } from "hooks/useLanguage";
import {
  Categories,
  Currencies,
  NonProfit,
  Offer,
} from "@ribon.io/shared/types";
import { useCurrentUser } from "contexts/currentUserContext";
import { useUserLevel } from "contexts/userLevelContext";
import { logEvent } from "lib/events";
import HeartImage from "assets/icons/heart.svg";
import * as S from "./styles";

type Props = {
  from: string;
};
function ImpactMoreLivesCTA({ from }: Props): JSX.Element {
  const { t: buyMoreTickets } = useTranslation("translation", {
    keyPrefix: "impactPage.buyMoreTicketsCTA",
  });

  const [currentCoin, setCurrentCoin] = useState(Currencies.BRL);
  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const [currentNonProfit, setCurrentNonProfit] = useState<NonProfit>();
  const { navigateToCheckout } = useCheckoutNavigation();
  const { offers } = useOffers(
    currentCoin,
    false,
    Categories.DIRECT_CONTRIBUTION,
  );
  const { currentLang } = useLanguage();
  const { currentUser } = useCurrentUser();
  const { userStatistics } = useStatistics({
    userId: currentUser?.id ?? undefined,
  });
  const { nonProfits } = useNonProfits();
  const { userExperience: totalLivesImpacted } = useUserLevel();

  useEffect(() => {
    setCurrentCoin(coinByLanguage(currentLang));
  }, [currentLang]);

  useEffect(() => {
    setCurrentOffer(offers[0]);
  }, [JSON.stringify(offers)]);

  useEffect(() => {
    setCurrentNonProfit(
      nonProfits?.find((np) => np.id === userStatistics?.lastDonatedNonProfit),
    );
  }, [JSON.stringify(nonProfits), userStatistics?.lastDonatedNonProfit]);

  const onButtonClick = () => {
    logEvent("impactMoreLivesCTA_click", {
      from,
    });
    if (currentOffer && userStatistics?.lastDonatedNonProfit)
      navigateToCheckout(
        "non_profit",
        userStatistics?.lastDonatedNonProfit,
        currentOffer,
        false,
      );
  };

  const livesValue = Math.round(Number(currentOffer?.priceValue ?? 50) * 2);

  const buttonValue = livesValue;
  const t = buyMoreTickets;

  return (
    <S.Container>
      <S.Title>
        {t("title", {
          lives: totalLivesImpacted,
        })}
      </S.Title>
      <S.Subtitle>
        {t("subtitle", { value: currentOffer?.price, lives: livesValue })}
      </S.Subtitle>
      <CardLargeImage
        title={t("cardTitle", { value: currentOffer?.price })}
        icon={<S.Icon src={HeartImage} alt="heart image" />}
        subtitle={t("cardSubtitle", {
          value: livesValue,
        })}
        image={currentNonProfit?.mainImage || ""}
        buttonText={t("buttonText", { value: buttonValue })}
        description={t("description", {
          impact: currentNonProfit?.impactDescription.split(",")[1],
        })}
        onButtonClick={onButtonClick}
      />
    </S.Container>
  );
}

export default ImpactMoreLivesCTA;

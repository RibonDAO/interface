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
import { Currencies, NonProfit, Offer } from "@ribon.io/shared/types";
import { useCurrentUser } from "contexts/currentUserContext";

function ImpactMoreLivesCTA() {
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.impactMoreLivesCTA",
  });
  const [currentCoin, setCurrentCoin] = useState(Currencies.BRL);
  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const [currentNonProfit, setCurrentNonProfit] = useState<NonProfit>();
  const { navigateToCheckout } = useCheckoutNavigation();
  const { offers } = useOffers(currentCoin, false);
  const { currentLang } = useLanguage();
  const { currentUser } = useCurrentUser();
  const { userStatistics } = useStatistics({
    userId: currentUser?.id ?? undefined,
  });
  const { nonProfits } = useNonProfits();

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
    if (currentOffer && userStatistics?.lastDonatedNonProfit)
      navigateToCheckout(
        "non_profit",
        userStatistics?.lastDonatedNonProfit,
        currentOffer,
        false,
      );
  };

  return (
    <CardLargeImage
      title={t("title", { value: currentOffer?.price })}
      subtitle={t("subtitle", {
        value: Math.round(Number(currentOffer?.priceValue ?? 50) * 2),
      })}
      image={currentNonProfit?.mainImage || ""}
      buttonText={t("buttonText", { value: currentOffer?.price })}
      description={t("description", {
        impact: currentNonProfit?.impactDescription.split(",")[1],
      })}
      onButtonClick={onButtonClick}
    />
  );
}

export default ImpactMoreLivesCTA;

import {
  useNonProfitImpact,
  useNonProfits,
  useOffers,
  useStatistics,
} from "@ribon.io/shared/hooks";
import { Currencies, NonProfit, Offer } from "@ribon.io/shared/types";
import { useCurrentUser } from "contexts/currentUserContext";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { useLanguage } from "hooks/useLanguage";
import { useEffect, useState } from "react";
import { Contribution } from "types/entities/Contribution";

export function useImpactConversion() {
  // R$ 10,00 offer
  const offerBrlId = 33;
  // $ 10,00 offer
  const offerUsdId = 7;

  const [contribution, setContribution] = useState<Contribution>();
  const [description, setDescription] = useState<
    string | JSX.Element | undefined
  >();
  const [nonProfit, setNonProfit] = useState<NonProfit>();
  const [offer, setOffer] = useState<Offer>();

  const { formattedImpactText } = useFormattedImpactText();

  const { currentUser } = useCurrentUser();

  const { nonProfits } = useNonProfits();
  const { offers: offersBrl } = useOffers(Currencies.BRL, false);
  const { offers: offersUsd } = useOffers(Currencies.USD, false);
  const { userStatistics } = useStatistics({
    userId: currentUser?.id ?? undefined,
  });

  const { nonProfitImpact } = useNonProfitImpact(
    nonProfit?.id,
    offer?.priceValue,
    offer?.currency === "brl" ? Currencies.BRL : Currencies.USD,
  );

  const { currentLang } = useLanguage();

  useEffect(() => {
    setNonProfit(
      nonProfits?.find((n) => n.id === userStatistics?.lastDonatedNonProfit),
    );
  }, [nonProfits, userStatistics]);

  useEffect(() => {
    if (currentLang === "pt-BR") {
      setOffer(offersBrl?.find((o) => o.id === offerBrlId) ?? offersBrl?.[0]);
    } else {
      setOffer(offersUsd?.find((o) => o.id === offerUsdId) ?? offersUsd?.[0]);
    }
  }, [offersBrl, offersUsd, currentLang]);

  useEffect(() => {
    if (!offer) return;
    if (!nonProfit) return;

    setContribution({
      nonProfitId: nonProfit.id,
      name: nonProfit.name,
      image: nonProfit.mainImage,
      value: offer.priceValue ?? 0,
      communityValue: (offer.priceValue ?? 0) * 0.2,
      offerId: offer.id,
    });
  }, [setContribution, nonProfit, offer]);

  useEffect(() => {
    setDescription(
      formattedImpactText(nonProfit, undefined, true, true, nonProfitImpact),
    );
  }, [contribution, nonProfit, nonProfitImpact]);

  return {
    contribution,
    description,
    offer,
    nonProfit,
    lastNonProfitDonated: userStatistics?.lastDonatedNonProfit,
  };
}

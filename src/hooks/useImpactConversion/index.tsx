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
  const [contribution, setContribution] = useState<Contribution>();
  const [description, setDescription] = useState<
    string | JSX.Element | undefined
  >();
  const [nonProfit, setNonProfit] = useState<NonProfit>();
  const [offer, setOffer] = useState<Offer>();

  const { formattedImpactText } = useFormattedImpactText();

  const { currentUser } = useCurrentUser();

  const { nonProfits } = useNonProfits();
  const { offers } = useOffers(Currencies.BRL, false);
  const { userStatistics } = useStatistics({
    userId: currentUser?.id ?? undefined,
  });

  const { nonProfitImpact } = useNonProfitImpact(
    nonProfit?.id,
    offer?.priceValue,
    Currencies.BRL,
  );

  useEffect(() => {
    setNonProfit(
      nonProfits?.find((n) => n.id === userStatistics?.lastDonatedNonProfit),
    );

    if (!offers) return;

    setOffer(
      offers?.find((o) => o.id === contribution?.offerId) ?? offers?.[0],
    );
  }, [nonProfits, offers, userStatistics, contribution?.offerId]);

  const { currentLang } = useLanguage();

  const actualOfferId = currentLang === "pt-BR" ? 28 : 31;

  useEffect(() => {
    if (!offer) return;
    if (!nonProfit) return;

    setContribution({
      nonProfitId: nonProfit.id,
      name: nonProfit.name,
      image: nonProfit.mainImage,
      value: offer.priceValue ?? 0,
      communityValue: (offer.priceValue ?? 0) * 0.2,
      offerId: offer.id ?? actualOfferId,
    });
  }, [setContribution, nonProfit, offers, userStatistics, currentUser?.id]);

  useEffect(() => {
    setDescription(
      formattedImpactText(nonProfit, undefined, true, true, nonProfitImpact),
    );
  }, [contribution, nonProfit]);

  return {
    contribution,
    description,
    offer,
    nonProfit,
    lastNonProfitDonated: userStatistics?.lastDonatedNonProfit,
  };
}

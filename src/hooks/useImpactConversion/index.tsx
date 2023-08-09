import {
  useContributions,
  useNonProfitImpact,
  useNonProfits,
  useOffers,
  useStatistics,
} from "@ribon.io/shared/hooks";
import { Currencies, NonProfit, Offer } from "@ribon.io/shared/types";
import { useCurrentUser } from "contexts/currentUserContext";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { useEffect, useState } from "react";
import { Contribution } from "types/entities/Contribution";

export function useImpactConversion() {
  const [contribution, setContribution] = useState<Contribution>();
  const [description, setDescription] = useState<
    string | JSX.Element | undefined
  >();
  const [nonProfit, setNonProfit] = useState<NonProfit>();
  const [offer, setOffer] = useState<Offer>();
  const { useUserContributions } = useContributions();
  const { data: contributions } = useUserContributions();

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

  useEffect(() => {
    if (!contributions) return;

    const selectedContribution = contributions.find(
      (o) =>
        o?.receiver &&
        o.receiver?.id === userStatistics?.lastDonatedNonProfit &&
        "impactByTicket" in o.receiver,
    ) as Contribution;

    setContribution(selectedContribution);
  }, [setContribution, nonProfits, offers, userStatistics, currentUser?.id]);

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

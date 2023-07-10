import { useExperiment } from "@growthbook/growthbook-react";
import {
  useNonProfits,
  useOffers,
  useStatistics,
} from "@ribon.io/shared/hooks";
import { Currencies } from "@ribon.io/shared/types";
import { useLanguage } from "hooks/useLanguage";
import { useCurrentUser } from "contexts/currentUserContext";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { useCallback, useEffect, useState } from "react";
import { Contribution } from "types/entities/Contribution";
import NewImpact from "./newImpact.json";
import OldImpact from "./oldImpact.json";

export function useImpactConversion() {
  const [contribution, setContribution] = useState<Contribution>();
  const [description, setDescription] = useState<
    string | JSX.Element | undefined
  >();
  const [variation, setVariation] = useState<string>("Control");
  const [nonProfit, setNonProfit] = useState<any>();
  const [offer, setOffer] = useState<any>();
  const { currentLang } = useLanguage();

  const { formattedImpactText } = useFormattedImpactText();

  const { currentUser } = useCurrentUser();

  const { nonProfits } = useNonProfits();
  const { offers } = useOffers(Currencies.BRL, false);
  const { userStatistics } = useStatistics({
    userId: currentUser?.id ?? undefined,
  });

  useEffect(() => {
    setNonProfit(
      nonProfits?.find((n) => n.id === userStatistics?.lastDonatedNonProfit),
    );

    setOffer(
      offers?.find((o) => o.id === contribution?.offerId) ?? offers?.[0],
    );
  }, [nonProfits, offers, userStatistics, contribution?.offerId]);

  const { value } = useExperiment({
    key: "impact-conversion-staging",
    variations: ["Control", "NewImpact", "OldImpact"],
  });

  const currentNewImpact = useCallback(() => {
    if (currentLang === "pt-BR") {
      return NewImpact.pt;
    }
    return NewImpact.en;
  }, [currentLang]);

  useEffect(() => {
    setVariation(value);
    console.log(process.env.NODE_ENV);
  }, [value]);

  useEffect(() => {
    if (variation === "NewImpact") {
      return setContribution(
        currentNewImpact().find(
          (o) => o.nonProfitId === userStatistics?.lastDonatedNonProfit,
        ),
      );
    }
    if (variation === "OldImpact") {
      return setContribution(
        OldImpact.find(
          (o) => o.nonProfitId === userStatistics?.lastDonatedNonProfit,
        ),
      );
    }
    return undefined;
  }, [
    variation,
    NewImpact,
    OldImpact,
    setContribution,
    nonProfits,
    offers,
    userStatistics,
    currentUser?.id,
  ]);

  useEffect(() => {
    if (variation === "NewImpact") {
      return setDescription(contribution?.description ?? "");
    }
    if (variation === "OldImpact") {
      return setDescription(
        formattedImpactText(nonProfit, undefined, true, true),
      );
    }
    return undefined;
  }, [variation, contribution, nonProfit]);

  return {
    contribution,
    description,
    offer,
    nonProfit,
    variation,
    lastNonProfitDonated: userStatistics?.lastDonatedNonProfit,
  };
}

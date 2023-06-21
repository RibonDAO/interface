import { useExperiment } from "@growthbook/growthbook-react";
import {
  useNonProfits,
  useOffers,
  useStatistics,
} from "@ribon.io/shared/hooks";
import { Currencies } from "@ribon.io/shared/types";

import { useCurrentUser } from "contexts/currentUserContext";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { useEffect, useState } from "react";
import NewImpact from "./newImpact.json";
import OldImpact from "./oldImpact.json";

type ContributionProps =
  | {
      name: string;
      description?: string;
      impact?: string;
      image: string;
      value: number;
      offerId: number;
      nonProfitId: number;
    }
  | undefined;

export function useImpactConversion() {
  const [contribution, setContribution] = useState<ContributionProps>();
  const [description, setDescription] = useState<any>();
  const [variation, setVariation] = useState<string>("Control");

  const { formattedImpactText } = useFormattedImpactText();

  const { currentUser } = useCurrentUser();

  const { nonProfits } = useNonProfits();
  const { offers } = useOffers(Currencies.BRL, false);
  const { userStatistics } = useStatistics({
    userId: currentUser?.id ?? undefined,
  });

  const nonProfit = nonProfits?.find(
    (n) => n.id === userStatistics?.lastDonatedNonProfit,
  );

  const offer = offers?.find((o) => o.id === 3);

  const { value } = useExperiment({
    key: "impact-conversion-staging",
    variations: ["Control", "NewImpact", "OldImpact"],
  });

  useEffect(() => {
    setVariation(value);
  }, [value]);

  useEffect(() => {
    if (variation === "NewImpact") {
      return setContribution(NewImpact.find((o) => o.nonProfitId === 8));
    }
    if (variation === "OldImpact") {
      return setContribution(OldImpact.find((o) => o.nonProfitId === 8));
    }
    return undefined;
  }, [variation, nonProfit, contribution]);

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
  }, [variation, nonProfit, contribution, formattedImpactText]);

  return { contribution, description, offer, nonProfit, variation };
}

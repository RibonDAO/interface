import { impactNormalizer } from "@ribon.io/shared/lib";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { NonProfit, NonProfitImpactResponse } from "@ribon.io/shared/types";

export function useFormattedImpactText() {
  const { t: normalizerTranslation } = useTranslation("translation", {
    keyPrefix: "impactNormalizer",
  });

  const highlightedImpact = (normalizedImpact: any) => (
    <>
      {normalizedImpact.map((slice: any, index: any) => (
        <Fragment key={index.toString()}>
          {index % 2 === 0 ? <b>{slice}</b> : slice}{" "}
        </Fragment>
      ))}
    </>
  );

  function formattedImpactText(
    nonProfit?: NonProfit,
    impact?: number,
    isRoundedImpact?: boolean,
    isHighlighted?: boolean,
    nonProfitImpact?: NonProfitImpactResponse,
    prefix?: string,
  ) {
    if (!nonProfit) return "";
    if (!nonProfit.nonProfitImpacts || nonProfit.nonProfitImpacts.length === 0)
      return "";
      
    const impacts = nonProfit?.nonProfitImpacts || [];
    const nonProfitsImpactsLength = impacts.length;
    const impactByMinimumNumberOfTickets =
      nonProfit.impactByTicket * (nonProfitImpact?.minimumNumberOfTickets || 1);

    const roundedImpact =
      impact ||
      nonProfitImpact?.roundedImpact ||
      impactByMinimumNumberOfTickets ||
      1;

    const prefixText = prefix ? `${prefix} ` : "";

    if (nonProfit && roundedImpact && impacts && nonProfitsImpactsLength) {
      const lastImpact = impacts[nonProfitsImpactsLength - 1];
      if (lastImpact.donorRecipient) {
        const normalizedImpact = impactNormalizer(
          nonProfit,
          roundedImpact,
          normalizerTranslation,
        );
        return isHighlighted
          ? highlightedImpact(normalizedImpact)
          : normalizedImpact.join(" ");
      }
    }
    return isRoundedImpact && nonProfitImpact
      ? `${nonProfitImpact?.roundedImpact} ${nonProfit?.impactDescription}`
      : `${prefixText} ${
          impact?.toString() || nonProfit?.impactByTicket?.toString()
        } ${nonProfit?.impactDescription}`;
  }
  return { formattedImpactText };
}
export default useFormattedImpactText;

import { removeInsignificantZeros } from "lib/formatters/currencyFormatter";
import { NonProfit, Offer } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import * as S from "../../styles";
import SelectOfferSection from "../SelectOfferSection";

export type Props = {
  nonProfit: NonProfit;
  handleOfferChange: (offer: Offer, index?: number) => void;
  handleDonate: () => void;
};

export default function NonProfitCard({
  nonProfit,
  handleOfferChange,
  handleDonate,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportNonProfitPage",
  });
  const [value, setValue] = useState("");

  const onOfferChange = (offer: Offer, index?: number) => {
    handleOfferChange(offer, index);
    setValue(removeInsignificantZeros(offer.price));
  };

  return (
    <S.ContentContainer>
      <S.SupportImage src={nonProfit.mainImage} />
      <S.DonateContainer>
        <S.GivingContainer>
          <S.ContributionContainer>
            <SelectOfferSection
              nonProfit={nonProfit}
              onOfferChange={onOfferChange}
            />
          </S.ContributionContainer>
        </S.GivingContainer>
        <S.DonateButton
          text={t("donateButtonText", {
            value,
          })}
          onClick={handleDonate}
        />
      </S.DonateContainer>
    </S.ContentContainer>
  );
}

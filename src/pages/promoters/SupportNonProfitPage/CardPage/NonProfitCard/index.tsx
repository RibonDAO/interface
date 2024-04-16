import { NonProfit } from "@ribon.io/shared/types";
import { Fragment } from "react";
import * as S from "../../styles";
import SelectOfferSection from "../SelectOfferSection";

export type Props = {
  nonProfit: NonProfit;
};

export default function NonProfitCard({ nonProfit }: Props): JSX.Element {
  return (
    <S.ContentContainer>
      <S.SupportImage src={nonProfit.mainImage} />
      <S.DonateContainer>
        <S.GivingContainer>
          <S.ContributionContainer>
            <Fragment key={nonProfit.id}>
              <SelectOfferSection nonProfit={nonProfit} />
            </Fragment>
          </S.ContributionContainer>
        </S.GivingContainer>
      </S.DonateContainer>
    </S.ContentContainer>
  );
}

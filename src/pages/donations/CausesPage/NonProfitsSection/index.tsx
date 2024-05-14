import Spinner from "components/atomics/Spinner";
import { useNonProfitsContext } from "contexts/nonProfitsContext";
import { useCausesContext } from "contexts/causesContext";
import { useCauseDonationContext } from "contexts/causeDonationContext";

import { useEffect } from "react";
import CardNonProfitStories from "components/moleculars/cards/CardNonProfitStories";
import NonProfitsList from "../NonProfitsList";
import * as S from "./styles";

function NonProfitsSection() {
  const { filteredNonProfits, isLoading: isLoadingNonProfits } =
    useNonProfitsContext();
  const { filteredCauses } = useCausesContext();
  const { chosenCause } = useCauseDonationContext();

  const nonProfitsFilter = () => {
    if (chosenCause) {
      return (
        filteredNonProfits?.filter(
          (nonProfit) => nonProfit.cause?.id === chosenCause.id,
        ) || []
      );
    }
    return filteredNonProfits || [];
  };

  const sortNonProfits = () => {
    const nonProfitsFiltered = nonProfitsFilter();
    const sorted = nonProfitsFiltered?.sort((a, b) => {
      const causeAIndex = filteredCauses.findIndex(
        (cause) => cause.id === a.cause.id,
      );
      const causeBIndex = filteredCauses.findIndex(
        (cause) => cause.id === b.cause.id,
      );

      return causeAIndex - causeBIndex;
    });
    return sorted;
  };

  useEffect(() => {
    sortNonProfits();
  }, [chosenCause]);

  const markdownTest = `
  ### **Quem recebe sua doação**
  Direcionadas a pessoas em regiões de risco na Nigériaduhsoiuhiuhsiod lkshdoihpsi aoihdiuosgha aohdpisugha sohdpiodh

  **O projeto oferece:**
  - lorem ipsum dot
  - lorem ipsum dot
  - lorem ipsum dot
  - lorem ipsum do
  `;
  

  return (
    <S.Container>
      {isLoadingNonProfits ? (
        <Spinner size="26" />
      ) : (
        filteredNonProfits && (
          <S.NonProfitsContainer>
            <NonProfitsList nonProfits={sortNonProfits()} />
            <CardNonProfitStories markdownText={markdownTest}/>
            <CardNonProfitStories 
              backgroundImage="https://s3-alpha-sig.figma.com/img/e39a/c72c/54240517005b965849596281519d3edd?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QJSHOmm9kdLb6nqMIeEGCHqgwDl4sXPDD9ye7qmG4zKLShV9ZvSP9ADydgwwLRqx5COr4olScIEVpV5UMMJ87gawPQ-xq8RDaRXwiGGa2JrCqnPO66nLxwOQaW3JlI6nUtPxrdmoSLQfGtFxg0WcJU~yyT3u6eD~ni2UcH-BXp0z79G9xpsLBA1xxr8VbGISUfbRzrCK7bbKlM2s7AjHXGQRIJJHXUOXVOlIRajCSxymY2HwEUlpLRM86X0oPfv2VEhuHQlgRB8CCTWJS87-nam~v0jYnutLdIqsO0O08To95hhO~t87iGgdEp4dzEk4OE8IPcCbnjqzu~hDy1hQrg__"
            />
          </S.NonProfitsContainer>
        )
      )}
    </S.Container>
  );
}

export default NonProfitsSection;

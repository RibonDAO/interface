import Spinner from "components/atomics/Spinner";
import { useNonProfitsContext } from "contexts/nonProfitsContext";
import { useCausesContext } from "contexts/causesContext";
import { useCauseDonationContext } from "contexts/causeDonationContext";

import { useEffect } from "react";
import { logEvent } from "lib/events";
import NonProfitsList from "../NonProfitsList";
import * as S from "./styles";

function NonProfitsSection() {
  const { filteredNonProfits, isLoading: isLoadingNonProfits } =
    useNonProfitsContext();
  const { filteredCauses } = useCausesContext();
  const { chosenCause } = useCauseDonationContext();

  useEffect(() => {
    if (filteredNonProfits && filteredCauses?.length > 0) {
      logEvent("donationCardsOrder_view", {
        nonProfits: filteredNonProfits
          .map((nonProfit) => nonProfit.name)
          .join(", "),
        causes: filteredCauses?.map((cause) => cause.name).join(", "),
      });
    }
  }, [filteredNonProfits, filteredCauses]);

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

  return (
    <S.Container>
      {isLoadingNonProfits ? (
        <Spinner size="26" />
      ) : (
        filteredNonProfits && (
          <S.NonProfitsContainer>
            <NonProfitsList nonProfits={sortNonProfits()} />
          </S.NonProfitsContainer>
        )
      )}
    </S.Container>
  );
}

export default NonProfitsSection;

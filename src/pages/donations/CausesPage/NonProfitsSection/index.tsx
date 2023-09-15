import Spinner from "components/atomics/Spinner";
import { useNonProfitsContext } from "contexts/nonProfitsContext";
import { useCausesContext } from "contexts/causesContext";
import { useCauseDonationContext } from "contexts/causeDonationContext";
import { useCanDonate } from "@ribon.io/shared/hooks";
import { PLATFORM } from "utils/constants";
import { useIntegrationId } from "hooks/useIntegrationId";
import extractUrlValue from "lib/extractUrlValue";
import { useLocation } from "react-router-dom";
import { LocationStateType } from "pages/donations/CausesPage/LocationStateType";
import { useEffect } from "react";
import NonProfitsList from "../NonProfitsList";
import * as S from "./styles";

function NonProfitsSection() {
  const { nonProfitsWithPoolBalance, isLoading: isLoadingNonProfits } =
    useNonProfitsContext();
  const { causesWithPoolBalance } = useCausesContext();
  const { chosenCause } = useCauseDonationContext();
  const integrationId = useIntegrationId();
  const { search } = useLocation<LocationStateType>();
  const externalId = extractUrlValue("external_id", search);
  const { canDonate } = useCanDonate(integrationId, PLATFORM, externalId);

  const nonProfitsFilter = () => {
    if (chosenCause) {
      return (
        nonProfitsWithPoolBalance?.filter(
          (nonProfit) => nonProfit.cause?.id === chosenCause.id,
        ) || []
      );
    }
    return nonProfitsWithPoolBalance || [];
  };

  const sortNonProfits = () => {
    const filteredNonProfits = nonProfitsFilter();
    const sorted = filteredNonProfits?.sort((a, b) => {
      const causeAIndex = causesWithPoolBalance.findIndex(
        (cause) => cause.id === a.cause.id,
      );
      const causeBIndex = causesWithPoolBalance.findIndex(
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
        nonProfitsWithPoolBalance && (
          <S.NonProfitsContainer>
            <NonProfitsList
              nonProfits={sortNonProfits()}
              canDonate={canDonate}
            />
          </S.NonProfitsContainer>
        )
      )}
    </S.Container>
  );
}

export default NonProfitsSection;

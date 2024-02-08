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
  const { filteredNonProfits, isLoading: isLoadingNonProfits } =
    useNonProfitsContext();
  const { filteredCauses } = useCausesContext();
  const { chosenCause } = useCauseDonationContext();
  const integrationId = useIntegrationId();
  const { search } = useLocation<LocationStateType>();
  const externalId = extractUrlValue("external_id", search);
  const { canDonate } = useCanDonate(integrationId, PLATFORM, externalId);

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

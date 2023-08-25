import Spinner from "components/atomics/Spinner";
import * as S from "pages/donations/CausesPage/styles";
import NonProfitsList from "pages/donations/CausesPage/NonProfitsList";
import { useNonProfitsContext } from "contexts/nonProfitsContext";
import { useCausesContext } from "contexts/causesContext";
import { useCauseDonationContext } from "contexts/causeDonationContext";
import { useEffect } from "react";

type Props = {
  canDonate: boolean;
};
function NonProfitsSection({ canDonate }: Props): JSX.Element {
  const { nonProfitsWithPoolBalance, isLoading: isLoadingNonProfits } =
    useNonProfitsContext();
  const { causesWithPoolBalance } = useCausesContext();
  const { chosenCause } = useCauseDonationContext();

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

  if (isLoadingNonProfits) return <Spinner size="26" />;
  if (nonProfitsWithPoolBalance)
    return (
      <S.NonProfitsContainer>
        <NonProfitsList nonProfits={sortNonProfits()} canDonate={canDonate} />
      </S.NonProfitsContainer>
    );

  return <div />;
}

export default NonProfitsSection;

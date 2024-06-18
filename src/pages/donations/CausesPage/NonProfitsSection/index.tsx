import Spinner from "components/atomics/Spinner";
import { useNonProfitsContext } from "contexts/nonProfitsContext";
import { useTagDonationContext } from "contexts/tagDonationContext";

import NonProfitsList from "../NonProfitsList";
import * as S from "./styles";

function NonProfitsSection() {
  const { shuffledNonProfits, isLoading: isLoadingNonProfits } =
    useNonProfitsContext();
  const { chosenTag } = useTagDonationContext();

  const nonProfitsFilter = () => {
    if (chosenTag && chosenTag.nonProfits) {
      return chosenTag.nonProfits;
    }
    return shuffledNonProfits || [];
  };

  return (
    <S.Container>
      {isLoadingNonProfits ? (
        <Spinner size="26" />
      ) : (
        shuffledNonProfits && (
          <S.NonProfitsContainer>
            <NonProfitsList nonProfits={nonProfitsFilter()} />
          </S.NonProfitsContainer>
        )
      )}
    </S.Container>
  );
}

export default NonProfitsSection;

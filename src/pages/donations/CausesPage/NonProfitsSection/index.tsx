import Spinner from "components/atomics/Spinner";
import { useNonProfitsContext } from "contexts/nonProfitsContext";
import { useTagDonationContext } from "contexts/tagDonationContext";

import NonProfitsListCarousel from "../NonProfitsListCarousel";
import * as S from "./styles";

function NonProfitsSection() {
  const { filteredNonProfits, isLoading: isLoadingNonProfits } =
    useNonProfitsContext();
  const { chosenTag } = useTagDonationContext();

  const nonProfitsFilter = () => {
    if (chosenTag && chosenTag.nonProfits) {
      return chosenTag.nonProfits;
    }
    return filteredNonProfits || [];
  };

  return (
    <S.Container>
      {isLoadingNonProfits ? (
        <Spinner size="26" />
      ) : (
        filteredNonProfits && (
          <S.NonProfitsContainer>
            <NonProfitsListCarousel nonProfits={nonProfitsFilter()} />
          </S.NonProfitsContainer>
        )
      )}
    </S.Container>
  );
}

export default NonProfitsSection;

import Spinner from "components/atomics/Spinner";
import { useNonProfitsContext } from "contexts/nonProfitsContext";

import NonProfitsListCarousel from "../NonProfitsListCarousel";
import * as S from "./styles";

function NonProfitsSection() {
  const { shuffledNonProfits, isLoading: isLoadingNonProfits } =
    useNonProfitsContext();

  return (
    <S.Container>
      {isLoadingNonProfits ? (
        <Spinner size="26" />
      ) : (
        shuffledNonProfits && (
          <S.NonProfitsContainer>
            <NonProfitsListCarousel nonProfits={shuffledNonProfits} />
          </S.NonProfitsContainer>
        )
      )}
    </S.Container>
  );
}

export default NonProfitsSection;

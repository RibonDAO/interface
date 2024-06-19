import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import * as S from "./styles";

function LeftImagePlaceholder() {
  return (
    <S.LeftImageContainer>
      <Skeleton width={104} height={104} circle enableAnimation />
    </S.LeftImageContainer>
  );
}

function RightImagePlaceholder() {
  return (
    <S.RightContainer>
      <Skeleton width={104} height={104} circle enableAnimation />
    </S.RightContainer>
  );
}

export { LeftImagePlaceholder, RightImagePlaceholder };

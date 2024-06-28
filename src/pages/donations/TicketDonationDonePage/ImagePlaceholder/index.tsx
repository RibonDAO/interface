import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import * as S from "./styles";

function CardImageImagePlaceholder() {
  const width = window.innerWidth < 600 ? 328 : 426;
  const height = window.innerWidth < 600 ? 256 : 280;

  return (
    <S.CardImageContainer width={width} height={height}>
      <Skeleton width={width} height={height} enableAnimation />
    </S.CardImageContainer>
  );
}

export default CardImageImagePlaceholder;

import { useTagDonationContext } from "contexts/tagDonationContext";
import Intersection from "./assets/intersect.svg";
import * as S from "./styles";

type Props = {
  name: string;
  coverImage?: string;
  index: number;
};

function CauseImage({ name, coverImage, index }: Props) {
  const { setChosenTagIndex } = useTagDonationContext();

  const handleClick = () => {
    setChosenTagIndex(index + 1);
  };

  return (
    <S.Container onClick={() => handleClick()} key={name}>
      <S.ImageContainer src={coverImage} alt={name} />
      <S.CauseName>{name}</S.CauseName>
      <S.Intersection src={Intersection} />
    </S.Container>
  );
}

export default CauseImage;

CauseImage.defaultProps = {
  coverImage: "https://picsum.photos/296/136",
};

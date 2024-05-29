import { useTagDonationContext } from "contexts/tagDonationContext";
import Intersection from "./assets/intersect.svg";
import * as S from "./styles";

type Props = {
  id: number;
  name: string;
  coverImage?: string;
  index: number;
};

function CauseImage({ name, coverImage, id, index }: Props) {
  const { setChosenTagId, setChooseTagModalVisible, setChosenTagIndex } =
    useTagDonationContext();

  const handleClick = () => {
    setChosenTagId(id);
    setChosenTagIndex(index + 1);
    setChooseTagModalVisible(false);
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

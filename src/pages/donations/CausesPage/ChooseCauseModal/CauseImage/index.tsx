import { useCausesContext } from "contexts/causesContext";
import Intersection from "./assets/intersect.svg";
import * as S from "./styles";

type Props = {
  id: number;
  name: string;
  coverImage?: string;
};

function CauseImage({ name, coverImage, id }: Props) {
  const { setCauseIdSelectedByModal, setChooseCauseModalVisible } =
    useCausesContext();

  const handleClick = () => {
    setCauseIdSelectedByModal(id);
    setChooseCauseModalVisible(false);
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

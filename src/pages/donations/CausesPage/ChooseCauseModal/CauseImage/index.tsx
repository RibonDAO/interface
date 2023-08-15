import { useCauseDonationContext } from "contexts/causeDonationContext";
import { newLogEvent } from "lib/events";
import Intersection from "./assets/intersect.svg";
import * as S from "./styles";

type Props = {
  id: number;
  name: string;
  coverImage?: string;
  index: number;
};

function CauseImage({ name, coverImage, id, index }: Props) {
  const { setChosenCauseId, setChooseCauseModalVisible, setChosenCauseIndex } =
    useCauseDonationContext();

  const handleClick = () => {
    setChosenCauseId(id);
    setChosenCauseIndex(index + 1);
    newLogEvent("click", "P1_causeCard", { causeId: id });
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

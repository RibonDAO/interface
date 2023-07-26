import { useCauseDonationContext } from "contexts/causeDonationContext";
import { newLogEvent } from "lib/events";
import Intersection from "./assets/intersect.svg";
import * as S from "./styles";

type Props = {
  id: number;
  name: string;
  coverImage?: string;
};

function CauseImage({ name, coverImage, id }: Props) {
  const { setChosenCauseId, setChooseCauseModalVisible } =
    useCauseDonationContext();

  const handleClick = () => {
    setChosenCauseId(id);
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

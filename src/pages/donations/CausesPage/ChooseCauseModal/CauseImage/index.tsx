import useNavigation from "hooks/useNavigation";
import Intersection from "./assets/intersect.svg";
import * as S from "./styles";

type Props = {
  name: string;
  coverImage?: string;
};

function CauseImage({ name, coverImage }: Props) {
  const { navigateTo } = useNavigation();

  const handleClick = () => {
    navigateTo({
      pathname: "/",
      state: {
        chosenCause: name,
      },
    });
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

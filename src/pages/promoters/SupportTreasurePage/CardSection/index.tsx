import * as S from "./styles";
import ImpactInformationSection from "./ImpactInformationSection";
import UserSupportSection from "./UserSupportSection";

function CardSection(): JSX.Element {
  return (
    <S.CardSectionContainer>
      <ImpactInformationSection />
      <UserSupportSection />
    </S.CardSectionContainer>
  );
}

export default CardSection;

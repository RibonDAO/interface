import PromoterGivingsSection from "./PromoterGivingsSection";
import AllGivingsSection from "./AllGivingsSection";
import * as S from "./styles";

function GivingsSection(): JSX.Element {
  return (
    <S.Container>
      <PromoterGivingsSection />
      <AllGivingsSection />
    </S.Container>
  );
}
export default GivingsSection;

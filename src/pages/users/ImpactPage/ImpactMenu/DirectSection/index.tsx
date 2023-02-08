import usePersonPayments from "hooks/apiHooks/usePersonPayment";
import useNavigation from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import directIllustration from "../../assets/direct-illustration.svg";
import * as S from "../styles";
import DirectImpactCard from "./DirectImpactCard.tsx";

function DirectSection() {
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.directSection",
  });
  const handleEmptyButtonClick = () => {
    navigateTo("/promoters/support-non-profit");
  };

  const { userPersonDirectPayments } = usePersonPayments();

  const impactCards = userPersonDirectPayments || [];
  const hasPayments = impactCards?.length > 0;

  return (
    <S.Container>
      {hasPayments ? (
        <S.CardsContainer>
          {impactCards.map((item: any) => (
            <DirectImpactCard key={item.id} personPayment={item} />
          ))}
        </S.CardsContainer>
      ) : (
        <S.EmptySectionContainer>
          <S.EmptyImage src={directIllustration} />
          <S.EmptyTitle>{t("emptyTitle")}</S.EmptyTitle>
          <S.EmptyText>{t("emptyText")}</S.EmptyText>
          <S.EmptyButton
            text={t("emptyButton")}
            size="medium"
            onClick={handleEmptyButtonClick}
          />
        </S.EmptySectionContainer>
      )}
    </S.Container>
  );
}

export default DirectSection;

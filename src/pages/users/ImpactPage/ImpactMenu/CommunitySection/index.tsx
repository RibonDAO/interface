import CardTooltip from "components/moleculars/cards/CardTooltip";
import usePersonPayments from "hooks/apiHooks/usePersonPayment";
import useNavigation from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import directIllustration from "../../assets/direct-illustration.svg";
import * as S from "../styles";

function CommunitySection() {
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.communitySection",
  });

  const handleEmptyButtonClick = () => {
    navigateTo("/promoters/support-cause");
  };

  const { personPayments } = usePersonPayments();

  const impactCards = personPayments || [];
  const hasPayments = impactCards?.length > 0;

  return (
    <S.Container>
      {hasPayments ? (
        <S.CardsContainer>
          {impactCards.map((item: any) => (
            <CardTooltip
              key={item.id}
              title={item.receiver.name}
              value={item.offer.price}
              infoLeft={item.paidDate
                .split(" ")[0]
                .split("-")
                .reverse()
                .join("/")}
              tooltipSymbol="i"
              tooltipText={item.status}
              titleColor={theme.colors.orange40}
              valueColor={theme.colors.orange30}
              idTooltip={item.id}
            />
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

export default CommunitySection;

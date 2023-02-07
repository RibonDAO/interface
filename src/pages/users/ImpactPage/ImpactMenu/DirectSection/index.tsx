import CardTooltip from "components/moleculars/cards/CardTooltip";
import usePersonPayments from "hooks/apiHooks/usePersonPayment";
import { useFormattedImpactText } from "hooks/useFormattedImpactText";
import useNavigation from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import directIllustration from "../../assets/direct-illustration.svg";
import * as S from "../styles";

function DirectSection() {
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.directSection",
  });
  const handleEmptyButtonClick = () => {
    navigateTo("/promoters/support-non-profit");
  };

  const { userPersonDirectPayments } = usePersonPayments();
  const { formattedImpactText } = useFormattedImpactText();

  const impactCards = userPersonDirectPayments || [];
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
              text={formattedImpactText(
                item.receiver,
                undefined,
                true,
                true,
                item.receiver.nonProfitImpacts[0],
              )}
              infoLeft={item.paidDate
                .split(" ")[0]
                .split("-")
                .reverse()
                .join("/")}
              tooltipSymbol="i"
              icon={item.receiver.logo}
              tooltipText={item.status}
              titleColor={theme.colors.red40}
              valueColor={theme.colors.red30}
              idTooltip={item.id}
              size="large"
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

export default DirectSection;

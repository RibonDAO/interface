import CardTopImage from "components/moleculars/cards/CardTopImage";
import { useImpact } from "@ribon.io/shared/hooks";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import useNavigation from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "contexts/currentUserContext";
import ticketIllustration from "../../assets/ticket-illustration.svg";
import * as S from "../styles";

function TicketSection() {
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.ticketSection",
  });
  const handleEmptyButtonClick = () => {
    navigateTo("/");
  };

  const { currentUser } = useCurrentUser();
  const { userImpact } = useImpact(currentUser?.id);
  const { formattedImpactText } = useFormattedImpactText();

  const impactCards = userImpact || [];
  const impactItems = impactCards.filter(
    (item) => item.impact.toString() !== "0",
  );
  const hasImpact = impactItems.length > 0;

  return (
    <S.Container>
      {hasImpact ? (
        <S.CardsContainer>
          {impactItems.map((item: any) => (
            <CardTopImage
              key={item.nonProfit.id}
              title={item.nonProfit.name}
              text={
                formattedImpactText(item.nonProfit, item.impact, false, true) ||
                ""
              }
              icon={item.nonProfit.logo}
              size="large"
            />
          ))}
        </S.CardsContainer>
      ) : (
        <S.EmptySectionContainer>
          <S.EmptyImage src={ticketIllustration} />
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

export default TicketSection;

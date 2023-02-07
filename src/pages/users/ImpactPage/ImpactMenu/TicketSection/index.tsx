import CardTopImage from "components/moleculars/cards/CardTopImage";
import useImpact from "hooks/apiHooks/useImpact";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import useNavigation from "hooks/useNavigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics/firebase";
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

  const { userImpact } = useImpact();
  const { formattedImpactText } = useFormattedImpactText();

  useEffect(() => {
    logEvent("profile_view");
  }, []);

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
      ;
    </S.Container>
  );
}

export default TicketSection;

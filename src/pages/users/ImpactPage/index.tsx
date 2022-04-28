import CardEmptySection from "pages/users/ImpactPage/CardEmptySection";
import CardTopImage from "components/moleculars/cards/CardTopImage";
import { useCurrentUser } from "contexts/currentUserContext";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import useDonations from "hooks/apiHooks/useDonations";
import useImpact from "hooks/apiHooks/useImpact";
import * as S from "./styles";

function ImpactPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage",
  });
  const { currentUser } = useCurrentUser();
  const { donationsCount: ticketsUsed } = useDonations();
  const { userImpact } = useImpact();

  const userHasDonated = ticketsUsed && currentUser;

  useEffect(() => {
    logEvent("profile_view");
  }, []);

  const handleClick = () => {
    logEvent("profileShowAllButton_click");
  };

  return (
    <S.Container>
      <S.Title>{t("title").toUpperCase()}</S.Title>
      {userHasDonated ? (
        <S.Subtitle>{t("subtitle", { ticketsUsed })}</S.Subtitle>
      ) : null}

      {userHasDonated ? (
        <S.CardsButtonContainer>
          <S.Wrapper>
            {userImpact?.map((item) => (
              <CardTopImage
                key={item.nonProfit.id}
                text={`${t("impactText")} ${item.impact.toString()} ${
                  item.nonProfit.impactDescription
                }`}
                imageUrl={item.nonProfit.backgroundImage}
                imageAlt={item.impact}
              />
            ))}
          </S.Wrapper>
          <S.Button text={t("button")} onClick={handleClick} />
        </S.CardsButtonContainer>
      ) : (
        <S.EmptySectionContainer>
          <CardEmptySection
            cardText={t("noImpactText")}
            btnText={t("noImpactButton")}
          />
        </S.EmptySectionContainer>
      )}
    </S.Container>
  );
}

export default ImpactPage;

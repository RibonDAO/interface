import CardEmptySection from "pages/ImpactPage/CardEmptySection";
import CardTopImage from "components/moleculars/cards/CardTopImage";
import { useCurrentUser } from "contexts/currentUserContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import impactApi from "services/api/impactApi";
import { logError } from "services/crashReport";
import Impact from "types/entities/Impact";
import * as S from "./styles";

function ImpactPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage",
  });
  const [userImpact, setUserImpact] = useState<Impact[]>();
  const { currentUser } = useCurrentUser();

  const ticketsUsed = 10;
  const userHasDonated = ticketsUsed && currentUser;

  useEffect(() => {
    logEvent("profile_view");

    async function fetchImpact() {
      const id = currentUser ? currentUser.id : null;
      try {
        const { data } = await impactApi.getImpact(id);
        setUserImpact(data);
      } catch (e) {
        logError(e);
      }
    }

    fetchImpact();
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

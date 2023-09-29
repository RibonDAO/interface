import CardLargeImage from "components/moleculars/cards/CardLargeImage";
import { useTranslation } from "react-i18next";
import useCheckoutNavigation from "hooks/useCheckoutNavigation";
import {
  useNonProfits,
  useOffers,
  useStatistics,
} from "@ribon.io/shared/hooks";
import { useEffect, useState } from "react";
import { coinByLanguage } from "lib/coinByLanguage";
import { useLanguage } from "hooks/useLanguage";
import { Currencies, NonProfit, Offer } from "@ribon.io/shared/types";
import { useCurrentUser } from "contexts/currentUserContext";
import { useUserLevel } from "contexts/userLevelContext";
import { useExperiment } from "@growthbook/growthbook-react";
import { logEvent } from "lib/events";
import HeartImage from "assets/icons/heart.svg";
import UserProgress from "pages/users/ImpactedLivesSection/UserProgress";
import * as S from "./styles";

type Props = {
  from: string;
  showUserProgress?: boolean;
};
function ImpactMoreLivesCTA({
  from,
  showUserProgress = false,
}: Props): JSX.Element {
  const { value: isProgressionEnabled } = useExperiment({
    key: "progression-test-first-stage",
    variations: [false, true],
  });

  const { value: isTicketBasedImpact } = useExperiment({
    key: "ticket-impact-test",
    variations: [false, true],
  });

  const { t: impactMoreLives } = useTranslation("translation", {
    keyPrefix: "impactPage.impactMoreLivesCTA",
  });

  const { t: buyMoreTickets } = useTranslation("translation", {
    keyPrefix: "impactPage.buyMoreTicketsCTA",
  });

  const [currentCoin, setCurrentCoin] = useState(Currencies.BRL);
  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const [currentNonProfit, setCurrentNonProfit] = useState<NonProfit>();
  const { navigateToCheckout } = useCheckoutNavigation();
  const { offers } = useOffers(currentCoin, false);
  const { currentLang } = useLanguage();
  const { currentUser } = useCurrentUser();
  const { userStatistics } = useStatistics({
    userId: currentUser?.id ?? undefined,
  });
  const { nonProfits } = useNonProfits();
  const {
    userExperience: totalLivesImpacted,
    currentLevelExperience,
    userLevel,
    nextLevelExperience,
    percentageCompleted,
  } = useUserLevel();

  useEffect(() => {
    setCurrentCoin(coinByLanguage(currentLang));
  }, [currentLang]);

  useEffect(() => {
    setCurrentOffer(offers[0]);
  }, [JSON.stringify(offers)]);

  useEffect(() => {
    setCurrentNonProfit(
      nonProfits?.find((np) => np.id === userStatistics?.lastDonatedNonProfit),
    );
  }, [JSON.stringify(nonProfits), userStatistics?.lastDonatedNonProfit]);

  const onButtonClick = () => {
    logEvent("impactMoreLivesCTA_click", {
      from,
    });
    if (currentOffer && userStatistics?.lastDonatedNonProfit)
      navigateToCheckout(
        "non_profit",
        userStatistics?.lastDonatedNonProfit,
        currentOffer,
        false,
      );
  };

  const livesValue = Math.round(Number(currentOffer?.priceValue ?? 50) * 2);

  const buttonValue = isProgressionEnabled ? currentOffer?.price : livesValue;
  const t = isProgressionEnabled ? impactMoreLives : buyMoreTickets;
  const showDivider = isTicketBasedImpact && !isProgressionEnabled;

  return (
    <S.Container>
      <S.Title>
        {t("title", {
          lives: totalLivesImpacted,
        })}
      </S.Title>
      <S.Subtitle>
        {t("subtitle", { value: currentOffer?.price, lives: livesValue })}
      </S.Subtitle>
      <CardLargeImage
        title={t("cardTitle", { value: currentOffer?.price })}
        icon={<S.Icon src={HeartImage} alt="heart image" />}
        subtitle={t("cardSubtitle", {
          value: livesValue,
        })}
        image={currentNonProfit?.mainImage || ""}
        buttonText={t("buttonText", { value: buttonValue })}
        description={t("description", {
          impact: currentNonProfit?.impactDescription.split(",")[1],
        })}
        onButtonClick={onButtonClick}
      >
        {showUserProgress && !isTicketBasedImpact ? (
          <S.UserProgressContainer>
            <UserProgress
              currentExperience={totalLivesImpacted}
              totalExperienceToNextLevel={nextLevelExperience}
              currentLevelExperience={currentLevelExperience}
              nextLevel={userLevel + 1}
              percentageCompleted={percentageCompleted}
            />
          </S.UserProgressContainer>
        ) : (
          <div />
        )}
      </CardLargeImage>
      {showDivider && <S.Divider />}
    </S.Container>
  );
}

export default ImpactMoreLivesCTA;

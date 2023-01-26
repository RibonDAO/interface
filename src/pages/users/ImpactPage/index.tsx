import CardEmptySection from "pages/users/ImpactPage/CardEmptySection";
import CardTopImage from "components/moleculars/cards/CardTopImage";
import { useCurrentUser } from "contexts/currentUserContext";
import { Fragment, useEffect, useState } from "react";
import { impactNormalizer } from "@ribon.io/shared/lib";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import useDonations from "hooks/apiHooks/useDonations";
import useImpact from "hooks/apiHooks/useImpact";
import * as S from "./styles";

function ImpactPage(): JSX.Element {
  const INITIAL_CARDS_COUNT = 2;
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage",
  });
  const { t: normalizerTranslation } = useTranslation("translation", {
    keyPrefix: "impactNormalizer",
  });

  const { currentUser } = useCurrentUser();
  const { donationsCount: ticketsUsed } = useDonations();
  const { userImpact } = useImpact();
  const [impactCardsToShow, setImpactCardsToShow] =
    useState<number>(INITIAL_CARDS_COUNT);

  const userHasDonated = !!ticketsUsed && currentUser;

  useEffect(() => {
    logEvent("profile_view");
  }, []);

  const handleClick = () => {
    logEvent("profileShowAllButton_click");
    setImpactCardsToShow(userImpact?.length || INITIAL_CARDS_COUNT);
  };

  const impactCards = () => userImpact?.slice(0, impactCardsToShow) || [];
  const shouldShowButton = () =>
    userImpact?.length &&
    userImpact.length > INITIAL_CARDS_COUNT &&
    userImpact.length > impactCardsToShow;
  const hasImpact = () => impactCards().length > 0;

  // TODO: Remove this fallback when all nonProfits are using the new impact
  const formattedImpactText = (item: any) => {
    const { nonProfit, impact } = item;
    const impacts = nonProfit?.nonProfitImpacts || [];
    const nonProfitsImpactsLength = impacts.length;
    const roundedImpact = impact;

    if (roundedImpact && impacts && nonProfitsImpactsLength) {
      const lastImpact = impacts[nonProfitsImpactsLength - 1];
      if (lastImpact.donorRecipient) {
        const normalizedImpact = impactNormalizer(
          nonProfit,
          roundedImpact,
          normalizerTranslation,
        );

        return (
          <>
            {normalizedImpact.map((slice, index) => (
              <Fragment key={index.toString()}>
                {index % 2 === 0 ? <b>{slice}</b> : slice}{" "}
              </Fragment>
            ))}
          </>
        );
      }
    }
    return `${t("impactText")} ${item.impact.toString()} ${
      item.nonProfit.impactDescription
    }`;
  };

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      {userHasDonated && (
        <S.Subtitle>{t("subtitle", { ticketsUsed })}</S.Subtitle>
      )}

      {hasImpact() ? (
        <S.CardsButtonContainer>
          <S.Wrapper>
            {impactCards().map(
              (item) =>
                item.impact.toString() !== "0" && (
                  <CardTopImage
                    key={item.nonProfit.id}
                    title={item.nonProfit.name}
                    text={formattedImpactText(item)}
                    imageUrl={item.nonProfit.logo}
                    imageAlt={item.impact}
                  />
                ),
            )}
          </S.Wrapper>
          {shouldShowButton() && (
            <S.CardButton text={t("button")} onClick={handleClick} />
          )}
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

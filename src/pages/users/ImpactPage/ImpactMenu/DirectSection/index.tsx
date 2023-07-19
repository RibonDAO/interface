import usePersonPayments from "hooks/apiHooks/usePersonPayment";
import useNavigation from "hooks/useNavigation";
import Spinner from "components/atomics/Spinner";
import { useTranslation } from "react-i18next";
import useBreakpoint from "hooks/useBreakpoint";
import { useEffect, useState } from "react";
import directIllustration from "assets/images/direct-illustration.svg";
import ContributionCard from "components/moleculars/cards/ContributionCard";
import { useImpactConversion } from "hooks/useImpactConversion";
import { handleVariation } from "lib/handleVariation";
import { logEvent } from "lib/events";
import * as S from "../styles";
import DirectImpactCard from "./DirectImpactCard.tsx";

function DirectSection() {
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.directSection",
  });
  const handleEmptyButtonClick = () => {
    logEvent("giveNonProfitCard_click", {
      from: "impactEmptyState",
    });
    navigateTo("/promoters/support-non-profit");
  };

  const { isMobile } = useBreakpoint();

  const [page, setPage] = useState(1);

  const per = isMobile ? 6 : 8;

  const [showMoreDisabled, setShowMoreDisabled] = useState(false);
  const [showMoreVisible, setShowMoreVisible] = useState(true);

  const [impactCards, setImpactCards] = useState<any>([]);

  const { useDirectPersonPayments } = usePersonPayments();
  const { data } = useDirectPersonPayments(page, per);

  const { description, contribution, offer, nonProfit, variation } =
    useImpactConversion();

  const hasPayments = impactCards?.length > 0;

  const hasDuplicatedIds = (items: any[]) => {
    const existentIds = new Set(impactCards.map((obj: any) => obj.id));
    const newIds = items.map((obj: any) => obj.id);

    return newIds.some((id) => existentIds.has(id));
  };

  useEffect(() => {
    if (!data) return;

    if (data.length === 0) {
      setShowMoreVisible(false);
      return;
    }

    if (page === 1) {
      setImpactCards(data);
    } else if (!hasDuplicatedIds(data) && page > 1) {
      setImpactCards((items: any) => [...items, ...data]);
    }

    setShowMoreDisabled(false);
    if (data.length < per) setShowMoreVisible(false);
  }, [data, page]);

  const handleShowMoreClick = () => {
    setPage(page + 1);
    setShowMoreDisabled(true);
  };

  const emptySection = () => (
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
  );

  const contributionWithVariation = () => (
    <S.EmptySectionContainer>
      <S.EmptyTitle>{t("emptyTitle")}</S.EmptyTitle>
      <S.EmptyText>{t("emptyText")}</S.EmptyText>
      <ContributionCard
        description={description}
        impact={contribution?.impact ?? ""}
        value={contribution?.value ?? 0}
        offer={offer}
        nonProfit={nonProfit}
        style={{
          marginTop: isMobile ? "0" : "8px",
          width: isMobile ? "110%" : "100%",
          textAlign: "start",
          borderRadius: isMobile ? "0" : "8px",
        }}
        from="impact_page"
        flow="nonProfit"
      />
    </S.EmptySectionContainer>
  );

  const EmptySectionWithVariation: JSX.Element | null = handleVariation(
    variation,
    emptySection,
    contributionWithVariation,
    {},
  );

  return (
    <S.Container>
      {hasPayments ? (
        <S.CardsContainer>
          {impactCards.map((item: any) => (
            <DirectImpactCard key={item.id} personPayment={item} />
          ))}

          {showMoreVisible && (
            <S.ShowMoreButtonContainer>
              <S.ShowMoreButton
                text={showMoreDisabled ? <Spinner size="14" /> : t("showMore")}
                size="medium"
                onClick={handleShowMoreClick}
                disabled={showMoreDisabled}
              />
            </S.ShowMoreButtonContainer>
          )}
        </S.CardsContainer>
      ) : (
        (!!contribution && EmptySectionWithVariation) || emptySection()
      )}
    </S.Container>
  );
}

export default DirectSection;

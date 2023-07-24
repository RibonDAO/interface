import { logEvent } from "lib/events";
import CardTooltip from "components/moleculars/cards/CardTooltip";
import usePersonPayments from "hooks/apiHooks/usePersonPayment";
import useNavigation from "hooks/useNavigation";
import { formatFee } from "lib/formatters/feeFormatter";
import { useEffect, useState } from "react";
import Spinner from "components/atomics/Spinner";
import { formatNetDonation } from "lib/formatters/netDonationFormatter";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import useBreakpoint from "hooks/useBreakpoint";
import directIllustration from "assets/images/direct-illustration.svg";
import { useLegacyContributions } from "@ribon.io/shared/hooks";
import useContributions from "hooks/apiHooks/useContributions";
import { useCurrentUser } from "contexts/currentUserContext";
import parse from "html-react-parser";
import ContributionCard from "components/moleculars/cards/ContributionCard";
import { useImpactConversion } from "hooks/useImpactConversion";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { handleVariation } from "lib/handleVariation";
import useContributionActivity from "hooks/useContributionActivity";
import * as S from "../styles";

function CommunitySection() {
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.communitySection",
  });

  const handleEmptyButtonClick = () => {
    logEvent("giveCauseCard_click", {
      from: "impactEmptyState",
    });
    navigateTo("/promoters/support-cause");
  };

  const { useLabelableContributions } = useContributions();

  const { isMobile } = useBreakpoint();

  const [page, setPage] = useState(1);
  const per = isMobile ? 6 : 8;

  const [showMoreDisabled, setShowMoreDisabled] = useState(false);
  const [showMoreVisible, setShowMoreVisible] = useState(true);
  const [impactCards, setImpactCards] = useState<any>([]);

  const { useCommunityPersonPayments } = usePersonPayments();
  const { currentUser } = useCurrentUser();
  const { legacyContributions } = useLegacyContributions(currentUser?.id);
  const { data: userContributions } = useLabelableContributions();

  const { data } = useCommunityPersonPayments(page, per);

  const { contribution, offer, nonProfit, variation } = useImpactConversion();
  const { setHasSeenToday } = useContributionActivity();

  const hasDuplicatedIds = (items: any[]) => {
    const existentIds = new Set(impactCards.map((obj: any) => obj.id));
    const newIds = items.map((obj: any) => obj.id);

    return newIds.some((id) => existentIds.has(id));
  };

  useEffect(() => {
    setHasSeenToday();
  }, []);

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

  const hasImpactCards =
    impactCards?.length > 0 ||
    (legacyContributions?.length && legacyContributions?.length > 0);

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
        title={t("titleCard", { cause: nonProfit?.cause.name })}
        description={t("communityDescription")}
        impact={`+${formatPrice(
          contribution?.communityValue ?? 0,
          "brl",
        ).replace(/\s/g, "")}`}
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
        flow="cause"
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
      {hasImpactCards ? (
        <S.CardsContainer>
          {userContributions &&
            userContributions?.map((item) => (
              <CardTooltip
                key={item.id}
                title={item.receiver?.name}
                value={
                  item.personPayment.offer
                    ? item.personPayment.offer.price
                    : `${item.personPayment.amountCents / 100} USDC`
                }
                infoLeft={item.personPayment.paidDate
                  .split(" ")[0]
                  .split("-")
                  .reverse()
                  .join("/")}
                tooltipSymbol="i"
                titleColor={theme.colors.brand.secondary[700]}
                valueColor={theme.colors.brand.secondary[400]}
                idTooltip={item.id.toString()}
                onPress={() => {
                  logEvent("contributionDashCta_Btn_click", {
                    from: "impact_page",
                  });
                  navigateTo(`/contribution-stats/${item.id}`);
                }}
                callToAction={t("callToAction")}
                text={parse(t("cardText", { cause: item.receiver?.name }))}
              >
                <S.TooltipText>
                  <S.Paragraph>
                    {t("tooltipFirstParagraphText", {
                      value: formatNetDonation(
                        item.personPayment.serviceFees,
                        item.personPayment.amountCents,
                        item.personPayment.offer?.priceCents,
                        item.personPayment.offer?.currency,
                      ),
                    })}
                  </S.Paragraph>
                  <S.Paragraph>
                    {t("tooltipSecondParagraphText", {
                      value: formatFee(
                        item.personPayment.serviceFees,
                        item.personPayment.offer?.currency,
                      ),
                    })}
                  </S.Paragraph>
                </S.TooltipText>
              </CardTooltip>
            ))}
          {legacyContributions?.map((item) => (
            <CardTooltip
              key={item.id}
              title={t("generalReceiver")}
              label={t("migrated")}
              value={item.value}
              infoLeft={item.day?.split(" ")[0].split("-").reverse().join("/")}
              tooltipSymbol="i"
              titleColor={theme.colors.brand.secondary[700]}
              valueColor={theme.colors.brand.secondary[400]}
              idTooltip={item.id?.toString()}
            />
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

export default CommunitySection;

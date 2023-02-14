import CardTooltip from "components/moleculars/cards/CardTooltip";
import usePersonPayments from "hooks/apiHooks/usePersonPayment";
import useNavigation from "hooks/useNavigation";
import { formatFee } from "lib/formatters/feeFormatter";
import { useEffect, useState } from "react";
import Spinner from "components/atomics/Spinner";
import { formatNetDonation } from "lib/formatters/netDonationFormatter";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import { PersonPayment } from "types/entities/PersonPayment";
import useBreakpoint from "hooks/useBreakpoint";
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

  const { isMobile } = useBreakpoint();

  const [page, setPage] = useState(1);
  const per = isMobile ? 6 : 8;

  const [showMoreDisabled, setShowMoreDisabled] = useState(false);
  const [showMoreVisible, setShowMoreVisible] = useState(true);
  const [impactCards, setImpactCards] = useState<any>([]);

  const { useCommunityPersonPayments } = usePersonPayments();

  const { data } = useCommunityPersonPayments(page, per);

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

  const hasImpactCards = impactCards?.length > 0;

  const handleShowMoreClick = () => {
    setPage(page + 1);
    setShowMoreDisabled(true);
  };

  return (
    <S.Container>
      {hasImpactCards ? (
        <S.CardsContainer>
          {impactCards.map((item: PersonPayment) => (
            <CardTooltip
              key={item.id}
              title={item.receiver.name}
              value={
                item.offer ? item.offer.price : `${item.amountCents / 100} USDC`
              }
              infoLeft={item.paidDate
                .split(" ")[0]
                .split("-")
                .reverse()
                .join("/")}
              tooltipSymbol="i"
              titleColor={theme.colors.brand.secondary[700]}
              valueColor={theme.colors.brand.secondary[400]}
              idTooltip={item.id}
            >
              <S.TooltipText>
                <S.Paragraph>
                  {t("tooltipFirstParagraphText", {
                    value: formatNetDonation(
                      item.serviceFees,
                      item.amountCents,
                      item.offer?.priceCents,
                      item.offer?.currency,
                    ),
                  })}
                </S.Paragraph>
                <S.Paragraph>
                  {t("tooltipSecondParagraphText", {
                    value: formatFee(item.serviceFees, item.offer?.currency),
                  })}
                </S.Paragraph>
              </S.TooltipText>
            </CardTooltip>
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

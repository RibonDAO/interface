import CardTooltip from "components/moleculars/cards/CardTooltip";
import usePersonPayments from "hooks/apiHooks/usePersonPayment";
import useNavigation from "hooks/useNavigation";
import { formatPriceWithZeros } from "lib/formatters/currencyFormatter";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
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

  const { userPersonCommunityPayments, guestPersonCommunityPayments } =
    usePersonPayments();

  const impactCards =
    userPersonCommunityPayments?.concat(guestPersonCommunityPayments || []) ||
    [];
  const impactCardsDesc = [...impactCards].sort((a, b) =>
    a.paidDate > b.paidDate ? -1 : 1,
  );
  const hasImpactCards = impactCards?.length > 0;

  const formatPrice = (item: any) => {
    if (!item.offer) {
      return `${item.amountCents / 100} USDC`;
    }
    return formatPriceWithZeros(
      item.offer.priceCents / 100 - item.serviceFees,
      item.offer.currency,
      "en",
    );
  };

  const formatFee = (item: any) => {
    if (!item.offer) {
      return "0 USDC";
    }
    return formatPriceWithZeros(
      item.serviceFees,
      item.offer.currency,
      item.offer.currency === "brl" ? "pt" : "en",
    );
  };

  return (
    <S.Container>
      {hasImpactCards ? (
        <S.CardsContainer>
          {impactCardsDesc.map((item: any) => (
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
              titleColor={theme.colors.orange40}
              valueColor={theme.colors.orange30}
              idTooltip={item.id}
            >
              <S.TooltipText>
                <S.Paragraph>
                  {t("tooltipFirstParagraphText", {
                    value: formatPrice(item),
                  })}
                </S.Paragraph>
                <S.Paragraph>
                  {t("tooltipSecondParagraphText", {
                    value: formatFee(item),
                  })}
                </S.Paragraph>
              </S.TooltipText>
            </CardTooltip>
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

export default CommunitySection;

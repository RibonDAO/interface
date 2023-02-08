import CardTooltip from "components/moleculars/cards/CardTooltip";
import usePersonPayments from "hooks/apiHooks/usePersonPayment";
import { useFormattedImpactText } from "hooks/useFormattedImpactText";
import useNavigation from "hooks/useNavigation";
import { formatPriceWithZeros } from "lib/formatters/currencyFormatter";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import directIllustration from "../../assets/direct-illustration.svg";
import * as S from "../styles";

function DirectSection() {
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.directSection",
  });
  const handleEmptyButtonClick = () => {
    navigateTo("/promoters/support-non-profit");
  };

  const { userPersonDirectPayments } = usePersonPayments();
  const { formattedImpactText } = useFormattedImpactText();

  const impactCards = userPersonDirectPayments || [];
  const hasPayments = impactCards?.length > 0;

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
      {hasPayments ? (
        <S.CardsContainer>
          {impactCards.map((item: any) => (
            <CardTooltip
              key={item.id}
              title={item.receiver.name}
              value={item.offer.price}
              text={formattedImpactText(
                item.receiver,
                undefined,
                true,
                true,
                item.receiver.nonProfitImpacts[0],
              )}
              infoLeft={item.paidDate
                .split(" ")[0]
                .split("-")
                .reverse()
                .join("/")}
              tooltipSymbol="i"
              icon={item.receiver.logo}
              titleColor={theme.colors.red40}
              valueColor={theme.colors.red30}
              idTooltip={item.id}
              size="large"
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

export default DirectSection;

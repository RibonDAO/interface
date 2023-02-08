import CardTooltip from "components/moleculars/cards/CardTooltip";
import useNonProfitImpact from "hooks/apiHooks/useNonProfitImpact";
import { useFormattedImpactText } from "hooks/useFormattedImpactText";
import { formatPriceWithZeros } from "lib/formatters/currencyFormatter";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import * as S from "../../styles";

type Props = {
  personPayment: any;
};

function DirectImpactCard({ personPayment }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.directSection",
  });

  const { formattedImpactText } = useFormattedImpactText();
  const { nonProfitImpact } = useNonProfitImpact(
    personPayment.receiver.id,
    personPayment.offer.priceValue,
    personPayment.offer.currency,
  );

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
    <CardTooltip
      key={personPayment.id}
      title={personPayment.receiver.name}
      value={personPayment.offer.price}
      text={formattedImpactText(
        personPayment.receiver,
        undefined,
        true,
        true,
        nonProfitImpact,
      )}
      infoLeft={personPayment.paidDate
        .split(" ")[0]
        .split("-")
        .reverse()
        .join("/")}
      tooltipSymbol="i"
      icon={personPayment.receiver.logo}
      titleColor={theme.colors.brand.tertiary[800]}
      valueColor={theme.colors.brand.tertiary[400]}
      idTooltip={personPayment.id}
      size="large"
    >
      <S.TooltipText>
        <S.Paragraph>
          {t("tooltipFirstParagraphText", {
            value: formatPrice(personPayment),
          })}
        </S.Paragraph>
        <S.Paragraph>
          {t("tooltipSecondParagraphText", {
            value: formatFee(personPayment),
          })}
        </S.Paragraph>
      </S.TooltipText>
    </CardTooltip>
  );
}

export default DirectImpactCard;

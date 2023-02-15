import CardTooltip from "components/moleculars/cards/CardTooltip";
import { useNonProfitImpact } from "@ribon.io/shared/hooks";
import { useFormattedImpactText } from "hooks/useFormattedImpactText";
import { formatFee } from "lib/formatters/feeFormatter";
import { formatNetDonation } from "lib/formatters/netDonationFormatter";
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
            value: formatNetDonation(
              personPayment.serviceFees,
              personPayment.amountCents,
              personPayment.offer.priceCents,
              personPayment.offer.currency,
            ),
          })}
        </S.Paragraph>
        <S.Paragraph>
          {t("tooltipSecondParagraphText", {
            value: formatFee(
              personPayment.serviceFees,
              personPayment.offer.currency,
            ),
          })}
        </S.Paragraph>
      </S.TooltipText>
    </CardTooltip>
  );
}

export default DirectImpactCard;

import CardTooltip from "components/moleculars/cards/CardTooltip";
import usePersonPayments from "hooks/apiHooks/usePersonPayment";
import useNavigation from "hooks/useNavigation";
import { formatFee } from "lib/formatters/feeFormatter";
import { formatNetDonation } from "lib/formatters/netDonationFormatter";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import { PersonPayment } from "types/entities/PersonPayment";
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

  return (
    <S.Container>
      {hasImpactCards ? (
        <S.CardsContainer>
          {impactCardsDesc.map((item: PersonPayment) => (
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

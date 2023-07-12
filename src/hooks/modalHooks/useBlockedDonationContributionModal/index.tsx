import { useTranslation } from "react-i18next";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useEffect } from "react";
import theme from "styles/theme";
import { useImpactConversion } from "hooks/useImpactConversion";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { logEvent } from "lib/events";
import useNavigation from "hooks/useNavigation";
import { useModal } from "../useModal";

export function useBlockedDonationContributionModal(initialState?: boolean) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage.blockedModal",
  });
  const { primary } = theme.colors.brand;
  const { contribution, nonProfit, offer, description } = useImpactConversion();
  const { navigateTo } = useNavigation();

  const handleClickedDonationButton = () => {
    logEvent("giveNgoBtn_start", {
      from: "zeroTickets_modal",
      value: contribution?.value,
      coin: offer?.currency,
      causeId: nonProfit?.cause?.id,
      platform: "web",
    });

    navigateTo({
      pathname: "promoters/payment",
      state: {
        offer,
        nonProfit,
        flow: "nonProfit",
        cause: nonProfit?.cause,
      },
    });
  };

  const highlightedText = (
    <>
      {description && <>{description} </>}
      {contribution?.impact && <b>{contribution?.impact}</b>}
    </>
  );

  const { show, hide } = useModal({
    type: MODAL_TYPES.MODAL_DIALOG,

    props: {
      visible: true,
      title: t("titleContributionModal"),
      description: t("descriptionContributionModal"),
      icon: "confirmation_number",
      iconColor: primary[500],
      highlightedText,
      primaryButton: {
        text: t("buttonContributionModal", {
          value: formatPrice(contribution?.value ?? 0, "brl"),
        }),
        onClick: handleClickedDonationButton,
      },
    },
  });

  const showBlockedDonationContributionModal = () => {
    logEvent("contributeNgoBtn_view", {
      from: "zeroTickets_modal",
      platform: "web",
    });
    show();
  };

  const hideBlockedDonationContributionModal = () => {
    hide();
  };

  useEffect(() => {
    if (initialState) showBlockedDonationContributionModal();
  }, []);

  return {
    showBlockedDonationContributionModal,
    hideBlockedDonationContributionModal,
  };
}

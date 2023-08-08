import { useTranslation } from "react-i18next";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useEffect } from "react";
import theme from "styles/theme";
import { useImpactConversion } from "hooks/useImpactConversion";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { logEvent } from "lib/events";
import useNavigation from "hooks/useNavigation";
import { useModalContext } from "contexts/modalContext";
import { useModal } from "../useModal";

export function useBlockedDonationContributionModal(initialState?: boolean) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage.blockedModal",
  });
  const { primary } = theme.colors.brand;
  const { contribution, nonProfit, offer, description } = useImpactConversion();
  const { navigateTo } = useNavigation();
  const { hideModal } = useModalContext();

  const handleClickedDonationButton = () => {
    logEvent("giveNgoBtn_start", {
      from: "zeroTickets_modal",
      value: contribution?.value ?? offer?.priceValue ?? 0,
      coin: offer?.currency,
      causeId: nonProfit?.cause?.id,
      platform: "web",
    });

    const searchParams = new URLSearchParams({
      offer: "0",
      target: "non_profit",
      target_id: nonProfit?.id?.toString() ?? "",
      currency: offer?.currency.toUpperCase() ?? "BRL",
    });
    hideModal();

    navigateTo({
      pathname: "/promoters/checkout",
      search: searchParams.toString(),
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
          value: formatPrice(
            contribution?.value ?? offer?.priceValue ?? 0,
            "brl",
          ),
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

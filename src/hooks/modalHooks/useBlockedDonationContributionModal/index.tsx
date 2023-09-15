import { useTranslation } from "react-i18next";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useEffect } from "react";
import theme from "styles/theme";
import { useImpactConversion } from "hooks/useImpactConversion";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { logEvent } from "lib/events";
import useNavigation from "hooks/useNavigation";
import { useLanguage } from "hooks/useLanguage";
import { useModalContext } from "contexts/modalContext";
import { useExperiment } from "@growthbook/growthbook-react";
import { useModal } from "../useModal";

export function useBlockedDonationContributionModal(initialState?: boolean) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage.blockedModal",
  });
  const { primary } = theme.colors.brand;
  const { contribution, nonProfit, offer, description } = useImpactConversion();
  const { navigateTo } = useNavigation();
  const { hideModal } = useModalContext();
  const { currentLang } = useLanguage();

  const currentCurrency = currentLang === "pt-BR" ? "BRL" : "USD";

  const variationUnderstanding = useExperiment({
    key: "understanding-test",
    variations: ["control", "growth"],
  });

  const handleClickedDonationButton = () => {
    logEvent("giveNgoBtn_start", {
      from: "zeroTickets_modal",
      value: contribution?.value ?? offer?.priceValue ?? 0,
      coin: offer?.currency,
      causeId: nonProfit?.cause?.id,
      platform: "web",
      variation: variationUnderstanding.value,
    });

    const searchParams = new URLSearchParams({
      offer: offer?.priceCents.toString() ?? "0",
      target: "non_profit",
      target_id: nonProfit?.id?.toString() ?? "",
      currency: offer?.currency.toUpperCase() ?? currentCurrency,
    });
    hideModal();

    navigateTo({
      pathname: "/promoters/recurrence",
      search: searchParams.toString(),
    });
  };
  const variation = useExperiment({
    key: "progression-test-first-stage",
    variations: [false, true],
  });

  const newImpactFormat = (
    <>
      {t("impactOneLife")}{" "}
      {t("impactDescription", {
        value: nonProfit?.impactDescription.split(",")[0],
      })}
    </>
  );

  const oldImpactFormat = (
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
      highlightedText: variation.value ? newImpactFormat : oldImpactFormat,
      primaryButton: {
        text: t("buttonContributionModal", {
          value: formatPrice(
            contribution?.value ?? offer?.priceValue ?? 0,
            offer?.currency ?? "brl",
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

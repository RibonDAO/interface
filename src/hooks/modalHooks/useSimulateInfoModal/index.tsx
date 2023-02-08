import { useTranslation } from "react-i18next";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import questionMarks from "assets/images/question-marks.svg";
import { useEffect } from "react";
import { useModal } from "../useModal";

export function useSimulateInfoModal(initialState?: boolean) {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportTreasurePage.cardSection.simulateInfoModal",
  });

  const { show, hide } = useModal({
    type: MODAL_TYPES.MODAL_ICON,
    props: {
      title: t("title"),
      body: t("body"),
      primaryButton: {
        text: t("primaryButtonText"),
        onClick: () => hide(),
      },
      onClose: () => hide(),
      icon: questionMarks,
    },
  });

  const showSimulateInfoModal = () => {
    show();
  };

  const hideSimulateInfoModal = () => {
    hide();
  };

  useEffect(() => {
    if (initialState) showSimulateInfoModal();
  }, []);

  return { showSimulateInfoModal, hideSimulateInfoModal };
}

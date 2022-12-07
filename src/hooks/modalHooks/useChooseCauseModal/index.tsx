import { useCausesContext } from "contexts/causesContext";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useCallback, useEffect } from "react";
// import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import Cause from "types/entities/Cause";
import { useModal } from "../useModal";
import CauseImage from "./CauseImage";

export function useChooseCauseModal() {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

  const { causes, refetch } = useCausesContext();

  const causesList = useCallback(
    () =>
      causes.map((cause: Cause) => (
        <CauseImage
          key={cause.name}
          name={cause.name}
          coverImage={cause.mainImage}
        />
      )),
    [causes],
  );

  const { show, hide } = useModal({
    type: MODAL_TYPES.MODAL_ROWS,
    props: {
      title: t("chooseCauseModalTitle"),
      children: causesList(),
    },
  });

  const showChooseCauseModal = useCallback(() => {
    show();
    setTimeout(() => {
      logEvent("dailyTicketDial_view");
      hide();
    }, 3000);
  }, [causes]);

  useEffect(() => {
    console.log(causes);
    refetch();
  }, []);

  return { showChooseCauseModal };
}

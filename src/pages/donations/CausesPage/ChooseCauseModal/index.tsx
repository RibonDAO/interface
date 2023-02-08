import ModalRows from "components/moleculars/modals/ModalRows";
import { useCausesContext } from "contexts/causesContext";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import Cause from "types/entities/Cause";
import CauseImage from "./CauseImage";

type Props = {
  visible: boolean;
};

export function ChooseCauseModal({ visible }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

  const { activeCauses } = useCausesContext();

  const causesList = useCallback(
    () =>
      activeCauses?.map((cause: Cause) => (
        <CauseImage
          key={cause.id}
          id={cause.id}
          name={cause.name}
          coverImage={cause.coverImage}
        />
      )),
    [activeCauses],
  );

  return (
    <ModalRows
      title={t("chooseCauseModalTitle")}
      visible={visible}
      eventName="P1_causeModal"
    >
      {causesList()}
    </ModalRows>
  );
}

export default ChooseCauseModal;

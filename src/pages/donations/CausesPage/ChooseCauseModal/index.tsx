import ModalRows from "components/moleculars/modals/ModalRows";
import { useCausesContext } from "contexts/causesContext";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Cause } from "@ribon.io/shared/types";
import CauseImage from "./CauseImage";

type Props = {
  visible: boolean;
};

export function ChooseCauseModal({ visible }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

  const { filteredCauses: causes } = useCausesContext();

  const causesList = useCallback(
    () =>
      causes?.map((cause: Cause, index) => (
        <CauseImage
          key={cause.id}
          name={cause.name}
          coverImage={cause.coverImage}
          index={index}
        />
      )),
    [causes],
  );

  return (
    <ModalRows title={t("chooseCauseModalTitle")} visible={visible}>
      {causesList()}
    </ModalRows>
  );
}

export default ChooseCauseModal;

import ModalIcon from "components/moleculars/modals/ModalIcon";
import TreasureIcon from "assets/icons/treasure-icon.svg";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { logEvent } from "lib/events";
import * as S from "./styles";

export const TREASURE_MODAL_ONBOARDING_VIEWED_KEY =
  "TREASURE_MODAL_ONBOARDING_VIEWED_KEY";

function ModalOnboarding(): JSX.Element {
  const [visible, setVisible] = useState(
    getLocalStorageItem(TREASURE_MODAL_ONBOARDING_VIEWED_KEY) !== "true",
  );

  useEffect(() => {
    logEvent("treasureOnboardingMdl_view");
    setLocalStorageItem(TREASURE_MODAL_ONBOARDING_VIEWED_KEY, "true");
  }, []);

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.treasurePage.modalOnboarding",
  });

  return (
    <S.Container>
      <ModalIcon
        icon={TreasureIcon}
        visible={visible}
        title={t("title")}
        body={t("subtitle")}
        primaryButton={{
          text: t("button"),
          onClick: () => setVisible(false),
        }}
        onClose={() => setVisible(false)}
      />
    </S.Container>
  );
}

export default ModalOnboarding;

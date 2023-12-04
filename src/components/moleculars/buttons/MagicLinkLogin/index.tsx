import React from "react";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import { logEvent } from "lib/events";

type Props = {
  onContinue: () => void;
  from: string;
};
function MagicLinkLogin({ onContinue, from }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.moleculars.buttons.MagicLinkLogin",
  });

  const handleMagicLink = () => {
    logEvent("authEmailBtn_click", {
      from,
    });
    onContinue();
  };

  return (
    <Button
      text={t("buttonText")}
      textColor={theme.colors.neutral[600]}
      backgroundColor="transparent"
      borderColor={theme.colors.neutral[300]}
      onClick={() => handleMagicLink()}
    />
  );
}

export default MagicLinkLogin;

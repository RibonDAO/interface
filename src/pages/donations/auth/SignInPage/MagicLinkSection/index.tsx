import React from "react";
import { NonProfit } from "@ribon.io/shared/types";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import { logEvent } from "lib/events";
import useNavigation from "hooks/useNavigation";

type Props = {
  nonProfit: NonProfit;
};
function MagicLinkSection({ nonProfit }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.auth.signInPage",
  });

  const { navigateTo } = useNavigation();

  const handleMagicLink = () => {
    logEvent("authEmailBtn_click", {
      from: "donation_flow",
    });
    navigateTo({
      pathname: "/insert-email",
      state: { nonProfit },
    });
  };

  return (
    <Button
      text={t("email")}
      textColor={theme.colors.neutral[600]}
      backgroundColor="transparent"
      borderColor={theme.colors.neutral[300]}
      onClick={() => handleMagicLink()}
    />
  );
}

export default MagicLinkSection;

import React from "react";
import ButtonToast from "components/atomics/buttons/ButtonToast";
import DownloadIcon from "assets/icons/download-app-icon-orange.svg";
import MoreTicketsIcon from "assets/icons/more-tickets-icon-orange.svg";
import { useTranslation } from "react-i18next";
import useNavigation from "hooks/useNavigation";
import { useExperiment } from "@growthbook/growthbook-react";

function DownloadAppToast(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "downloadApp.floating",
  });

  const { navigateTo } = useNavigation();

  const variation = useExperiment({
    key: "understanding-test",
    variations: ["control", "product", "growth"],
  });

  const handleClick = () => {
    navigateTo("/app-download");
  };

  return (
    <ButtonToast
      text={variation.value === "product" ? t("newTitle") : t("title")}
      leftIcon={variation.value === "product" ? MoreTicketsIcon : DownloadIcon}
      onClick={handleClick}
      eventName="downloadCTA"
      eventParams={{ from: "floatingBtn" }}
    />
  );
}

export default DownloadAppToast;

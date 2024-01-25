import { useEffect } from "react";
import extractUrlValue from "lib/extractUrlValue";
import { useLocation } from "react-router";
import Loader from "components/atomics/Loader";
import useNavigation from "hooks/useNavigation";
import { userAccountApi } from "@ribon.io/shared/services";
import { logError } from "services/crashReport";
import useToast from "hooks/useToast";
import { useTranslation } from "react-i18next";

function ValidateExtraTicket(): JSX.Element {
  const { search } = useLocation();
  const { navigateTo } = useNavigation();
  const toast = useToast();

  const { t } = useTranslation("translation", {
    keyPrefix: "extraTicketPage",
  });

  async function validateExtraTicket() {
    try {
      const token = extractUrlValue("extra_ticket_token", search) ?? "";
      await userAccountApi.postValidateExtraTicket(token);

      navigateTo({
        pathname: "/receive-extra-ticket",
      });
    } catch (error: any) {
      logError(error);
      toast({
        message: t("error"),
        type: "error",
      });

      navigateTo({
        pathname: "/causes",
      });
    }
  }

  useEffect(() => {
    validateExtraTicket();
  }, []);

  return <Loader />;
}

export default ValidateExtraTicket;

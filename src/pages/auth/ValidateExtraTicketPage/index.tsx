import { useEffect } from "react";
import extractUrlValue from "lib/extractUrlValue";
import { useLocation } from "react-router";
import Loader from "components/atomics/Loader";
import useNavigation from "hooks/useNavigation";
import { userAccountApi } from "@ribon.io/shared/services";
import { logError } from "services/crashReport";

function ValidateExtraTicket(): JSX.Element {
  const { search } = useLocation();
  const { navigateTo } = useNavigation();

  async function validateExtraTicket() {
    try {
      const token = extractUrlValue("extra-ticket-token", search) ?? "";
      await userAccountApi.postValidateExtraTicket(token);

      navigateTo({
        pathname: "/receive-extra-ticket",
      });
    } catch (error: any) {
      logError(error);
    }
  }

  useEffect(() => {
    validateExtraTicket();
  }, []);

  return <Loader />;
}

export default ValidateExtraTicket;

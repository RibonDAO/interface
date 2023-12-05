import { Languages } from "@ribon.io/shared/types";
import startSupportChat from "services/support";
import { USER_SUPPORT_LINK } from "utils/constants";

function contactSupport(language: Languages) {
  if (language === Languages.PT) {
    window.open(USER_SUPPORT_LINK, "_blank");
  } else {
    startSupportChat();
  }
}

export default contactSupport;

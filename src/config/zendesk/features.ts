import { ZendeskAPI } from "react-zendesk";
import { logEvent } from "lib/events";

export const ZendeskOpenChat = () => {
  ZendeskAPI("messenger", "open");
  logEvent("UserSupportForm_View");
};

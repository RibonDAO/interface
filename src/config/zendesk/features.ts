import { ZendeskAPI } from "react-zendesk";
import { logEvent } from "lib/events";

export const ZendeskOpenChat = () => {
  ZendeskAPI("webWidget", "open");
  logEvent("UserSupportForm_View");
};

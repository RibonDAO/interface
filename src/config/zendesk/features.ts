import { ZendeskAPI } from "react-zendesk";
import { logEvent } from "services/analytics";

export const ZendeskOpenChat = () => {
  ZendeskAPI("webWidget", "open");
  logEvent("UserSupportForm_View");
};

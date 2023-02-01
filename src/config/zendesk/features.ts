import { ZendeskAPI } from "react-zendesk";
import { logEvent } from "services/analytics/firebase";

export const ZendeskOpenChat = () => {
  ZendeskAPI("webWidget", "open");
  logEvent("UserSupportForm_View");
};

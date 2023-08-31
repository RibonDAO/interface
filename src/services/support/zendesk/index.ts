import { ZendeskAPI } from "react-zendesk";

function startZendeskSupportChat() {
  ZendeskAPI("messenger", "open");
}

export default startZendeskSupportChat;

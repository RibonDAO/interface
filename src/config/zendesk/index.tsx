import React, { useState } from "react";
import ZendeskApp, { ZendeskAPI } from "react-zendesk";
import theme from "styles/theme";
import { LANGUAGE_KEY } from "hooks/useLanguage";
import { getLocalStorageItem } from "lib/localStorage";
import { useCurrentUser } from "contexts/currentUserContext";

function Zendesk(): JSX.Element {
  const zendeskSettings = {
    color: {
      theme: theme.colors.orange,
    },
  };
  const { currentUser } = useCurrentUser();
  const [currentLang] = useState(getLocalStorageItem(LANGUAGE_KEY) || "pt-BR");

  const loadZendeskApi = () => {
    ZendeskAPI("webWidget", "identify", {
      id: currentUser?.id,
      email: currentUser?.email,
    });
    ZendeskAPI("webWidget", "prefill", {
      email: { value: currentUser?.email },
    });
    ZendeskAPI("webWidget", "chat:addTags", [
      `currentUser_id:${currentUser?.id}`,
    ]);
    ZendeskAPI("webWidget", "position", {
      horizontal: "right",
    });
    ZendeskAPI("webWidget", "show");
    ZendeskAPI("webWidget", "setLocale", currentLang);
  };

  return (
    <ZendeskApp
      defer
      zendeskKey="efe9ba42-3eee-48a3-aa79-b573e297fef4"
      {...zendeskSettings}
      onLoaded={loadZendeskApi}
    />
  );
}

export default Zendesk;

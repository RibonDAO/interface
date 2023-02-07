import React, { useState } from "react";
import ZendeskApp, { ZendeskAPI } from "react-zendesk";
import theme from "styles/theme";
import { LANGUAGE_KEY } from "hooks/useLanguage";
import { getLocalStorageItem } from "lib/localStorage";
import { useCurrentUser } from "contexts/currentUserContext";

function Zendesk(): JSX.Element {
  const zendeskSettings = {
    color: {
      theme: theme.colors.brand.secondary[300],
      button: theme.colors.brand.secondary[300],
    },
    position: {
      horizontal: "right",
    },
  };
  const { currentUser } = useCurrentUser();
  const [currentLang] = useState(getLocalStorageItem(LANGUAGE_KEY));
  const ZENDESK_KEY = process.env.REACT_APP_ZENDESK_KEY ?? "";

  const loadZendeskApi = () => {
    ZendeskAPI("webWidget", "identify", {
      id: currentUser?.id,
      email: currentUser?.email,
    });
    ZendeskAPI("webWidget", "prefill", {
      email: { value: currentUser?.email, readOnly: false },
    });
    ZendeskAPI("webWidget", "chat:addTags", [
      `currentUser_id:${currentUser?.id}`,
    ]);
    ZendeskAPI("webWidget", "show");
    ZendeskAPI("webWidget", "setLocale", currentLang);
  };

  return (
    <ZendeskApp
      defer
      zendeskKey={ZENDESK_KEY}
      {...zendeskSettings}
      onLoaded={loadZendeskApi}
    />
  );
}

export default Zendesk;

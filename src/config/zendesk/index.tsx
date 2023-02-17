import React, { useState } from "react";
import ZendeskApp, { ZendeskAPI } from "react-zendesk";
import theme from "styles/theme";
import { LANGUAGE_KEY } from "hooks/useLanguage";
import { getLocalStorageItem } from "lib/localStorage";

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
  const [currentLang] = useState(getLocalStorageItem(LANGUAGE_KEY));
  const ZENDESK_KEY = process.env.REACT_APP_ZENDESK_KEY ?? "";

  const loadZendeskApi = () => {
    ZendeskAPI("messenger:set", "locale", currentLang);
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

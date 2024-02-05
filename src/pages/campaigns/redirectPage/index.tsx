import { useEffect, useState } from "react";
import useNavigation from "hooks/useNavigation";
import extractUrlValue from "lib/extractUrlValue";
import { logEvent } from "lib/events";
import { getUTMFromLocationSearch } from "lib/getUTMFromLocationSearch";
import { DAPP_URL } from "utils/constants";
import { isValidUrl } from "lib/validators";

export default function RedirectPage() {
  const { history } = useNavigation();
  const utmParams = getUTMFromLocationSearch(history.location.search);
  const redirectUrl =
    extractUrlValue("redirect_url", history.location.search) || "";
  const event = extractUrlValue("event", history.location.search);

  const [ip, setIp] = useState("");
  const { userAgent } = navigator;

  const getClientIP = async () => {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    setIp(data.ip);
  };

  const parsedEventParams = () => ({
    utmSource: utmParams.utmSource,
    utmMedium: utmParams.utmMedium,
    utmCampaign: utmParams.utmCampaign,
    redirectUrl,
    clientIp: ip,
    userAgent,
  });

  const handleEvent = () => {
    if (event) {
      logEvent(event, parsedEventParams());
    }
  };

  function redirectUrlWithUTM() {
    const url = new URL(
      decodeURIComponent(
        isValidUrl(decodeURIComponent(redirectUrl)) ? redirectUrl : DAPP_URL,
      ),
    );
    url.searchParams.append("utm_source", utmParams.utmSource);
    url.searchParams.append("utm_medium", utmParams.utmMedium);
    url.searchParams.append("utm_campaign", utmParams.utmCampaign);
    return url.href;
  }

  useEffect(() => {
    getClientIP();
  }, []);

  useEffect(() => {
    if (redirectUrl && ip) {
      handleEvent();
      window.location.href =
        redirectUrlWithUTM() || decodeURIComponent(redirectUrl);
    }
  }, [redirectUrl, ip]);

  return <div />;
}

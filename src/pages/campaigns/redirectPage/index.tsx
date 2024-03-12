import { useEffect, useState } from "react";
import useNavigation from "hooks/useNavigation";
import extractUrlValue from "lib/extractUrlValue";
import { logEvent } from "lib/events";
import { getUTMFromLocationSearch } from "lib/getUTMFromLocationSearch";
import { DAPP_URL } from "utils/constants";
import { isValidUrl } from "lib/validators";
import { verifyUrlSignature } from "lib/urlSignature";

export default function RedirectPage() {
  const { history } = useNavigation();
  const [verifiedSignature, setVerifiedSignature] = useState<
    boolean | undefined
  >();

  const { search } = history.location;

  const param = (p: string) => extractUrlValue(p, search) || "";

  const utmParams = getUTMFromLocationSearch(search);
  const redirectUrl = param("redirect_url");
  const event = param("event");
  const from = param("from");
  const signature = param("signature");

  const { userAgent } = navigator;

  const parsedEventParams = () => ({
    utmSource: utmParams.utmSource,
    utmMedium: utmParams.utmMedium,
    utmCampaign: utmParams.utmCampaign,
    redirectUrl,
    userAgent,
    from,
  });

  function redirectUrlWithUTMs() {
    const valid = isValidUrl(redirectUrl);

    const urlWithProtocol = redirectUrl.startsWith("https")
      ? redirectUrl
      : `https://${redirectUrl}/`;

    const url = new URL(valid ? urlWithProtocol : DAPP_URL);

    url.searchParams.append("utm_source", utmParams.utmSource);
    url.searchParams.append("utm_medium", utmParams.utmMedium);
    url.searchParams.append("utm_campaign", utmParams.utmCampaign);

    return url.href;
  }

  const handleRedirect = () => {
    if (event) logEvent(event, parsedEventParams());

    window.location.href = redirectUrlWithUTMs();
  };

  const handleBack = () => {
    history.replace("/causes");
  };

  useEffect(() => {
    const isValidSignature = verifyUrlSignature(redirectUrl, signature || "");
    setVerifiedSignature(isValidSignature);
  }, []);

  useEffect(() => {
    if (redirectUrl && verifiedSignature === true) {
      handleRedirect();
    } else if (verifiedSignature === false) {
      handleBack();
    }
  }, [redirectUrl, verifiedSignature]);

  return <div />;
}

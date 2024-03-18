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
  const event = param("event");
  const from = param("from");
  const signature = param("signature");
  const encodedUrl = param("redirect_url");
  const redirectUrl = decodeURIComponent(encodedUrl);

  const { userAgent } = navigator;

  const parsedEventParams = () => ({
    utmSource: utmParams.utmSource,
    utmMedium: utmParams.utmMedium,
    utmCampaign: utmParams.utmCampaign,
    redirectUrl,
    userAgent,
    from,
  });

  const redirectUrlWithUTMs = () => {
    const url = isValidUrl(redirectUrl) ? redirectUrl : DAPP_URL;
    const newUrl = new URL(url);
    newUrl.searchParams.append("utm_source", utmParams.utmSource);
    newUrl.searchParams.append("utm_medium", utmParams.utmMedium);
    newUrl.searchParams.append("utm_campaign", utmParams.utmCampaign);
    return newUrl.href;
  };

  const handleRedirect = () => {
    if (event) logEvent(event, parsedEventParams());
    window.location.href = redirectUrlWithUTMs();
  };

  const handleBack = () => {
    history.replace("/causes");
  };

  useEffect(() => {
    if (encodedUrl && signature) {
      const isValidSignature = verifyUrlSignature(encodedUrl, signature);
      setVerifiedSignature(isValidSignature);
    } else {
      handleBack();
    }
  }, [encodedUrl, signature]);

  useEffect(() => {
    if (redirectUrl && verifiedSignature) {
      handleRedirect();
    } else if (verifiedSignature === false) {
      handleBack();
    }
  }, [redirectUrl, verifiedSignature]);

  return <div />;
}

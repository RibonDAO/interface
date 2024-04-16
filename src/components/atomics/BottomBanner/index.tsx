import { useEffect } from "react";
import { logEvent } from "lib/events";
import { isFirstAccess } from "lib/onboardingFirstAccess";
import { useCurrentUser } from "contexts/currentUserContext";
import { useLanguage } from "hooks/useLanguage";
import useBreakpoint from "hooks/useBreakpoint";
import { getMobileOS } from "lib/getMobileOS";
import * as S from "./styles";

export type Props = {
  text: string;
  ctaText: string;
  onClick: () => void;
  eventName?: string;
  eventParams?: any;
};

function BottomBanner({
  text,
  ctaText,
  onClick,
  eventName,
  eventParams,
}: Props): JSX.Element {
  const { signedIn } = useCurrentUser();

  const { currentLang } = useLanguage();
  const { isMobile } = useBreakpoint();

  const parsedEventParams = {
    ...eventParams,
    path: window.location.pathname,
    utmSource: currentLang === "pt-BR" ? "ribonweb_pt" : "ribonweb_en",
    utmMedium: "floating_btn",
    utmCampaign: isMobile ? "mobile" : `desktop_${getMobileOS()}`,
  };

  useEffect(() => {
    if (eventName && eventParams)
      logEvent(`${eventName}_view`, parsedEventParams);
  }, []);

  const handleClick = () => {
    if (eventName && eventParams)
      logEvent(`${eventName}_click`, parsedEventParams);

    return onClick();
  };

  return (
    <S.Container
      onClick={handleClick}
      isNavigationVisible={!isFirstAccess(signedIn)}
    >
      <S.Text>{text}</S.Text>
      <S.CTA>{ctaText}</S.CTA>
    </S.Container>
  );
}

export default BottomBanner;

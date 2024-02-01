import { useEffect } from "react";
import { logEvent } from "lib/events";
import { isFirstAccess } from "lib/onboardingFirstAccess";
import { useCurrentUser } from "contexts/currentUserContext";
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

  const parsedEventParams = { ...eventParams, path: window.location.pathname };

  useEffect(() => {
    if (eventName && eventParams)
      logEvent(`${eventName}_view`, parsedEventParams);
  }, []);

  const handleClick = () => {
    if (eventName && eventParams)
      logEvent(`${eventName}_click`, parsedEventParams);

    console.log("clicked");
    console.log("params", parsedEventParams);
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

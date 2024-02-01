import { useState } from "react";
import useBreakpoint from "hooks/useBreakpoint";
import { APP_LINK, IOS_APP_LINK, ANDROID_APP_LINK } from "utils/constants";
import { useTranslation } from "react-i18next";
import { formatCountdown } from "lib/formatters/countdownFormatter";
import { useCountdown } from "hooks/useCountdown";
import Icon from "components/atomics/Icon";
import theme from "styles/theme";
import { ButtonProps } from "components/atomics/buttons/Button";
import { logEvent } from "lib/events";
import AppleBadge from "./assets/apple-badge.png";
import GoogleBadge from "./assets/google-badge.png";

import * as S from "./styles";

export type Props = {
  title: string;
  image: string;
  hasBackButton?: boolean;
  firstButton: ButtonProps;
  secondButton?: ButtonProps;
  spacingTopDonationFlow?: boolean;
};

function AppDownloadTemplate({
  title,
  image,
  hasBackButton,
  firstButton,
  secondButton,
  spacingTopDonationFlow,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "appDownloadPage",
  });

  const [now] = useState(new Date().getTime());
  const [countdownVisible, setCountdownVisible] = useState(true);

  const renderCountDown = () => {
    const nowPlus5min = now + 5 * 60 * 1000;

    const countdown = useCountdown(nowPlus5min, () =>
      setCountdownVisible(false),
    );

    if (!countdownVisible) return null;

    return (
      <S.CountdownContainer>
        <Icon
          name="nest_clock_farsight_analog"
          color={theme.colors.neutral[500]}
          size="20px"
        />{" "}
        {
          t("offerExpiresIn", {
            time: formatCountdown(countdown),
          }) as string
        }
      </S.CountdownContainer>
    );
  };

  const { isMobile } = useBreakpoint();

  function handleMobileLink() {
    logEvent("mobileDownloadBtn_click");
    window.open(APP_LINK);
  }

  function handleIosLink() {
    logEvent("appStoreBtn_click");
    window.open(IOS_APP_LINK);
  }

  function handleAndroidLink() {
    logEvent("gPlayBtn_click");
    window.open(ANDROID_APP_LINK);
  }

  const render = () => {
    if (isMobile) {
      return (
        <S.ButtonsContainer hasMenu={!hasBackButton}>
          <S.DownloadButton
            onClick={() => handleMobileLink()}
            textColor={firstButton.textColor}
            backgroundColor={firstButton.backgroundColor}
            hasAnotherButton={!!secondButton}
          >
            {firstButton.text}
          </S.DownloadButton>
          {secondButton && (
            <S.Button onClick={secondButton?.onClick}>
              {secondButton?.text}
            </S.Button>
          )}
        </S.ButtonsContainer>
      );
    } else {
      return (
        <>
          <S.Badges>
            <S.Link
              onClick={() => handleAndroidLink()}
              rel="noopener noreferrer"
            >
              <S.ImageBadge src={GoogleBadge} />
            </S.Link>
            <S.Link
              onClick={() => handleIosLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <S.ImageBadge src={AppleBadge} />
            </S.Link>
          </S.Badges>
          {hasBackButton && (
            <S.Button onClick={secondButton?.onClick}>
              {secondButton?.text}
            </S.Button>
          )}
        </>
      );
    }
  };

  return (
    <S.Wrapper hasMenu={!hasBackButton} hasMarginTop={spacingTopDonationFlow}>
      <S.Image src={image} />
      <S.Title>{title}</S.Title>
      {renderCountDown()}
      {render()}
    </S.Wrapper>
  );
}

export default AppDownloadTemplate;

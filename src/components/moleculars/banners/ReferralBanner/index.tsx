import { useTranslation } from "react-i18next";
import useUserIntegration from "hooks/userHooks/useUserIntegration";
import { logError } from "services/crashReport";
import { useEffect, useState } from "react";
import { useCurrentUser } from "contexts/currentUserContext";
import { useUserProfile } from "@ribon.io/shared/hooks";
import { Integration } from "@ribon.io/shared/types";
import { useLanguage } from "hooks/useLanguage";
import useBreakpoint from "hooks/useBreakpoint";
import { logEvent } from "lib/events";
import { APP_LINK } from "utils/constants";
import Letter from "./assets/letter.svg";
import * as S from "./styles";

interface ReferralIntegration {
  name: string;
  logo: File | undefined;
  ticketAvailabilityInMinutes: null;
  status: string;
  metadata: {
    branch: "referral";
    userId?: number;
  };
}

export default function ReferralBanner() {
  const { t } = useTranslation("translation", {
    keyPrefix: "referralBanner",
  });

  const { createUserIntegration, getUserIntegration } = useUserIntegration();
  const { currentUser } = useCurrentUser();
  const { userProfile } = useUserProfile();
  const { profile } = userProfile();
  const { currentLang } = useLanguage();
  const { isMobile } = useBreakpoint();

  const [logoUrl, setLogoUrl] = useState<string>("");
  const [integration, setIntegration] = useState<any>();
  const [copied, setCopied] = useState<boolean>(false);

  const [formObject, setFormObject] = useState<ReferralIntegration>({
    name: `user::${currentUser?.id}`,
    logo: undefined,
    ticketAvailabilityInMinutes: null,
    status: "active",
    metadata: {
      branch: "referral",
      userId: currentUser?.id,
    },
  });

  const fetchIntegration = () => {
    getUserIntegration().then((integrationResponse) => {
      if (integrationResponse) setIntegration(integrationResponse);
    });
  };

  useEffect(() => {
    if (!profile) return;

    fetch(profile.photo)
      .then((response) => response.blob())
      .then((blob) => {
        const logoFile = new File([blob], "logo.png", { type: "image/png" });
        setLogoUrl(URL.createObjectURL(logoFile));
        setFormObject((prev) => ({ ...prev, logo: logoFile }));
      })
      .catch(logError);
  }, [profile]);

  const finalLink = (data?: Integration) => {
    const integrationData = data || integration;

    if (!integrationData) return "";

    const params = new URLSearchParams({
      integration_id: integrationData.uniqueAddress,
      utm_source: currentLang === "pt-BR" ? "ribonweb_pt" : "ribonweb_en",
      utm_medium: "referral",
      utm_campaign: isMobile ? "mobile" : "desktop",
    });

    return `${APP_LINK}?${params.toString()}`;
  };

  const copyTextToClipboard = (data?: Integration) => {
    const text = finalLink(data);
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  const handleClick = () => {
    logEvent("referralBtn_click");

    if (!integration) {
      createUserIntegration(formObject, logoUrl).then((response) => {
        setIntegration(response?.data);
        copyTextToClipboard(response?.data);
      });
    } else {
      copyTextToClipboard();
    }
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 3000);
    }
  }, [copied]);

  useEffect(() => {
    logEvent("referralBtn_view");
    fetchIntegration();
  }, []);

  return (
    <S.Container>
      <S.TextContainer>
        <S.Title>{t("title")}</S.Title>
        <S.Text>{t("subtitle")}</S.Text>
        <S.CtaButton
          onClick={handleClick}
          text={copied ? t("ctaSuccess") : t("cta")}
        />
      </S.TextContainer>
      <S.ImageContainer>
        <S.Image src={Letter} alt="Ribon Referral Program" />
      </S.ImageContainer>
    </S.Container>
  );
}

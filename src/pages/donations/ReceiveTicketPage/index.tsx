import { useTranslation } from "react-i18next";
import Ticket from "assets/icons/ticket-rounded-icon.svg";
import SupportersIcon from "assets/icons/community-icon.svg";
import UserIcon from "assets/icons/user-mono-icon.svg";
import TopImage from "assets/images/top-center-shape.svg";
import LeftImage from "assets/images/bottom-left-shape-red.svg";
import RightImage from "assets/images/top-right-shape.svg";
import { useEffect, useState } from "react";
import { logEvent } from "@amplitude/analytics-browser";
import { theme } from "@ribon.io/shared/styles";
import useVoucher from "hooks/useVoucher";
import useNavigation from "hooks/useNavigation";
import { setLocalStorageItem } from "lib/localStorage";
import {
  RECEIVED_TICKET_AT_KEY,
  RECEIVED_TICKET_FROM_INTEGRATION,
} from "lib/localStorage/constants";
import { useCurrentUser } from "contexts/currentUserContext";
import { isFirstAccess } from "lib/onboardingFirstAccess";
import { useTagDonationContext } from "contexts/tagDonationContext";
import { useTickets, useUserProfile } from "@ribon.io/shared/hooks";
import { useIntegrationId } from "hooks/useIntegrationId";
import { PLATFORM, RIBON_COMPANY_ID } from "utils/constants";
import * as S from "./styles";

function ReceiveTicketPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.receiveTicketPage",
  });

  const { primary } = theme.colors.brand;
  const { createVoucher } = useVoucher();
  const { signedIn } = useCurrentUser();
  const { setChooseTagModalVisible } = useTagDonationContext();
  const { navigateTo } = useNavigation();
  const [iconLoaded, setIconLoaded] = useState(false);
  const { userProfile } = useUserProfile();
  const { profile } = userProfile();

  const { currentUser } = useCurrentUser();
  const integrationId = useIntegrationId();
  const { collectByIntegration } = useTickets();

  const renderDiamond = (isFullSize: boolean, image: string) =>
    isFullSize ? (
      <S.Diamond bg={image} mainColor={primary[300]} />
    ) : (
      <S.Diamond mainColor={primary[300]}>
        <S.Icon src={image} alt="diamondIcon" />
      </S.Diamond>
    );

  const navigate = () => {
    setTimeout(() => {
      createVoucher();
      collectByIntegration(
        integrationId ?? "",
        PLATFORM,
        currentUser?.email ?? "",
      );
      setLocalStorageItem(RECEIVED_TICKET_AT_KEY, Date.now().toString());
      setLocalStorageItem(
        RECEIVED_TICKET_FROM_INTEGRATION,
        (integrationId ?? RIBON_COMPANY_ID).toString(),
      );
      logEvent("receiveTicket_view", { from: "onboarding_page" });
      navigateTo({
        pathname: "/causes",
      });
    }, 3000);
  };

  useEffect(() => {
    if (isFirstAccess(signedIn)) setChooseTagModalVisible(true);
    navigate();
  }, []);

  return (
    <S.Container>
      <S.LeftImage src={LeftImage} />
      <S.RightImage src={RightImage} />
      <S.TopImage src={TopImage} />
      <S.AnimationContainer>
        <S.AnimationContent>
          {SupportersIcon && renderDiamond(false, SupportersIcon)}
          <S.IconDescription>{t("textOrigin")}</S.IconDescription>
        </S.AnimationContent>
        <S.AnimationContent>
          <S.ProgressBar>
            <S.ProgressImg
              src={Ticket}
              alt="ticketIcon"
              onLoad={() => setIconLoaded(true)}
              loaded={iconLoaded}
            />
          </S.ProgressBar>
        </S.AnimationContent>
        <S.AnimationContent>
          {(profile?.photo ?? UserIcon) &&
            renderDiamond(!!profile?.photo, profile?.photo ?? UserIcon)}
          <S.IconDescription>{t("textDestiny")}</S.IconDescription>
        </S.AnimationContent>
      </S.AnimationContainer>
      <S.Text color={primary[800]}>{t("description")}</S.Text>
    </S.Container>
  );
}

export default ReceiveTicketPage;

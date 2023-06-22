import { useTranslation } from "react-i18next";
import Ticket from "assets/icons/ticket-rounded-icon.svg";
import SupportersIcon from "assets/icons/community-icon.svg";
import UserIcon from "assets/icons/user-mono-icon.svg";
import TopImage from "assets/images/top-center-shape.svg";
import LeftImage from "assets/images/bottom-left-shape-red.svg";
import RightImage from "assets/images/top-right-shape.svg";
import { useEffect, useState } from "react";
import { theme } from "@ribon.io/shared/styles";
import useVoucher from "hooks/useVoucher";
import useNavigation from "hooks/useNavigation";
import { setLocalStorageItem } from "lib/localStorage";
import { DONATION_TOAST_SEEN_AT_KEY } from "lib/localStorage/constants";
import { useCausesContext } from "contexts/causesContext";
import { useCurrentUser } from "contexts/currentUserContext";
import { isFirstAccess } from "lib/onboardingFirstAccess";
import * as S from "./styles";

function ReceiveTicketPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.receiveTicketPage",
  });

  const { primary } = theme.colors.brand;
  const { createVoucher } = useVoucher();
  const { signedIn } = useCurrentUser();
  const { setChooseCauseModalVisible } = useCausesContext();
  const { navigateTo } = useNavigation();
  const [iconLoaded, setIconLoaded] = useState(false);

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
      setLocalStorageItem(DONATION_TOAST_SEEN_AT_KEY, Date.now().toString());
      navigateTo({
        pathname: "/causes",
      });
    }, 3000);
  };

  useEffect(() => {
    if (isFirstAccess(signedIn)) setChooseCauseModalVisible(true);
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
          {UserIcon && renderDiamond(false, UserIcon)}
          <S.IconDescription>{t("textDestiny")}</S.IconDescription>
        </S.AnimationContent>
      </S.AnimationContainer>
      <S.Text color={primary[800]}>{t("description")}</S.Text>
    </S.Container>
  );
}

export default ReceiveTicketPage;

import CardRoundDoubleImage from "components/moleculars/cards/CardRoundDoubleImage";
import useNavigation from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logEvent } from "lib/events";
import UserIcon from "assets/icons/user-background-icon.svg";
import Logo from "assets/icons/logo-background-icon.svg";
import NonProfit from "types/entities/NonProfit";
import { COMES_FROM_TREASURE } from "lib/localStorage/constants";
import heartsBackground from "assets/animations/hearts-background.json";
import { removeLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { BigNumber } from "ethers";
import * as S from "./styles";

type LocationStateType = {
  nonProfit?: NonProfit;
  hasButton?: boolean;
  id?: string;
  timestamp?: number;
  amountDonated?: BigNumber;
  processing?: boolean;
};

function DonationDonePage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donationDonePage",
  });
  const {
    state: { nonProfit, hasButton, id, timestamp, amountDonated, processing },
  } = useLocation<LocationStateType>();

  const { navigateTo } = useNavigation();

  useEffect(() => {
    if (nonProfit) {
      setLocalStorageItem("HAS_DONATED", "true");
      setTimeout(() => {
        navigateTo({
          pathname: "/promoters/support-cause",
          state: {
            nonProfit,
          },
        });
      }, 5000);
    } else if (hasButton) {
      logEvent("fundGivingSuccessScreen_View");
    }
  }, []);

  const handleConfirmation = () => {
    const newState = {
      id,
      timestamp,
      amountDonated,
      processing,
      from: "/donation-done",
    };
    navigateTo({
      pathname: "/",
      state: newState,
    });
  };

  useEffect(() => {
    if (localStorage.getItem(COMES_FROM_TREASURE)) {
      removeLocalStorageItem(COMES_FROM_TREASURE);
      navigateTo("/promoters/support-treasure");
    }
  }, []);
  return (
    <S.Container>
      <S.HeartAnimation
        animationData={heartsBackground}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
          opacity: 0.2,
          position: "absolute",
        }}
      />
      <S.Wrapper>
        <CardRoundDoubleImage
          leftImage={hasButton ? UserIcon : nonProfit?.mainImage}
          rightImage={hasButton ? Logo : nonProfit?.logo}
        />
        <S.Title>
          {hasButton ? t("donationSuccessfullTitle") : t("title")}
        </S.Title>
        <S.Subtitle>
          {hasButton
            ? t("donationSuccessfullSubtitle")
            : `${t("youDonatedText")} ${nonProfit?.impactByTicket} ${
                nonProfit?.impactDescription
              }`}
        </S.Subtitle>
      </S.Wrapper>
      {hasButton && (
        <S.ButtonContainer>
          <S.FinishButton
            text={t("confirmButtonText")}
            onClick={handleConfirmation}
          />
        </S.ButtonContainer>
      )}
    </S.Container>
  );
}

export default DonationDonePage;

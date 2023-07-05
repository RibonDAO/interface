import React, { useState } from "react";
import { NonProfit } from "@ribon.io/shared/types";
import { useCurrentUser } from "contexts/currentUserContext";
import SignedInSection from "pages/donations/ConfirmDonationPage/SignedInSection";
import { useLocation } from "react-router-dom";
import LeftImage from "assets/images/bottom-left-shape-red.svg";
import RightImage from "assets/images/top-right-sun-shape.svg";
import DonatingSection from "pages/donations/ConfirmDonationPage/DonatingSection";
import * as S from "./styles";

type LocationStateType = {
  nonProfit: NonProfit;
};
function ConfirmDonationPage(): JSX.Element {
  const [donationInProgress, setDonationInProgress] = useState(false);
  const { signedIn } = useCurrentUser();
  const {
    state: { nonProfit },
  } = useLocation<LocationStateType>();

  const onContinue = () => {
    setDonationInProgress(true);
  };

  const onAnimationEnd = () => {
    setDonationInProgress(false);
  };

  return (
    <S.Container>
      <S.LeftImage src={LeftImage} />
      <S.RightImage src={RightImage} />
      {/* eslint-disable-next-line no-nested-ternary */}
      {donationInProgress ? (
        <DonatingSection
          nonProfit={nonProfit}
          onAnimationEnd={onAnimationEnd}
        />
      ) : signedIn ? (
        <SignedInSection nonProfit={nonProfit} onContinue={onContinue} />
      ) : (
        <div />
      )}
    </S.Container>
  );
}

export default ConfirmDonationPage;

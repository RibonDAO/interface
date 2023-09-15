import React, { useCallback, useState } from "react";
import { NonProfit } from "@ribon.io/shared/types";
import { useCurrentUser } from "contexts/currentUserContext";
import SignedInSection from "pages/donations/ConfirmDonationPage/SignedInSection";
import { useLocation } from "react-router-dom";
import LeftImage from "assets/images/bottom-left-shape-red.svg";
import RightImage from "assets/images/top-right-sun-shape.svg";
import DonatingSection from "pages/donations/ConfirmDonationPage/DonatingSection";
import useDonationFlow from "hooks/useDonationFlow";
import useNavigation from "hooks/useNavigation";
import SignInSection from "pages/donations/ConfirmDonationPage/SignInSection";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import { logEvent } from "lib/events";
import { useExperiment } from "@growthbook/growthbook-react";
import * as S from "./styles";

type LocationStateType = {
  nonProfit: NonProfit;
};
function ConfirmDonationPage(): JSX.Element {
  const [donationInProgress, setDonationInProgress] = useState(false);
  const [donationSucceeded, setDonationSucceeded] = useState(false);
  const { signedIn } = useCurrentUser();
  const {
    state: { nonProfit },
  } = useLocation<LocationStateType>();
  const { handleDonate } = useDonationFlow();
  const { navigateTo } = useNavigation();

  const onContinue = async (email: string) => {
    setDonationInProgress(true);
    await handleDonate({
      nonProfit,
      email,
      onSuccess: () => setDonationSucceeded(true),
      onError: () => {
        setDonationSucceeded(false);
      },
    });
  };

  const variation = useExperiment({
    key: "understanding-test",
    variations: ["control", "growth"],
  });

  const onAnimationEnd = useCallback(() => {
    if (donationSucceeded) {
      logEvent("ticketDonated_end", {
        nonProfitId: nonProfit.id,
        variation: variation.value,
      });
      navigateTo({
        pathname: "/donation-done-cause",
        state: {
          cause: nonProfit.cause,
          nonProfit,
        },
      });
    }
  }, [donationSucceeded]);

  useAvoidBackButton();

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
        <SignInSection nonProfit={nonProfit} onContinue={onContinue} />
      )}
    </S.Container>
  );
}

export default ConfirmDonationPage;

import React from "react";
import { NonProfit } from "@ribon.io/shared/types";
import { useCurrentUser } from "contexts/currentUserContext";
import SignedInSection from "pages/donations/ConfirmDonationPage/SignedInSection";
import { useLocation } from "react-router-dom";

type LocationStateType = {
  nonProfit: NonProfit;
};
function ConfirmDonationPage(): JSX.Element {
  const { signedIn } = useCurrentUser();
  const {
    state: { nonProfit },
  } = useLocation<LocationStateType>();

  return signedIn ? <SignedInSection nonProfit={nonProfit} /> : <div />;
}

export default ConfirmDonationPage;

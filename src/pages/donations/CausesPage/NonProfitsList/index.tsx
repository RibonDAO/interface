import CardCenterImageButton from "components/moleculars/cards/CardCenterImageButton";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import NonProfit from "types/entities/NonProfit";
import { useBlockedDonationModal } from "hooks/modalHooks/useBlockedDonationModal";
import { useLocation } from "react-router-dom";
import * as S from "../styles";

type LocationStateType = {
  failedDonation: boolean;
  blockedDonation: boolean;
};
type Props = {
  nonProfits: NonProfit[];
  setChosenNonProfit: (nonProfit: NonProfit) => void;
  setConfirmModalVisible: (visible: boolean) => void;
  canDonate: boolean;
};

function NonProfitsList({
  nonProfits,
  setChosenNonProfit,
  setConfirmModalVisible,
  canDonate,
}: Props): JSX.Element {
  const { state } = useLocation<LocationStateType>();

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  const { showBlockedDonationModal } = useBlockedDonationModal(
    state?.blockedDonation,
  );

  const chooseNonProfit = useCallback((nonProfit: NonProfit) => {
    setChosenNonProfit(nonProfit);
  }, []);

  function handleButtonClick(nonProfit: NonProfit) {
    logEvent("donateCardButton_click", {
      causeId: nonProfit.id,
    });
    chooseNonProfit(nonProfit);
    if (canDonate) {
      setConfirmModalVisible(true);
      logEvent("authDonationDial_view");
    } else {
      logEvent("donateBlockedButton_click");
      showBlockedDonationModal();
      logEvent("donateBlockedDonation_view");
    }
  }

  return (
    <>
      {nonProfits.map((nonProfit, idx) => (
        <S.CausesCardContainer key={idx.toString()}>
          <CardCenterImageButton
            image={nonProfit.mainImage}
            title={`${nonProfit.impactByTicket} ${nonProfit.impactDescription}`}
            buttonText={canDonate ? t("donateText") : t("donateBlockedText")}
            onClickButton={() => handleButtonClick(nonProfit)}
            softDisabled={!canDonate}
          />
        </S.CausesCardContainer>
      ))}
    </>
  );
}

export default NonProfitsList;

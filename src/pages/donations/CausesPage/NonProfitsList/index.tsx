import CardCenterImageButton from "components/moleculars/cards/CardCenterImageButton";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { today } from "lib/dateTodayFormatter";
import { logEvent } from "services/analytics";
import NonProfit from "types/entities/NonProfit";
import { useCurrentUser } from "contexts/currentUserContext";
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
};

function NonProfitsList({
  nonProfits,
  setChosenNonProfit,
  setConfirmModalVisible,
}: Props): JSX.Element {
  const { state } = useLocation<LocationStateType>();

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  const { showBlockedDonationModal } = useBlockedDonationModal(
    state?.blockedDonation,
  );

  const { userLastDonation } = useCurrentUser();

  function hasDonateToday() {
    return userLastDonation === today();
  }

  const chooseNonProfit = useCallback((nonProfit: NonProfit) => {
    setChosenNonProfit(nonProfit);
  }, []);

  function handleButtonClick(nonProfit: NonProfit) {
    logEvent("donateCardButton_click", {
      causeId: nonProfit.id,
    });
    chooseNonProfit(nonProfit);
    if (hasDonateToday()) {
      logEvent("donateBlockedButton_click");
      showBlockedDonationModal();
      logEvent("donateBlockedDonation_view");
    } else {
      setConfirmModalVisible(true);
    }
  }

  return (
    <>
      {nonProfits.map((nonProfit, idx) => (
        <S.CausesCardContainer key={idx.toString()}>
          <CardCenterImageButton
            image={nonProfit.mainImage}
            title={`${nonProfit.impactByTicket} ${nonProfit.impactDescription}`}
            buttonText={
              hasDonateToday() ? t("donateBlockedText") : t("donateText")
            }
            onClickButton={() => handleButtonClick(nonProfit)}
            softDisabled={hasDonateToday()}
          />
        </S.CausesCardContainer>
      ))}
    </>
  );
}

export default NonProfitsList;

import Header from "components/atomics/sections/Header";
import CardCenterImageButton from "components/moleculars/cards/CardCenterImageButton";
import { useCallback, useEffect, useState } from "react";
import Heart from "assets/images/heart.svg";
import ModalIcon from "components/moleculars/modals/ModalIcon";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import useNavigation from "hooks/useNavigation";
import NonProfit from "types/entities/NonProfit";
import useNonProfits from "hooks/apiHooks/useNonProfits";
import Loader from "components/atomics/Loader";
import { useLocation } from "react-router-dom";
import ModalError from "components/moleculars/modals/ModalError";
import * as S from "./styles";

type LocationStateType = {
  failedDonation: boolean;
};

function CausesPage(): JSX.Element {
  const [donationModalVisible, setDonationModalVisible] = useState(true);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [chosenNonProfit, setChosenNonProfit] = useState<NonProfit>();
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

  const { state } = useLocation<LocationStateType>();

  const [warningModalVisible, setWarningModalVisible] = useState(
    state?.failedDonation,
  );

  const { navigateTo } = useNavigation();

  const { nonProfits, isLoading } = useNonProfits();

  useEffect(() => {
    logEvent("donateIntroDial_view");
  }, []);

  const closeDonationModal = useCallback(() => {
    setDonationModalVisible(false);
  }, []);

  const closeWarningModal = useCallback(() => {
    setWarningModalVisible(false);
  }, []);

  const closeConfirmModal = useCallback(() => {
    setConfirmModalVisible(false);
  }, []);

  const donate = useCallback(() => {
    navigateTo({
      pathname: "/donation-in-process",
      state: { nonProfit: chosenNonProfit },
    });
    logEvent("donateConfirmDialButton_click", {
      causeId: chosenNonProfit?.id,
    });
  }, [chosenNonProfit]);

  const chooseNonProfit = useCallback((nonProfit: NonProfit) => {
    setChosenNonProfit(nonProfit);
  }, []);

  function handleButtonClick(nonProfit: NonProfit) {
    logEvent("donateCardButton_click", {
      causeId: nonProfit.id,
    });
    chooseNonProfit(nonProfit);
    setConfirmModalVisible(true);
  }

  return (
    <S.Container>
      <ModalIcon
        icon={Heart}
        title={t("donationModalTitle")}
        body={t("donationModalBody")}
        primaryButtonText={t("donationModalButtonText")}
        visible={donationModalVisible}
        onClose={closeDonationModal}
        primaryButtonCallback={closeDonationModal}
      />
      <ModalIcon
        icon={chosenNonProfit?.mainImage}
        title={t("confirmModalTitle")}
        body={chosenNonProfit?.impactDescription}
        primaryButtonText={t("confirmModalPrimaryButtonText")}
        primaryButtonCallback={donate}
        secondaryButtonText={t("confirmModalSecondaryButtonText")}
        secondaryButtonCallback={closeConfirmModal}
        visible={confirmModalVisible}
        onClose={closeConfirmModal}
        roundIcon
      />

      <ModalError
        visible={warningModalVisible}
        title={t("errorModalTitle")}
        body={t("errorModalText")}
        buttonText={t("errorModalButtonText")}
        onClose={closeWarningModal}
        warning
      />

      <Header sideLogo="https://i.imgur.com/kJA77FC.png" />
      <S.BodyContainer>
        <S.Title>{t("pageTitle")}</S.Title>
        <S.Text>{t("pageSubtitle")}</S.Text>
        {isLoading ? (
          <Loader />
        ) : (
          <S.CausesContainer>
            {nonProfits?.map((nonProfit, idx) => (
              <S.CausesCardContainer key={idx.toString()}>
                <CardCenterImageButton
                  image={nonProfit.mainImage}
                  title={nonProfit.impactDescription}
                  buttonText={t("donateText")}
                  onClickButton={() => handleButtonClick(nonProfit)}
                />
              </S.CausesCardContainer>
            ))}
          </S.CausesContainer>
        )}
      </S.BodyContainer>
    </S.Container>
  );
}

export default CausesPage;

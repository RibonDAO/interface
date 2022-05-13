import CardCenterImageButton from "components/moleculars/cards/CardCenterImageButton";
import { useCallback, useEffect, useState } from "react";
import Ticket from "assets/images/ticket.svg";
import ModalIcon from "components/moleculars/modals/ModalIcon";
import { useTranslation } from "react-i18next";
import { today } from "lib/dateTodayFormatter";
import { logEvent } from "services/analytics";
import useNavigation from "hooks/useNavigation";
import NonProfit from "types/entities/NonProfit";
import useNonProfits from "hooks/apiHooks/useNonProfits";
import Loader from "components/atomics/Loader";
import Integration from "types/entities/Integration";
import integrationsApi from "services/api/integrationsApi";
import { logError } from "services/crashReport";
import { useLocation } from "react-router-dom";
import ModalError from "components/moleculars/modals/ModalError";
import useUsers from "hooks/apiHooks/useUsers";
import { useCurrentUser } from "contexts/currentUserContext";
import blockedIcon from "assets/images/il-ticket-gray.svg";
import { useIntegrationId } from "hooks/useIntegrationId";
import * as S from "./styles";
import ConfirmEmail from "./ConfirmEmail";
import DonationTicketModal from "./DonationTicketModal";

type LocationStateType = {
  failedDonation: boolean;
  blockedDonation: boolean;
};

function CausesPage(): JSX.Element {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [chosenNonProfit, setChosenNonProfit] = useState<NonProfit>();
  const [integration, setIntegration] = useState<Integration>();
  const integrationId = useIntegrationId();

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  const { state } = useLocation<LocationStateType>();
  const [warningModalVisible, setWarningModalVisible] = useState(
    state?.failedDonation,
  );
  const [blockedModalVisible, setBlockedModalVisible] = useState(
    state?.blockedDonation,
  );

  const { navigateTo } = useNavigation();
  const { nonProfits, isLoading } = useNonProfits();
  const { findOrCreateUser } = useUsers();
  const { signedIn, setCurrentUser, currentUser, userLastDonation } =
    useCurrentUser();

  useEffect(() => {
    logEvent("donateIntroDial_view");
  }, []);

  useEffect(() => {
    async function fetchIntegration() {
      try {
        if (!integrationId) return;

        const { data } = await integrationsApi.getIntegration(integrationId);

        setIntegration(data);
      } catch (e) {
        logError(e);
      }
    }

    fetchIntegration();
  }, []);

  const closeWarningModal = useCallback(() => {
    setWarningModalVisible(false);
  }, []);

  const closeConfirmModal = useCallback(() => {
    setConfirmModalVisible(false);
  }, []);

  const closeBlockedModal = useCallback(() => {
    setBlockedModalVisible(false);
  }, []);

  function hasDonateToday() {
    return userLastDonation === today();
  }

  const donate = useCallback(
    async (email: string) => {
      try {
        if (!signedIn) {
          const user = await findOrCreateUser(email);
          setCurrentUser(user);
        }
        navigateTo({
          pathname: "/donation-in-process",
          state: { nonProfit: chosenNonProfit, integration },
        });
      } catch (e) {
        logError(e);
      }
      logEvent("donateConfirmDialButton_click", {
        causeId: chosenNonProfit?.id,
      });
    },
    [chosenNonProfit],
  );

  const chooseNonProfit = useCallback((nonProfit: NonProfit) => {
    setChosenNonProfit(nonProfit);
  }, []);

  function handleButtonClick(nonProfit: NonProfit) {
    logEvent("donateCardButton_click", {
      causeId: nonProfit.id,
    });
    chooseNonProfit(nonProfit);
    if (hasDonateToday()) {
      logEvent("donateFinishedDonation_view");
      setBlockedModalVisible(true);
      logEvent("donateBlockedDonation_view");
    } else {
      setConfirmModalVisible(true);
    }
  }

  return (
    <S.Container>
      <DonationTicketModal />
      {signedIn ? (
        <ModalIcon
          icon={Ticket}
          title={t("confirmModalAuthTitle")}
          body={`${chosenNonProfit?.impactByTicket} ${chosenNonProfit?.impactDescription}`}
          primaryButtonText={t("confirmModalPrimaryButtonText")}
          primaryButtonCallback={() => {
            if (currentUser) donate(currentUser.email);
          }}
          secondaryButtonText={t("confirmModalSecondaryButtonText")}
          secondaryButtonCallback={closeConfirmModal}
          visible={confirmModalVisible}
          onClose={closeConfirmModal}
          roundIcon
        />
      ) : (
        <ConfirmEmail
          onFormSubmit={(values) => {
            donate(values.email);
          }}
          visible={confirmModalVisible}
          icon={Ticket}
          title={t("confirmModalTitle")}
          primaryButtonText={t("confirmModalPrimaryButtonText")}
          secondaryButtonText={t("confirmModalSecondaryButtonText")}
          secondaryButtonCallback={closeConfirmModal}
        />
      )}

      <ModalError
        visible={warningModalVisible}
        title={t("errorModalTitle")}
        body={t("errorModalText")}
        buttonText={t("errorModalButtonText")}
        onClose={closeWarningModal}
        warning
      />

      <ModalIcon
        visible={blockedModalVisible}
        title={t("blockedModalTitle")}
        body={t("blockedModalText")}
        primaryButtonText={t("blockedModalButtonText")}
        primaryButtonCallback={closeBlockedModal}
        onClose={closeBlockedModal}
        icon={blockedIcon}
      />

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
                  title={`${nonProfit.impactByTicket} ${nonProfit.impactDescription}`}
                  buttonText={
                    hasDonateToday() ? t("donateBlockedText") : t("donateText")
                  }
                  onClickButton={() => handleButtonClick(nonProfit)}
                  softDisabled={hasDonateToday()}
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

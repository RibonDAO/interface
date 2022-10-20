import CardStories from "components/moleculars/cards/CardStories";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import NonProfit from "types/entities/NonProfit";
import Story from "types/entities/Story";
import useNavigation from "hooks/useNavigation";
import { useIntegrationId } from "hooks/useIntegrationId";
import useIntegration from "hooks/apiHooks/useIntegration";
import { logEvent } from "services/analytics";
import useUsers from "hooks/apiHooks/useUsers";
import useSources from "hooks/apiHooks/useSources";
import { useCurrentUser } from "contexts/currentUserContext";
import { logError } from "services/crashReport";
import * as S from "./styles";
import ConfirmSection from "../CausesPage/ConfirmSection";

type LocationStateType = {
  nonProfit: NonProfit;
  stories: Story[];
  canDonateAndHasVoucher: boolean;
};

function StoriesPage(): JSX.Element {
  const {
    state: { canDonateAndHasVoucher, nonProfit, stories },
  } = useLocation<LocationStateType>();

  const [donationInProcessModalVisible, setDonationInProcessModalVisible] =
    useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const profileData = {
    name: nonProfit.name,
    subtitle: nonProfit.cause.name,
    logo: nonProfit.logo,
  };

  const integrationId = useIntegrationId();
  const { integration } = useIntegration(integrationId);

  const { navigateBack } = useNavigation();
  const { findOrCreateUser } = useUsers();
  const { createSource } = useSources();
  const { signedIn, setCurrentUser } = useCurrentUser();

  useEffect(() => {
    if (!stories.length) navigateBack();
  }, []);

  const donateTicket = useCallback(
    async (email: string) => {
      try {
        if (!signedIn) {
          logEvent("authDonationDialButton_click");
          const user = await findOrCreateUser(email);
          if (integration) {
            createSource(user.id, integration.id);
          }
          setCurrentUser(user);
        }
      } catch (e) {
        logError(e);
      }
      logEvent("donateConfirmDialButton_click", {
        causeId: nonProfit?.id,
      });
    },
    [nonProfit],
  );

  const closeConfirmModal = useCallback(() => {
    setConfirmModalVisible(false);
  }, []);

  const onClickButton = useCallback(() => {
    if (canDonateAndHasVoucher) {
      setConfirmModalVisible(true);
    }
  }, [canDonateAndHasVoucher]);

  return (
    <S.Container>
      {nonProfit && integration && (
        <ConfirmSection
          chosenNonProfit={nonProfit}
          donateTicket={donateTicket}
          integration={integration}
          setDonationInProcessModalVisible={setDonationInProcessModalVisible}
          confirmModalVisible={confirmModalVisible}
          donationInProcessModalVisible={donationInProcessModalVisible}
          setConfirmModalVisible={setConfirmModalVisible}
          closeConfirmModal={closeConfirmModal}
        />
      )}

      <CardStories
        stories={stories}
        navigateBack={navigateBack}
        profileData={profileData}
        ctaData={{
          text: "Doar vale",
          onClick: onClickButton,
          visible: canDonateAndHasVoucher,
        }}
      />
    </S.Container>
  );
}

export default StoriesPage;

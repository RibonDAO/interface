import CardStories from "components/moleculars/cards/CardStories";
import { useCallback, useEffect, useState } from "react";
import { NonProfit } from "@ribon.io/shared/types";
import { useIntegrationId } from "hooks/useIntegrationId";
import { useIntegration, useUsers, useSources } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import { useTranslation } from "react-i18next";
import { logError } from "services/crashReport";
import { normalizedLanguage } from "lib/currentLanguage";
import * as S from "./styles";
import ConfirmSection from "../ConfirmSection";

export type Props = {
  nonProfit: NonProfit;
  canDonateAndHasVoucher: boolean;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

function StoriesSection({
  nonProfit,
  canDonateAndHasVoucher,
  visible,
  setVisible,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.storiesPage",
  });

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

  const { findOrCreateUser } = useUsers();
  const { createSource } = useSources();
  const { signedIn, setCurrentUser } = useCurrentUser();

  const donateTicket = useCallback(
    async (email: string) => {
      try {
        if (!signedIn) {
          const user = await findOrCreateUser(email, normalizedLanguage());
          if (integration) {
            createSource(user.id, integration.id);
          }
          setCurrentUser(user);
        }
      } catch (e) {
        logError(e);
      }
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

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "initial";

    return () => {
      document.body.style.overflow = "initial";
    };
  }, [visible]);

  const renderStories = () => {
    if (visible) {
      return (
        <S.Container visible={visible}>
          {nonProfit && integration && (
            <ConfirmSection
              chosenNonProfit={nonProfit}
              donateTicket={donateTicket}
              integration={integration}
              setDonationInProcessModalVisible={
                setDonationInProcessModalVisible
              }
              confirmModalVisible={confirmModalVisible}
              donationInProcessModalVisible={donationInProcessModalVisible}
              setConfirmModalVisible={setConfirmModalVisible}
              closeConfirmModal={closeConfirmModal}
            />
          )}

          <CardStories
            stories={nonProfit.stories || []}
            onAllStoriesEnd={() => setVisible(false)}
            onCloseButtonClick={() => setVisible(false)}
            profileData={profileData}
            ctaData={{
              text: t("ctaText"),
              onClick: onClickButton,
              visible: canDonateAndHasVoucher,
            }}
          />
        </S.Container>
      );
    }

    return null;
  };

  return <>{renderStories()}</>;
}

export default StoriesSection;

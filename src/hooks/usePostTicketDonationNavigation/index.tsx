import { Cause, NonProfit } from "@ribon.io/shared/types";
import { useCanDonate, useStatistics } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import { useIntegrationContext } from "contexts/integrationContext";
import useNavigation from "hooks/useNavigation";
import { useCallback, useEffect } from "react";
import { PLATFORM } from "utils/constants";

function usePostTicketDonationNavigation() {
  const { currentIntegrationId: integrationId } = useIntegrationContext();
  const { externalId } = useIntegrationContext();
  const { donateApp } = useCanDonate(integrationId, PLATFORM, externalId);
  const { currentUser } = useCurrentUser();
  const { navigateTo } = useNavigation();
  const { userStatistics, refetch: refetchStatistics } = useStatistics({
    userId: currentUser?.id,
  });

  const quantityOfDonationsToShowDownload = 3;
  const quantityOfDonationsToShowContribute = 5;
  const firstDonation = 1;

  const shouldShowAppDownload = useCallback(() => {
    if (donateApp) return false;
    return (
      Number(userStatistics?.totalTickets) %
        quantityOfDonationsToShowDownload ===
        0 || Number(userStatistics?.totalTickets) === firstDonation,
      Number(userStatistics?.totalTickets) %
        quantityOfDonationsToShowDownload ===
        0 || Number(userStatistics?.totalTickets) === firstDonation
    );
  }, [userStatistics, donateApp]);
  const shouldShowContribute = useCallback(
    () =>
      Number(userStatistics?.totalTickets) %
        quantityOfDonationsToShowContribute ===
        0 || Number(userStatistics?.totalTickets) === firstDonation,
    [userStatistics],
  );

  useEffect(() => {
    refetchStatistics();
  }, [currentUser]);

  function handleNavigate(nonProfit: NonProfit, cause?: Cause) {
    if (shouldShowAppDownload()) {
      return navigateTo({
        pathname: "/app-download",
        state: {
          nonProfit,
          showContribute: shouldShowContribute(),
          cameFrom: "/post-donation",
        },
      });
    } else {
      return navigateTo({
        pathname: "/causes",
        state: { cause },
      });
    }
  }

  return { handleNavigate };
}

export default usePostTicketDonationNavigation;

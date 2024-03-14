import { NonProfit } from "@ribon.io/shared/types";
import { useStatistics } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import useNavigation from "hooks/useNavigation";
import { useEffect } from "react";

function usePostTicketDonationNavigation() {
  const { currentUser } = useCurrentUser();
  const { navigateTo } = useNavigation();
  const { refetch: refetchStatistics } = useStatistics({
    userId: currentUser?.id,
  });

  useEffect(() => {
    refetchStatistics();
  }, [currentUser]);

  function handleNavigate(nonProfit: NonProfit) {
    return navigateTo({
      pathname: "/app-download",
      state: { nonProfit, showContribute: true },
    });
  }

  return { handleNavigate };
}

export default usePostTicketDonationNavigation;

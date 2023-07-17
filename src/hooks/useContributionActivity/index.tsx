import useContributions from "hooks/apiHooks/useContributions";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";

export const HAS_SEEN_CONTRIBUTIONS_TODAY_KEY =
  "HAS_SEEN_CONTRIBUTIONS_TODAY_KEY";
function useContributionActivity() {
  const { useLabelableContributions } = useContributions();
  const { data: userContributions } = useLabelableContributions();
  const location = useLocation();

  const [newContributionActivity, setNewContributionActivity] = useState(false);
  const [hasSeenContributionsToday, setHasSeenContributionsToday] =
    useState(false);

  useEffect(() => {
    const hasSeenToday = localStorage.getItem(HAS_SEEN_CONTRIBUTIONS_TODAY_KEY);

    if (hasSeenToday) {
      const today = new Date().toLocaleDateString();
      if (hasSeenToday === today) {
        setHasSeenContributionsToday(true);
      } else {
        localStorage.removeItem(HAS_SEEN_CONTRIBUTIONS_TODAY_KEY);
      }
    }
  }, [location]);

  const setHasSeenToday = () => {
    const today = new Date().toLocaleDateString();
    localStorage.setItem(HAS_SEEN_CONTRIBUTIONS_TODAY_KEY, today);
    setHasSeenContributionsToday(true);
  };

  const hasLabelableContributions = useCallback(
    () => Boolean(userContributions?.length && userContributions?.length > 0),
    [userContributions?.length],
  );

  useEffect(() => {
    setNewContributionActivity(
      hasLabelableContributions() && !hasSeenContributionsToday,
    );
  }, [hasLabelableContributions, hasSeenContributionsToday]);

  return {
    newContributionActivity,
    setHasSeenToday,
  };
}

export default useContributionActivity;

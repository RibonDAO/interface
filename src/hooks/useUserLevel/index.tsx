import { useWalletContext } from "contexts/walletContext";
import { useCurrentUser } from "contexts/currentUserContext";
import { useStatistics } from "@ribon.io/shared/hooks";
import { useCallback, useEffect, useState } from "react";

// TODO: Refactor this hook to get data from api after this is definitive
function useUserLevel() {
  const [userLevel, setUserLevel] = useState(0);
  const [userExperience, setUserExperience] = useState(0);

  const { wallet } = useWalletContext();
  const { currentUser } = useCurrentUser();
  const { userStatistics } = useStatistics({
    userId: currentUser?.id,
    walletAddress: wallet!,
  });

  const LIVES_PER_USD_CENT = 2;
  const thresholds = [2, 7, 13, 21, 30, 40, 50, 60, 70];

  useEffect(() => {
    const xpByTicket = userStatistics?.totalTickets ?? 0;
    const xpByMoney =
      (userStatistics?.totalDonated?.usd || 0) * LIVES_PER_USD_CENT;

    setUserExperience(Math.round(xpByMoney + xpByTicket));
  }, [JSON.stringify(userStatistics)]);

  function levelByExperience(experience: number): number {
    const level = thresholds.findIndex((threshold) => experience < threshold);

    if (level !== -1) return level + 1;

    return 10 + Math.floor((experience - 70) / 20);
  }

  const nextLevelExperience = useCallback(
    () =>
      userLevel < 10 ? thresholds[userLevel - 1] : (userLevel - 9) * 20 + 70,
    [userLevel],
  );

  const currentLevelExperience = useCallback(
    () =>
      userLevel < 10 ? thresholds[userLevel - 2] : (userLevel - 10) * 20 + 70,
    [userLevel],
  );

  function percentageCompleted() {
    return (
      ((userExperience - currentLevelExperience()) /
        (nextLevelExperience() - currentLevelExperience())) *
      100
    );
  }

  function experienceToNextLevel(experience: number): number {
    return nextLevelExperience() - experience;
  }

  useEffect(() => {
    setUserLevel(levelByExperience(userExperience));
  }, [userExperience]);

  return {
    userLevel,
    userExperience,
    experienceToNextLevel: experienceToNextLevel(userExperience),
    nextLevelExperience: nextLevelExperience(),
    percentageCompleted: percentageCompleted(),
  };
}

export default useUserLevel;

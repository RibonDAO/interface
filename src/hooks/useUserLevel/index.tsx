import { useWalletContext } from "contexts/walletContext";
import { useCurrentUser } from "contexts/currentUserContext";
import { useStatistics } from "@ribon.io/shared/hooks";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const xpByTicket = userStatistics?.totalTickets ?? 0;
    const xpByMoney =
      (userStatistics?.totalDonated?.usd || 0) * LIVES_PER_USD_CENT;

    setUserExperience(Math.round(xpByMoney + xpByTicket));
  }, [JSON.stringify(userStatistics)]);

  function levelByExperience(experience: number): number {
    const thresholds = [2, 7, 13, 21, 30, 40, 50, 60, 70];
    const level = thresholds.findIndex((threshold) => experience <= threshold);

    if (level !== -1) return level + 1;

    return 10 + Math.floor((experience - 70) / 20);
  }

  function experienceToNextLevel(experience: number): number {
    const thresholds = [2, 7, 13, 21, 30, 40, 50, 60, 70];
    const level = thresholds.findIndex((threshold) => experience <= threshold);

    if (level !== -1) return thresholds[level] - experience;

    return 20;
  }

  useEffect(() => {
    setUserLevel(levelByExperience(userExperience));
  }, [userExperience]);

  return {
    userLevel,
    userExperience,
    experienceToNextLevel: experienceToNextLevel(userExperience),
  };
}

export default useUserLevel;

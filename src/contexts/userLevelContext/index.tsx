import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useCurrentUser } from "contexts/currentUserContext";
import { useStatistics } from "@ribon.io/shared/hooks";

export interface IUserLevelContext {
  userLevel: number;
  userExperience: number;

  experienceToNextLevel: number;
  nextLevelExperience: number;
  percentageCompleted: number;
  refetchUserStatistics: () => void;
  updatePercentageCompleted: () => number;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const UserLevelContext = createContext<IUserLevelContext>(
  {} as IUserLevelContext,
);

function UserLevelProvider({ children }: Props) {
  const [userLevel, setUserLevel] = useState(0);
  const [userExperience, setUserExperience] = useState(0);
  const [experienceToNextLevel, setExperienceToNextLevel] = useState(0);
  const [percentageCompleted, setPercentageCompleted] = useState(0);
  const [nextLevelExperience, setNextLevelExperience] = useState(0);
  const [currentLevelExperience, setCurrentLevelExperience] = useState(0);

  const { currentUser } = useCurrentUser();
  const { userStatistics, refetch: refetchUserStatistics } = useStatistics({
    userId: currentUser?.id,
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

  useEffect(() => {
    const xpForNextNevel =
      userLevel < 10 ? thresholds[userLevel - 1] : (userLevel - 9) * 20 + 70;
    setNextLevelExperience(xpForNextNevel);
  }, [userLevel]);

  useEffect(() => {
    const currentLevelXp =
      userLevel < 10 ? thresholds[userLevel - 2] : (userLevel - 10) * 20 + 70;
    setCurrentLevelExperience(currentLevelXp || 0);
  }, [userLevel]);

  useEffect(() => {
    setExperienceToNextLevel(nextLevelExperience - userExperience);
  }, [nextLevelExperience, userExperience]);

  useEffect(() => {
    setUserLevel(levelByExperience(userExperience));
  }, [userExperience]);

  function updatePercentageCompleted() {
    const completedPercentage =
      ((userExperience - currentLevelExperience) /
        (nextLevelExperience - currentLevelExperience)) *
      100;
    setPercentageCompleted(completedPercentage);

    return completedPercentage;
  }

  const userLevelObject: IUserLevelContext = useMemo(
    () => ({
      userLevel,
      userExperience,
      experienceToNextLevel,
      nextLevelExperience,
      percentageCompleted,
      refetchUserStatistics,
      updatePercentageCompleted,
    }),
    [
      userLevel,
      userExperience,
      experienceToNextLevel,
      nextLevelExperience,
      percentageCompleted,
    ],
  );

  return (
    <UserLevelContext.Provider value={userLevelObject}>
      {children}
    </UserLevelContext.Provider>
  );
}

export default UserLevelProvider;

export const useUserLevel = () => {
  const context = useContext(UserLevelContext);

  if (!context) {
    throw new Error("useUserLevel must be used within UserLevelProvider");
  }

  return context;
};

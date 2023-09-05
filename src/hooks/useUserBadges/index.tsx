import { useUserLevel } from "contexts/userLevelContext";
import { useTranslation } from "react-i18next";

// TODO: get badges from the api
function useUserBadges() {
  const { userLevel } = useUserLevel();
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.badgesSection",
  });

  const badges = [
    {
      id: 1,
      name: t("badgeData.name", { level: 5 }),
      description: t("badgeData.description", { level: 5, impactedLives: 21 }),
      image: "https://i.imgur.com/wv66Hlj.png",
      category: "level",
      achieved: userLevel >= 5,
    },
    {
      id: 2,
      name: t("badgeData.name", { level: 10 }),
      description: t("badgeData.description", { level: 10, impactedLives: 70 }),
      image: "https://i.imgur.com/xnK6W9n.png",
      category: "level",
      achieved: userLevel >= 10,
    },
    {
      id: 3,
      name: t("badgeData.name", { level: 20 }),
      description: t("badgeData.description", {
        level: 20,
        impactedLives: 270,
      }),
      image: "https://i.imgur.com/KZwcXXr.png",
      category: "level",
      achieved: userLevel >= 20,
    },
  ];

  return {
    badges,
  };
}

export default useUserBadges;

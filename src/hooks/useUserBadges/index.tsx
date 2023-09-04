import { useUserLevel } from "contexts/userLevelContext";

function useUserBadges() {
  const { userLevel } = useUserLevel();

  const badges = [
    {
      id: 1,
      name: "Level 5 Badge",
      description:
        "Parabéns! Você já impactou 21 vidas com as suas doações e liberou a conquista ‘Nível 5’.",
      image: "https://i.imgur.com/wv66Hlj.png",
      category: "level",
      achieved: userLevel >= 5,
    },
    {
      id: 2,
      name: "Level 10 Badge",
      description:
        "Parabéns! Você já impactou 70 vidas com as suas doações e liberou a conquista ‘Nível 10’.",
      image: "https://i.imgur.com/5er0JE6.png",
      category: "level",
      achieved: userLevel >= 10,
    },
    {
      id: 3,
      name: "Level 20 Badge",
      description:
        "Parabéns! Você já impactou 270 vidas com as suas doações e liberou a conquista ‘Nível 20’.",
      image: "https://i.imgur.com/Pgl7g0n.png",
      category: "level",
      achieved: userLevel >= 20,
    },
  ];

  return {
    badges,
  };
}

export default useUserBadges;

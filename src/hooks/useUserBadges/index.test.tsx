import { renderHook } from "config/testUtils/renders";
import useUserBadges from ".";

describe("useUserBadges", () => {
  it("should return the user badges", () => {
    const { hook } = renderHook(() => useUserBadges(), {
      userLevelProviderValue: {
        userLevel: 5,
      },
    });

    expect(hook?.result.current.badges[0]).toEqual({
      id: 1,
      name: "Level 5",
      description:
        "Congratulations! You have now impacted 21 people with your donations and unlocked the achievement ‘Level 5’.",
      image: "https://i.imgur.com/wv66Hlj.png",
      category: "level",
      achieved: true,
    });
  });
});

import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { useUserLevel } from ".";

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useStatistics: () => ({
    userStatistics: {
      totalTickets: 10,
      totalDonated: {
        usd: 10,
        brl: 50,
      },
    },
  }),
}));

function UserLevelTestPage() {
  const { userLevel, userExperience } = useUserLevel();
  return (
    <div>
      <p>Level: {userLevel}</p>
      <p>Experience: {userExperience}</p>
    </div>
  );
}

describe("useUserLevel", () => {
  it("renders without error", () => {
    renderComponent(<UserLevelTestPage />);

    expectTextToBeInTheDocument("Level: 12");
    expectTextToBeInTheDocument("Experience: 110");
  });
});

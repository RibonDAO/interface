import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ReferralBanner from ".";

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useUserProfile: () => ({
    userProfile: () => ({
      profile: {
        photo: "photo",
        name: "name",
        user: {
          email: "email",
        },
      },
    }),
  }),
}));

describe("Banner Component", () => {
  it("renders ReferralBanner with no errors", () => {
    renderComponent(<ReferralBanner />);
    expectTextToBeInTheDocument("Invite your friends");
    expectTextToBeInTheDocument(
      "Whoever enters using your invite gets 1 extra ticket to start donating!",
    );
  });
});

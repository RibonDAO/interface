import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";

import PostDonationPage from ".";

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useWarmGlowMessages: () => ({
    warmGlowMessage: {
      message:
        "Likewise, the impartial judgment of eventualities entails a process of reformulation and modernization of the communication process as a whole.",
    },
    isLoading: false,
  }),
}));
describe("PostDonationPage", () => {
  it("should render without error", () => {
    renderComponent(<PostDonationPage />);

    expectTextToBeInTheDocument("Enjoy this moment...");
    expectTextToBeInTheDocument(
      "Likewise, the impartial judgment of eventualities entails a process of reformulation and modernization of the communication process as a whole.",
    );
    expectTextToBeInTheDocument("Finish");
  });
});

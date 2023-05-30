import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";

import DeleteAccountPage from ".";

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useUsers: () => ({
    deleteUser: jest.fn(() => Promise.resolve(true)),
  }),
}));

jest.mock("hooks/useQueryParams", () => ({
  __esModule: true,
  default: () => ({
    get: () => "token",
  }),
}));

describe("Delete Account Page", () => {
  beforeEach(() => {
    renderComponent(<DeleteAccountPage />);
  });

  it("should render the delete account page", () => {
    expectTextToBeInTheDocument("Account deleted");
  });
});

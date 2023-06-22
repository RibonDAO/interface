import { screen } from "@testing-library/react";
import userFactory from "config/testUtils/factories/userFactory";
import { renderComponent } from "config/testUtils/renders";
import ReceiveTicketPage from ".";

jest.mock("hooks/useVoucher", () => ({
  __esModule: true,
  default: () => ({
    createVoucher: jest.fn(),
  }),
}));

describe("ReceiveTicketPage", () => {
  const user = userFactory({ id: 1, email: "test@gmail.com" });
  beforeEach(() => {
    renderComponent(<ReceiveTicketPage />, {
      currentUserProviderValue: {
        currentUser: user,
      },
      causesProviderValue: {
        causes: [],
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the page components", () => {
    expect(screen.getByAltText("ticketIcon")).toBeInTheDocument();
  });
});

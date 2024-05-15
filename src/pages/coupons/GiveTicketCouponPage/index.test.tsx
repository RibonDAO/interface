import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { clickOn, renderComponent, waitForPromises } from "config/testUtils";
import userFactory from "config/testUtils/factories/userFactory";
import { mockRequest } from "config/testUtils/test-helper";
import { mockLogEventFunction } from "setupTests";
import GiveTicketCouponPage from ".";

describe("GiveTicketCouponPage", () => {
  const user = userFactory({ id: 1 });

  beforeEach(async () => {
    await renderComponent(<GiveTicketCouponPage />, {
      currentUserProviderValue: {
        currentUser: user,
      },
      couponProviderValue: {
        couponId: "1",
        setCouponId: jest.fn(),
      },
    });

    mockRequest("/api/v1/tickets/can_collect_by_coupon_id", {
      method: "POST",
      payload: {
        canCollect: true,
      },
    });

    mockRequest("/api/v1/users/update_streak", {
      method: "POST",
      payload: {
        streak: 1,
      },
    });

    await waitForPromises();
  });

  it("should render without errors", () => {
    expectTextToBeInTheDocument("You won 1 ticket!");
    expectTextToBeInTheDocument("Collect tickets");
  });

  it("should call logEvent when receive ticket button is clicked", async () => {
    mockRequest("/api/v1/tickets/collect_by_coupon_id", {
      method: "POST",
      payload: {},
    });

    clickOn("Collect tickets");

    expect(mockLogEventFunction).toHaveBeenCalledWith("P37_getTicketBtn_click");
  });
});

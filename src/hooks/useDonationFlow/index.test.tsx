import useDonationFlow from "hooks/useDonationFlow";
import { renderHook } from "@testing-library/react-hooks";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import { api, authenticationApi } from "@ribon.io/shared";

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useUsers: () => ({
    findOrCreateUser: jest.fn().mockResolvedValue({ id: 1 }),
  }),
}));

jest.mock("react-router", () => ({
  useLocation: () => ({
    search: "",
  }),
}));
const mockIsAuthenticated = jest.fn();

jest.mock("contexts/authenticationContext", () => ({
  __esModule: true,
  useAuthentication: () => ({
    isAuthenticated: mockIsAuthenticated,
  }),
}));

jest.mock("hooks/useNavigation");

const mockNonProfit = nonProfitFactory();

describe("handleDonate authenticated", () => {
  beforeEach(() => {
    authenticationApi.post = jest.fn();
    mockIsAuthenticated.mockReturnValue(true);
  });

  it("should call userDonate when authenticated", async () => {
    const { result } = renderHook(() => useDonationFlow());
    result.current.handleDonate({
      nonProfit: mockNonProfit,
      ticketsQuantity: 1,
      onSuccess: () => {
        jest.fn();
      },
      onError: () => {
        jest.fn();
      },
    });

    expect(authenticationApi.post).toHaveBeenCalledWith(
      "/users/v1/tickets/donate",
      {
        nonProfitId: 1,
        platform: "web",
        quantity: 1,
        utmCampaign: "organic",
        utmMedium: "organic",
        utmSource: "organic",
      },
    );
  });
});

describe("handleDonate not authenticated", () => {
  beforeEach(() => {
    api.post = jest.fn();
    mockIsAuthenticated.mockReturnValue(false);
  });

  it("should call apiDonate when not authenticated", async () => {
    const { result } = renderHook(() => useDonationFlow());
    result.current.handleDonate({
      nonProfit: mockNonProfit,
      ticketsQuantity: 1,
      onSuccess: () => {
        jest.fn();
      },
      onError: () => {
        jest.fn();
      },
    });

    expect(api.post).toHaveBeenCalledWith("/api/v1/tickets/donate", {
      nonProfitId: 1,
      platform: "web",
      quantity: 1,
      utmCampaign: "organic",
      utmMedium: "organic",
      utmSource: "organic",
    });
  });
});

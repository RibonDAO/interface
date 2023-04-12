import { screen } from "@testing-library/react";
import { renderComponent, waitForPromises } from "config/testUtils";
import useTokenDecimals from ".";

const mockApprove = () => ({ wait: () => {} });
const mockTransactionHash = "0x000";
const mockAddPoolBalance = () => ({ hash: mockTransactionHash });

const mockContract = {
  functions: {
    addPoolBalance: mockAddPoolBalance,
    approve: mockApprove,
    symbol: () => "USDC",
  },
  addPoolBalance: jest.fn(),
  approve: jest.fn(),
  balanceOf: () => 100 * 10 ** 18,
  decimals: () => 18,
};

jest.mock("hooks/useContract", () => ({
  __esModule: true,
  useContract: () => mockContract,
}));

function Component() {
  const { tokenDecimals } = useTokenDecimals();
  return <div>{tokenDecimals}</div>;
}

describe("useTokenDecimals", () => {
  it("should render without error", async () => {
    renderComponent(<Component />);

    await waitForPromises();

    expect(screen.getByText("18")).toBeInTheDocument();
  });
});

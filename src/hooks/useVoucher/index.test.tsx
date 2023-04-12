import { screen } from "@testing-library/react";
import { clickOn, renderComponent, waitForPromises } from "config/testUtils";
import { setLocalStorageItem, removeLocalStorageItem } from "lib/localStorage";
import { HAS_AN_AVAILABLE_VOUCHER } from "lib/localStorage/constants";
import useVoucher from ".";

function Component() {
  const { isVoucherAvailable, createVoucher, destroyVoucher } = useVoucher();
  return (
    <>
      <p>{isVoucherAvailable() ? "available" : "unavailable"}</p>
      <button type="button" onClick={createVoucher}>
        create
      </button>
      <button type="button" onClick={destroyVoucher}>
        destroy
      </button>
    </>
  );
}

describe("useTokenDecimals", () => {
  it("should render without error", async () => {
    renderComponent(<Component />);

    await waitForPromises();

    expect(screen.getByText("unavailable")).toBeInTheDocument();
  });

  it("should have an available voucher", () => {
    setLocalStorageItem(HAS_AN_AVAILABLE_VOUCHER, "true");
    renderComponent(<Component />);

    expect(screen.getByText("available")).toBeInTheDocument();
  });

  it("should create a voucher", () => {
    removeLocalStorageItem(HAS_AN_AVAILABLE_VOUCHER);
    renderComponent(<Component />);
    clickOn(screen.getByText("create"));
    renderComponent(<Component />);

    expect(screen.getByText("available")).toBeInTheDocument();
  });

  it("should destroy a voucher", () => {
    setLocalStorageItem(HAS_AN_AVAILABLE_VOUCHER, "true");
    renderComponent(<Component />);
    clickOn(screen.getByText("destroy"));
    renderComponent(<Component />);

    expect(screen.getByText("unavailable")).toBeInTheDocument();
  });
});

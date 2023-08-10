import { useState } from "react";
import { clickOn, renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import NonProfitCard from ".";

const mockNonProfit = nonProfitFactory();

describe("NonProfitCard", () => {
  const mockFn = jest.fn();

  function Wrapper() {
    const [donated, setDonated] = useState(false);

    return (
      <>
        <span>{donated ? "Donated" : "Not Donated"}</span>
        <NonProfitCard
          nonProfit={mockNonProfit}
          handleOfferChange={mockFn}
          handleDonate={() => setDonated(true)}
        />
      </>
    );
  }

  beforeEach(() => {
    renderComponent(<Wrapper />);
  });

  it("shows not donated", () => {
    expectTextToBeInTheDocument("Not Donated");
  });

  it("shows donated", () => {
    clickOn("Donate");

    expectTextToBeInTheDocument("Donated");
  });
});

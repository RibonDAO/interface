import React from "react";
import { renderComponent } from "config/testUtils";
import Header from "components/atomics/sections/Header";
import { mockRequest } from "config/testUtils/test-helper";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import Causes from ".";

jest.mock(
  "components/atomics/sections/Header",
  () =>
    function () {
      return null;
    },
);
// const spy = jest.spyOn(Header, "Header");

describe("Causes", () => {
  const nonProfit1 = nonProfitFactory({
    id: 1,
    impactDescription: "days of impact",
    impactByTicket: 2,
  });
  mockRequest("/api/v1/non_profits", {
    payload: [nonProfit1],
  });

  beforeEach(() => {
    renderComponent(<Causes />);
  });

  it("renders the title", () => {
    expectTextToBeInTheDocument("Causes");
  });

  it("renders the subtitle", () => {
    expectTextToBeInTheDocument("Donate for free for a cause of your choice");
  });

  it("shows the non profit", () => {
    expectTextToBeInTheDocument(
      `${nonProfit1.impactByTicket} ${nonProfit1.impactDescription}`,
    );
  });

  xit("renders the header", () => {
    expect(Header).toHaveBeenCalled();
  });
});

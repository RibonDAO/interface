import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import { useFormattedImpactText } from ".";

describe("useFormattedImpactText", () => {
  it("when the non profit is not provided", () => {
    const { result } = renderHook(() => useFormattedImpactText());
    expect(result.current.formattedImpactText()).toEqual("");
  });

  it("when non profit Impact is not provided", () => {
    const nonProfit = {
      ...nonProfitFactory(),
    };
    const { result } = renderHook(() => useFormattedImpactText());
    expect(result.current.formattedImpactText(nonProfit)).toEqual(
      " 1 Impact description",
    );
  });

  it("when non profit Impact is empty", () => {
    const nonProfit = nonProfitFactory({
      nonProfitImpacts: undefined,
    });
    const { result } = renderHook(() => useFormattedImpactText());
    expect(result.current.formattedImpactText(nonProfit)).toEqual(
      " 1 Impact description",
    );
  });
  it("when isRoundedImpact is true and nonProfitImpact is provided", () => {
    const nonProfit = {
      ...nonProfitFactory(),
    };
    const nonProfitImpact = {
      roundedImpact: 10,
      impact: 1,
    };
    const { result } = renderHook(() => useFormattedImpactText());

    expect(
      result.current.formattedImpactText(
        nonProfit,
        undefined,
        true,
        false,
        nonProfitImpact,
      ),
    ).toEqual("10 Impact description");
  });

  it("when the isHighlighted is true and last impact has donorRecipient", () => {
    const nonProfit = nonProfitFactory({
      impactByTicket: 2,
      impactDescription: "days of impact",
      nonProfitImpacts: [
        {
          id: 1,
          startDate: "2021-01-01",
          endDate: "2021-01-02",
          usdCentsToOneImpactUnit: "100",
          measurementUnit: "day",
          donorRecipient: "donor",
          impactDescription: "days of impact",
        },
      ],
    });
    const nonProfitImpact = {
      roundedImpact: 10,
      impact: 1,
    };

    const { result } = renderHook(() => useFormattedImpactText());

    const element = result.current.formattedImpactText(
      nonProfit,
      10,
      undefined,
      true,
      nonProfitImpact,
      undefined,
    );

    const { container } = render(element as React.ReactElement);
    const boldTextElements = container.querySelectorAll("b");

    expect(boldTextElements[0].textContent).toBe("10");
    expect(boldTextElements[1].textContent).toBe("1 donor");
  });
});

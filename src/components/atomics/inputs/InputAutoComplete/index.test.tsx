import { changeInputValue } from "config/testUtils/test-helper";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { clickOn, renderComponent } from "config/testUtils";
import { screen } from "@testing-library/react";
import InputAutoComplete from ".";

describe("InputAutoComplete", () => {
  let input: any;
  const br = "brazil";
  const onOptionChanged = jest.fn();

  beforeEach(() => {
    renderComponent(
      <InputAutoComplete
        name="country"
        suggestions={["brazil", "argentina", "denmark", "canada", "usa"]}
        placeholder="country"
        onOptionChanged={onOptionChanged}
        required
      />,
    );
    input = screen.getByRole("textbox", { name: "country" });
  });

  it("should render without error", () => {
    expect(screen.queryAllByPlaceholderText("country")).toHaveLength(1);
  });

  it("should initially show no suggestions", () => {
    expectTextNotToBeInTheDocument(br);
  });

  it("should initially has no value", () => {
    expect(input).toHaveAttribute("value", "");
  });

  it("should show related input suggestion", () => {
    changeInputValue(input, "br");
    expectTextToBeInTheDocument(br);
    expectTextNotToBeInTheDocument("argentina");
  });

  it("should update input value when option is clicked", () => {
    changeInputValue(input, "br");
    clickOn(br);
    expect(onOptionChanged).toHaveBeenCalledWith(br);
    expect(input).toHaveAttribute("value", "brazil");
  });

  it("should not show suggestions when clear input", () => {
    changeInputValue(input, "br");
    clickOn(br);
    changeInputValue(input, "");
    expectTextNotToBeInTheDocument(br);
  });

  it("should always have autocomplete off", () => {
    expect(input).toHaveAttribute("autocomplete", "nope");
  });

  it("always should have required turned on if given", () => {
    expect(input).toHaveAttribute("autocomplete", "nope");
  });

  it("should not show more than 4 suggestions", () => {
    changeInputValue(input, "a");
    expectTextNotToBeInTheDocument("usa");
  });

  describe("InputAutoComplete with no suggestions", () => {
    it("should never show input suggestions when suggestions array is empty", () => {
      renderComponent(
        <InputAutoComplete
          name="no-suggestions"
          suggestions={[]}
          placeholder="no-suggestions-placeholder"
          required
        />,
      );
      changeInputValue(
        screen.queryByPlaceholderText("no-suggestions-placeholder"),
        "a",
      );
      expectTextNotToBeInTheDocument("argentina");
    });
  });

  describe("InputAutoComplete with no onOptionChanged", () => {
    const onOptionChangedFn = jest.fn();
    it("should not call onOptionChanged when option is clicked", () => {
      renderComponent(
        <InputAutoComplete
          name="no-onOptionChanged"
          suggestions={["brazil", "argentina", "denmark", "canada", "usa"]}
          placeholder="no-onOptionChanged-placeholder"
          required
        />,
      );
      changeInputValue(
        screen.queryByPlaceholderText("no-onOptionChanged-placeholder"),
        "br",
      );
      clickOn("brazil");
      expect(onOptionChangedFn).not.toHaveBeenCalledWith("brazil");
    });
  });
});

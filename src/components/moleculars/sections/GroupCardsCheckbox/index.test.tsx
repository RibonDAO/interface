import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { screen } from "@testing-library/react";
import { theme } from "@ribon.io/shared/styles";
import GroupCardsCheckbox from ".";

describe("GroupCardsCheckbox", () => {
  const elements = [
    {
      firstDescription: "3 extra daily tickets",
      firstIconName: "confirmation_number",
      secondDescription: "Package of 10 tickets every month",
      secondIconName: "box",
      value: "R$10,00",
      recurrence: "month",
    },
    {
      firstDescription: "8 extra daily tickets",
      firstIconName: "confirmation_number",
      secondDescription: "Package of 25 tickets every month",
      secondIconName: "box",
      value: "R$11,80",
      recurrence: "month",
    },
    {
      firstDescription: "10 extra daily tickets",
      firstIconName: "confirmation_number",
      secondDescription: "Package of 30 tickets every month",
      secondIconName: "box",
      value: "R$142,00",
      recurrence: "year",
    },
  ];
  it("should render without error", () => {
    renderComponent(<GroupCardsCheckbox elements={elements} />);

    expectTextToBeInTheDocument("3 extra daily tickets");
    expectTextToBeInTheDocument("Package of 10 tickets every month");
    expectTextToBeInTheDocument("8 extra daily tickets");
    expectTextToBeInTheDocument("Package of 25 tickets every month");
    expectTextToBeInTheDocument("R$10,00");
    expectTextToBeInTheDocument("R$11,80");
    expectTextToBeInTheDocument("R$142,00");
  });

  describe("when onChange function is passed", () => {
    it("should call onChange function when clicking on the checkbox", () => {
      const onChange = jest.fn();
      renderComponent(
        <GroupCardsCheckbox elements={elements} onChange={onChange} />,
      );

      const checkbox = screen.getByTestId("1");
      checkbox?.click();

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe("when indexSelected is passed", () => {
    it("should render checked", () => {
      renderComponent(
        <GroupCardsCheckbox elements={elements} indexSelected={1} />,
      );

      const card = screen.getAllByTestId("card-checkbox")[1];

      expect(card).toHaveStyle({
        backgroundColor: theme.colors.brand.tertiary[25],
        border: `4px solid ${theme.colors.brand.tertiary[600]}`,
      });
    });
  });
});

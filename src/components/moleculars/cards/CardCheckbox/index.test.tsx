import { renderComponent } from "config/testUtils";
import { screen } from "@testing-library/react";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CardCheckbox from ".";
import { theme } from "@ribon.io/shared";
import React from "react";

describe("CardCheckbox", () => {
  it("should render without error", () => {
    renderComponent(
      <CardCheckbox
        firstDescription={"CardCheckbox"}
        firstIconName={"confirmation_number"}
        secondDescription={"secondDescription"}
        secondIconName={"box"}
        value={"R$10,00"}
        recurrence={"month"}
      />,
    );

    expectTextToBeInTheDocument("CardCheckbox");
    expectTextToBeInTheDocument("R$10,00");
    expectTextToBeInTheDocument("month");
    expectTextToBeInTheDocument("secondDescription");
  });

  describe("when tagText is passed", () => {
    it("should render tagText", () => {
      renderComponent(
        <CardCheckbox
          firstDescription={"CardCheckbox"}
          firstIconName={"confirmation_number"}
          secondDescription={"secondDescription"}
          secondIconName={"box"}
          value={"R$10,00"}
          recurrence={"month"}
          tagText={"Most popular"}
        />,
      );

      expectTextToBeInTheDocument("Most popular");
    });
  });

  describe("when checked is passed", () => {
    it("should render checked", () => {
      renderComponent(
        <CardCheckbox
          firstDescription={"CardCheckbox"}
          firstIconName={"confirmation_number"}
          secondDescription={"secondDescription"}
          secondIconName={"box"}
          value={"R$10,00"}
          recurrence={"month"}
          checked
        />,
      );

      expectTextToBeInTheDocument("CardCheckbox");
      expectTextToBeInTheDocument("R$10,00");
      expectTextToBeInTheDocument("month");
      expectTextToBeInTheDocument("secondDescription");
    });
  });

  describe("when onClick is passed", () => {
    const onClick = jest.fn();
    beforeEach(() => {
      renderComponent(
        <CardCheckbox
          firstDescription={"CardCheckbox"}
          firstIconName={"confirmation_number"}
          secondDescription={"secondDescription"}
          secondIconName={"box"}
          value={"R$10,00"}
          recurrence={"month"}
          onClick={onClick}
        />,
      );
    });
    it("should call onClick when clicked", () => {
      screen.getByText("CardCheckbox").click();
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe("when is clicked", () => {
    beforeEach(async () => {
      renderComponent(
        <CardCheckbox
          firstDescription={"CardCheckbox"}
          firstIconName={"confirmation_number"}
          secondDescription={"secondDescription"}
          secondIconName={"box"}
          value={"R$10,00"}
          recurrence={"month"}
        />,
      );

      screen.getByTestId("card-checkbox").click();
    });

    it("should change border color, background and check", () => {
      const cardElement = screen.getByTestId("card-checkbox");
      const radioElement = screen.getByTestId("checkbox");
      expect(cardElement).toHaveStyle({
        backgroundColor: theme.colors.brand.tertiary[25],
        border: `4px solid ${theme.colors.brand.tertiary[600]}`,
      });

      expect(radioElement).toHaveStyle({
        border: `6px solid ${theme.colors.brand.tertiary[600]}`,
      });
    });
  });
});

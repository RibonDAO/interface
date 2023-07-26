import React from "react";
import { screen } from "@testing-library/react";

import { clickOn, renderComponent } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import Banner from ".";

describe("Banner Component", () => {
  const mockFn = jest.fn();
  const props = {
    icon: { name: "icon-name" },
    title: { text: "Title" },
    subtitle: { text: "Subtitle" },
    text: "Some text content",
    textColor: "green",
    cardBackground: "url('/some-image.jpg')",
    backgroundColor: "yellow",
    arrowLinkColor: "purple",
    onArrowClick: mockFn,
  };

  it("renders Banner with minimal props", () => {
    renderComponent(<Banner />);
    expectTextNotToBeInTheDocument("Title");
    expectTextNotToBeInTheDocument("Subtitle");
  });

  it("renders Banner with props", () => {
    renderComponent(<Banner {...props} />);
    expectTextToBeInTheDocument("Title");
    expectTextToBeInTheDocument("Subtitle");
    expectTextToBeInTheDocument("Some text content");
  });

  it("clicks on arrow", () => {
    renderComponent(<Banner {...props} />);
    const bannerElement = screen.getByTestId("banner");
    clickOn(bannerElement);
    expect(mockFn).toHaveBeenCalled();
  });
});

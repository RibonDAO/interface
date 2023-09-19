import React from "react";
import { screen } from "@testing-library/react";

import { clickOn, renderComponent } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import InfoBanner from ".";

describe("InfoBanner Component", () => {
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

  it("renders InfoBanner with minimal props", () => {
    renderComponent(<InfoBanner />);
    expectTextNotToBeInTheDocument("Title");
    expectTextNotToBeInTheDocument("Subtitle");
  });

  it("renders InfoBanner with props", () => {
    renderComponent(<InfoBanner {...props} />);
    expectTextToBeInTheDocument("Title");
    expectTextToBeInTheDocument("Subtitle");
    expectTextToBeInTheDocument("Some text content");
  });

  it("clicks on arrow", () => {
    renderComponent(<InfoBanner {...props} />);
    const InfoBannerElement = screen.getByTestId("info-banner");
    clickOn(InfoBannerElement);
    expect(mockFn).toHaveBeenCalled();
  });
});

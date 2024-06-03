import { render, screen } from "@testing-library/react";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CardNonProfitStories from ".";

describe("CardNonProfitStories component", () => {
  test("renders with default background component when no backgroundImage prop is provided", () => {
    render(<CardNonProfitStories markdownText="Test markdown text" />);
    const defaultBackgroundElement = screen.getByTestId("default-background");
    expect(defaultBackgroundElement).toBeTruthy();
  });

  test("renders with image background component when backgroundImage prop is provided", () => {
    render(
      <CardNonProfitStories
        markdownText="Test markdown text"
        backgroundImage="https://example.com/image.jpg"
      />,
    );
    const imageBackgroundElement = screen.getByTestId("image-background");
    expect(imageBackgroundElement).toBeTruthy();
  });

  test("renders with markdown text", () => {
    render(
      <CardNonProfitStories
        markdownText="Test markdown text"
        backgroundImage="https://example.com/image.jpg"
      />,
    );
    expectTextToBeInTheDocument("Test markdown text");
  });
});

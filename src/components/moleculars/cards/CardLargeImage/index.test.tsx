import { clickOn, renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CardLargeImage from ".";

describe("CardLargeImage", () => {
  it("renders without error", () => {
    renderComponent(
      <CardLargeImage
        title="title"
        image="image"
        subtitle="subtitle"
        description="description"
      />,
    );

    expectTextToBeInTheDocument("title");
    expectTextToBeInTheDocument("subtitle");
    expectTextToBeInTheDocument("description");
  });

  describe("when buttonText is passed", () => {
    const mockFn = jest.fn();

    beforeEach(() => {
      renderComponent(
        <CardLargeImage
          title="title"
          image="image"
          subtitle="subtitle"
          description="description"
          buttonText="buttonText"
          onButtonClick={mockFn}
        />,
      );
    });

    it("renders button", () => {
      expectTextToBeInTheDocument("buttonText");
    });

    it("calls onButtonClick when button is clicked", () => {
      clickOn("buttonText");

      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe("when children is passed", () => {
    it("renders children", () => {
      renderComponent(
        <CardLargeImage title="title" image="image">
          <p>children</p>
        </CardLargeImage>,
      );

      expectTextToBeInTheDocument("children");
    });
  });
});

import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ButtonSelectorTemplate from ".";

const items = [
  {
    label: "label 1",
    onClick: () => {},
  },
];
describe("ButtonSelectorTemplate", () => {
  it("should render without error", () => {
    renderComponent(<ButtonSelectorTemplate items={items} current={1} />);

    expectTextToBeInTheDocument("label 1");
  });
});

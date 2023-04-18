import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import TasksSection from ".";

describe("TasksSection", () => {
  it("should render without error", () => {
    renderComponent(<TasksSection />);

    expectTextToBeInTheDocument("Tasks");
  });
});

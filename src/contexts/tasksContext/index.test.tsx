import React from "react";
import { render, screen } from "@testing-library/react";
import { useTasksContext } from ".";

function TasksTestPage() {
  useTasksContext();
  return <div>Tasks</div>;
}

describe("useTasksContext", () => {
  it("should render without error", () => {
    render(<TasksTestPage />);
    expect(screen.getByText("Tasks")).toBeInTheDocument();
  });
});

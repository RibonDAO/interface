import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import InputRange from ".";

function RangeComponent() {
  const [value, setValue] = React.useState(0);
  return (
    <>
      {value}
      <InputRange value={value} min={0} max={20} onChange={setValue} />
    </>
  );
}

describe("InputRange", () => {
  it("should render without error", () => {
    renderComponent(<RangeComponent />);

    expectTextToBeInTheDocument("0");
  });
});

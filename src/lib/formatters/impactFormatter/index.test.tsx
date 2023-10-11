import { formatImpact } from "lib/formatters/impactFormatter/index";
import parse from "html-react-parser";

describe("impactFormatter", () => {
  const impact = ["part one", "part 2", "part 3"];

  it("returns the impact highlighted", () => {
    expect(formatImpact(impact)).toEqual(
      parse("<b>part one</b> part 2 <b>part 3</b>"),
    );
  });
});

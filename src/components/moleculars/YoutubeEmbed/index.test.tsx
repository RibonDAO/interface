import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import YoutubeEmbed from ".";

describe("YoutubeEmbed", () => {
  it("renders without error", () => {
    renderComponent(<YoutubeEmbed embedId="" title="title" />);

    expectTextToBeInTheDocument("title");
  });
});

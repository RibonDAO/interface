import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { Route, Switch } from "react-router-dom";
import { createMemoryHistory } from "history";
import { renderComponent } from "config/testUtils";
import useUtm from ".";

function UtmPage() {
  const utm = useUtm();

  if (utm?.utmCampaign && utm?.utmMedium && utm?.utmSource) {
    return (
      <ul>
        <li>{utm.utmCampaign}</li>
        <li>{utm.utmMedium}</li>
        <li>{utm.utmSource}</li>
      </ul>
    );
  }
  return <p>no utm</p>;
}

describe("useUtm", () => {
  describe("when there are utm params in the url", () => {
    beforeEach(() => {
      const history = createMemoryHistory();

      renderComponent(
        <Switch>
          <Route path="/" exact>
            <div>test</div>
          </Route>
          <Route path="/test" exact>
            <UtmPage />
          </Route>
        </Switch>,
      );

      waitFor(() => {
        history.push({
          pathname: "/test",
          search:
            "utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_term=term&utm_content=content",
        });
      });
    });

    it("expects to render the utm source", () => {
      expect(screen.getByText("source")).toBeInTheDocument();
    });

    it("expects to render the utm medium", () => {
      expect(screen.getByText("medium")).toBeInTheDocument();
    });

    it("expects to render the utm campaign", () => {
      expect(screen.getByText("campaign")).toBeInTheDocument();
    });

    it("expects not to render `no utm` text", () => {
      expect(screen.queryByText("no utm")).not.toBeInTheDocument();
    });
  });

  describe("when there are not utm params in the url", () => {
    beforeEach(() => {
      renderComponent(
        <Switch>
          <Route path="/" exact>
            <div>test</div>
          </Route>
          <Route path="/test" exact>
            <UtmPage />
          </Route>
        </Switch>,
      );

      waitFor(() => {
        history.push({
          pathname: "/test",
        });
      });
    });

    it("expects to render `no utm` text", () => {
      expect(screen.getByText("no utm")).toBeInTheDocument();
    });
  });
});

import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { screen, act, fireEvent } from "@testing-library/react";
import { renderComponent } from "config/testUtils";
import useNavigation, { NavigationProps } from ".";

jest.unmock("hooks/useNavigation");

const GO_TO_PAGE_BTN = "Go to other";
const GO_TO_PAGE_WITH_SEARCH_BTN = "Go to other with search";
const GO_BACK_BTN = "Go Back";
const SEARCH_PARAM = "foo=bar";
const NAME = "nicholas";
type LocationState = {
  name: string;
};
type Props = {
  navigationProps: NavigationProps | string;
};

function NavigationTestPage({ navigationProps }: Props) {
  const { navigateTo, history } = useNavigation();

  return (
    <div>
      <p>{history.location.search}</p>
      <button type="button" onClick={() => navigateTo(navigationProps)}>
        {GO_TO_PAGE_BTN}
      </button>
    </div>
  );
}
function OtherNavigationTestPage() {
  const { navigateBack, navigateTo } = useNavigation();
  const location = useLocation<LocationState>();

  return (
    <div>
      <p>{location.search}</p>
      <p>{location.state?.name}</p>
      <button type="button" onClick={() => navigateBack()}>
        {GO_BACK_BTN}
      </button>
      <button
        type="button"
        onClick={() => navigateTo({ pathname: "/", search: SEARCH_PARAM })}
      >
        {GO_TO_PAGE_WITH_SEARCH_BTN}
      </button>
    </div>
  );
}

function renderPage(navigationProps: NavigationProps | string) {
  return renderComponent(
    <Switch>
      <Route path="/" exact>
        <NavigationTestPage navigationProps={navigationProps} />
      </Route>
      <Route path="/other" exact>
        <OtherNavigationTestPage />
      </Route>
    </Switch>,
  );
}

describe("useNavigation", () => {
  describe("navigateTo", () => {
    describe("with object props", () => {
      beforeEach(() => {
        renderPage({ pathname: "/other" });
      });

      it("navigates to the other page", () => {
        act(() => {
          fireEvent.click(screen.getByText(GO_TO_PAGE_BTN));
        });

        expect(screen.getByText(GO_BACK_BTN)).toBeInTheDocument();
      });
    });

    describe("with string props", () => {
      it("navigates to the other page", () => {
        renderPage("/other");
        act(() => {
          fireEvent.click(screen.getByText(GO_TO_PAGE_BTN));
        });

        expect(screen.getByText(GO_BACK_BTN)).toBeInTheDocument();
      });
    });

    it("maintains the search", async () => {
      renderPage("/other");
      await act(async () => {
        await fireEvent.click(screen.getByText(GO_TO_PAGE_BTN));
        await fireEvent.click(screen.getByText(GO_TO_PAGE_WITH_SEARCH_BTN));
      });

      expect(screen.getByText(`?${SEARCH_PARAM}`)).toBeInTheDocument();
    });

    describe("when there is a search param", () => {
      beforeEach(() => {
        renderPage({ pathname: "/other", search: SEARCH_PARAM });
      });

      it("it uses the search param to define the search", async () => {
        await act(async () => {
          await fireEvent.click(screen.getByText(GO_TO_PAGE_BTN));
        });
        expect(screen.getByText(`?${SEARCH_PARAM}`)).toBeInTheDocument();
      });
    });

    describe("when there is no search param", () => {
      beforeEach(() => {
        renderPage({ pathname: "/other" });
      });

      it("maintains the current search", async () => {
        await act(async () => {
          await fireEvent.click(screen.getByText(GO_TO_PAGE_BTN));
          await fireEvent.click(screen.getByText(GO_TO_PAGE_WITH_SEARCH_BTN));
        });

        expect(screen.getByText(`?${SEARCH_PARAM}`)).toBeInTheDocument();
      });
    });

    describe("when there is a state param", () => {
      beforeEach(() => {
        renderPage({ pathname: "/other", state: { name: NAME } });
      });

      it("it passes the search param for the other page", async () => {
        await act(async () => {
          await fireEvent.click(screen.getByText(GO_TO_PAGE_BTN));
        });
        expect(screen.getByText(NAME)).toBeInTheDocument();
      });
    });
  });

  describe("navigateBack", () => {
    beforeEach(() => {
      renderPage({ pathname: "/other" });
      act(() => {
        fireEvent.click(screen.getByText(GO_TO_PAGE_BTN));
      });
    });

    it("returns to the previous page", () => {
      act(() => {
        fireEvent.click(screen.getByText(GO_BACK_BTN));
      });
      expect(screen.getByText(GO_TO_PAGE_BTN)).toBeInTheDocument();
    });
  });
});

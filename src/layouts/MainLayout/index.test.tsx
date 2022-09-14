import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { setLocalStorageItem } from "lib/localStorage";
import { SHOW_MENU } from "contexts/currentUserContext";
import MainLayout from ".";

jest.mock(
  "config/routes/Navigation",
  () =>
    function () {
      return <p>navigation bar</p>;
    },
);

describe("MainLayout", () => {
  it("renders the children passed", () => {
    renderComponent(
      <MainLayout>
        <div>test</div>
      </MainLayout>,
    );

    expectTextToBeInTheDocument("test");
  });

  it("show navigation when user is logged and made a donation", () => {
    setLocalStorageItem(SHOW_MENU, "true");
    setLocalStorageItem("HAS_DONATED", "true");
    renderComponent(
      <MainLayout>
        <div>test</div>
      </MainLayout>,
      {
        currentUserProviderValue: {
          signedIn: true,
        },
      },
    );
    expectTextToBeInTheDocument("navigation bar");
  });
});

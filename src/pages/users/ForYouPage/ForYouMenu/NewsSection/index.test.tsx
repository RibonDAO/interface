import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
// import { mockRequest } from "config/testUtils/test-helper";
import NewsSection from ".";

describe("NewsSection", () => {
  it("should render without error", () => {
    renderComponent(<NewsSection />);

    expectTextToBeInTheDocument(
      "Download our app and check our selection of heart warming news",
    );
  });

  // ATUALIZAR COM MOCK DE USERARTICLES
  // describe("when user has donated", () => {
  //   mockRequest("/api/v1/users/can_donate", {
  //     payload: { canDonate: true },
  //     method: "POST",
  //   });

  //   it("renders news", () => {
  //     renderComponent(<NewsSection />);

  //     expectTextNotToBeInTheDocument("Donate to read good news");
  //   });
  // });

  // describe("when user can't donate", () => {
  //   mockRequest("/api/v1/users/can_donate", {
  //     payload: { canDonate: false },
  //     method: "POST",
  //   });

  //   it("render blocked section", () => {
  //     renderComponent(<NewsSection />);

  //     expectTextToBeInTheDocument("Donate to read good news");
  //   });
  // });
});

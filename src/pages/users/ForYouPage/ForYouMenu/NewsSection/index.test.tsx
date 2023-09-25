import { renderComponent, waitForPromises } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
} from "config/testUtils/expects";
import ArticleFactory from "config/testUtils/factories/articleFactory";
// import { mockRequest } from "config/testUtils/test-helper";
import NewsSection from ".";

const mockArticle = ArticleFactory({ title: "Environment", id: 1 });
jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useArticles: () => ({
    getUserArticles: () => [mockArticle],
  }),
}));

// jest.mock("@ribon.io/shared/hooks", () => ({
//   __esModule: true,
//   ...jest.requireActual("@ribon.io/shared/hooks"),
//   useCanDonate: () => ({
//     canDonate: true,
//   }),
// }));
describe("NewsSection", () => {

  describe("when user has donated", () => {

    it("renders news", async() => {
      renderComponent(<NewsSection />);
      await waitForPromises();

      expectTextNotToBeInTheDocument("Donate to read good news");
    });
  });

  // describe("when user can't donate", () => {
  //   beforeEach(() => {
      
  //   });

  //   it("renders blocked section", () => {
  //     renderComponent(<NewsSection />);

  //     expectTextToBeInTheDocument("Donate to read good news");
  //   });
  // });
});

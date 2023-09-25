import { useCanDonate } from "@ribon.io/shared";
import { renderComponent, waitForPromises } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import ArticleFactory from "config/testUtils/factories/articleFactory";
import NewsSection from ".";

const mockArticle = ArticleFactory({ title: "Environment", id: 1 });

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useArticles: () => ({
    getUserArticles: () => [mockArticle],
  }),
  useCanDonate: jest.fn(),
}));

describe("NewsSection", () => {
  describe("when user has donated", () => {
    it("renders news", async () => {
      (useCanDonate as jest.Mock).mockReturnValue({ canDonate: false });
      renderComponent(<NewsSection />);
      await waitForPromises();

      expectTextNotToBeInTheDocument("Donate to read good news");
    });
  });

  describe("when user has not donated", () => {
    it("renders blocked section", async () => {
      (useCanDonate as jest.Mock).mockReturnValue({ canDonate: true });

      renderComponent(<NewsSection />);
      await waitForPromises();

      expectTextToBeInTheDocument("Donate to read good news");
    });
  });
});

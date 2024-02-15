import { setLocalStorageItem } from "@ribon.io/shared/lib";
import { useDonatedToday } from "@ribon.io/shared";
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
  useDonatedToday: jest.fn(),
}));

describe("NewsSection", () => {
  describe("when user has not donated", () => {
    it("renders news", async () => {
      (useDonatedToday as jest.Mock).mockReturnValue({ donatedToday: false });
      renderComponent(<NewsSection />);
      await waitForPromises();

      expectTextNotToBeInTheDocument("Donate to read good news");
    });
  });

  describe("when user has donated", () => {
    it("renders blocked section", async () => {
      (useDonatedToday as jest.Mock).mockReturnValue({ donatedToday: true });

      renderComponent(<NewsSection />);
      await waitForPromises();

      expectTextToBeInTheDocument("Donate to read good news");
    });
  });

  it("should render without show onboarding post", async () => {
    (useDonatedToday as jest.Mock).mockReturnValue({ donatedToday: true });
    setLocalStorageItem("IS_USER_ONBOARDING_1", "3");
    renderComponent(<NewsSection />, {
      currentUserProviderValue: {
        currentUser: {
          id: 1,
          email: "email@gmail.com",
        },
      },
    });

    await waitForPromises();

    expectTextNotToBeInTheDocument(
      "Welcome! Here you'll find what's new at Ribon and the good news that we selected to warm your heart.",
    );
  });
});

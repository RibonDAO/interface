import { renderComponent, waitForPromises } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import NewsSection from ".";

const mockArticle = ArticleFactory({ title: "Environment", id: 1 });
  const data = [mockArticle];
  const user = userFactory({ id: 1 });
  mockRequest("/api/v1/news/articles_since_user_creation", {
    method: "GET",
    payload: {
      mockArticle,
    },
  });

  beforeEach(async () => {
    articlesApi.getUserArticlesList = jest.fn(() => ({ data } as any));

jest.mock("@ribon.io/shared/lib", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/lib"),
  setLocalStorageItem: async () => {},
  getLocalStorageItem: async (key: any) => {
    if (key === "IS_USER_ONBOARDING_1") {
      return "2"; // Simulate a user who has seen onboarding four times
    }
    return null; // Simulate a new user
  },
}));

describe("NewsSection", () => {
  beforeEach(async () => {
    renderComponent(<NewsSection />, {
      currentUserProviderValue: {
        currentUser: { id: 1, email: "email@email.com" },
      },
    });
    await waitForPromises();
  });
  it("should render without error", async () => {
    await expectTextToBeInTheDocument(
      "Download our app and check our selection of heart warming news",
    );
  });

  it("does not render the onboarding component for a user who has seen onboarding three times", async () => {
    jest.mock("@ribon.io/shared/lib", () => ({
      __esModule: true,
      ...jest.requireActual("@ribon.io/shared/lib"),
      setLocalStorageItem: async () => {},
      getLocalStorageItem: async (key: any) => {
        if (key === "IS_USER_ONBOARDING_1") {
          return "4"; // Simulate a user who has seen onboarding four times
        }
        return null; // Simulate a new user
      },
    }));

    await expectTextNotToBeInTheDocument(
      "Welcome! Here you'll find what's new at Ribon and the good news that we selected to warm your heart.",
    );
  });
});

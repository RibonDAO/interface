import { setLocalStorageItem } from "@ribon.io/shared/lib";
import { renderComponent, waitForPromises } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import articleFactory from "config/testUtils/factories/articleFactory";

import NewsSection from ".";

const mockArticle = articleFactory();
jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useArticles: () => ({
    getUserArticles: () => [mockArticle],
  }),
}));

describe("NewsSection", () => {
  it("should render all articles", async () => {
    renderComponent(<NewsSection />, {
      currentUserProviderValue: {
        currentUser: {
          id: 1,
          email: "email@gmail.com",
        },
      },
    });

    await waitForPromises();
    expectTextToBeInTheDocument("How to donate");
  });
  it("should render without show onboarding post", async () => {
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

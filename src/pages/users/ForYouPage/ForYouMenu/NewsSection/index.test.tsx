import { renderComponent, waitForPromises } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import NewsSection from ".";

const mockGetArticles = {
  functions: {
    getUserArticles: async () => [
      {
        id: 1,
        title: "title",
        author: {
          id: 1,
          name: "Ribon",
        },
        visible: true,
        publishedAt: new Date().toISOString(),
        publishedAtInWords: "text",
        createdAt: "2021-09-01T00:00:00.000Z",
        updatedAt: "2021-09-01T00:00:00.000Z",
        imageUrl:
          "https://i.pinimg.com/564x/59/19/d0/5919d00855a72ea34f9f67749779c55c.jpg",
      },
    ],
  },
};

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useArticles: () => mockGetArticles,
}));

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

import { Integration } from "@ribon.io/shared/types";
import { clickOn, renderComponent, waitForPromises } from "config/testUtils";
import {
  expectPageToNavigateTo,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import causeFactory from "config/testUtils/factories/causeFactory";

import { mockRequest } from "config/testUtils/test-helper";
import FirstPage from ".";

describe("FirstPage", () => {
  describe("when is the first access to ribon", () => {
    describe("when the integration is Ribon", () => {
      const ribonIntegration = {
        id: 1,
        name: "Ribon",
        logo: "https://ribon.io/logo.png",
      } as Integration;

      mockRequest(`/api/v1/integrations/${ribonIntegration.id}`, {
        payload: ribonIntegration,
      });

      beforeEach(() => {
        renderComponent(<FirstPage isOnboarding />);
        waitForPromises();
      });

      it("renders the Ribon integration with correct title", () => {
        expectTextToBeInTheDocument("Welcome to Ribon!");
      });

      it("navigates to the step 3 page when the button is clicked", () => {
        clickOn("See how it works");
        expectPageToNavigateTo("/intro/step-3");
      });

      it("navigates to the causes page when the button is clicked", () => {
        clickOn("Skip");

        expectPageToNavigateTo("/causes");
      });
    });

    describe("when the integration is not Ribon", () => {
      beforeEach(() => {
        renderComponent(<FirstPage isOnboarding />);
        waitForPromises();
      });

      it("renders the integration with correct title", () => {
        expectTextToBeInTheDocument("invited you to use Ribon's app!");
      });
    });
  });
  describe("when is not the first access to ribon", () => {
    describe("when the integration is Ribon", () => {
      const ribonIntegration = {
        id: 3,
        name: "Ribon",
        logo: "https://ribon.io/logo.png",
      } as Integration;

      mockRequest(`/api/v1/integrations/${ribonIntegration.id}`, {
        payload: ribonIntegration,
      });

      const userTasksStatistics = {
        firstCompletedAllTasksAt: null,
        streak: 0,
        contributor: false,
      };

      mockRequest("/api/v1/users/tasks_statistics", {
        method: "GET",
        payload: {
          userTasksStatistics,
        },
      });

      beforeEach(() => {
        renderComponent(<FirstPage />);

        waitForPromises();
      });

      it("renders the Ribon integration with correct title", () => {
        expectTextToBeInTheDocument("You have 1 special ticket");
      });

      it("navigates to the step 3 page when the button is clicked", () => {
        clickOn("See how it works");
        expectPageToNavigateTo("/intro/step-3");
      });

      it("navigates to the causes page when the button is clicked", () => {
        clickOn("Skip");
        expectPageToNavigateTo("/causes");
      });
    });

    describe("when the integration is not Ribon", () => {
      const otherIntegration = {
        id: 2,
        name: "Other",
        logo: "https://other.io/logo.png",
      } as Integration;

      const cause1 = causeFactory({
        id: 1,
        name: "cause1",
        status: "active",
      });

      mockRequest(`/api/v1/integrations/${otherIntegration.id}`, {
        payload: otherIntegration,
      });

      mockRequest("/api/v1/free_donation_causes/", {
        payload: [cause1],
      });

      const mockChain = {
        name: "Mumbai Testnet",
        ribonContractAddress: "0xF02a09B21267EDB53B459ddC802C60245dEfbE34",
        donationTokenContractAddress:
          "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1",
        chainId: 0x13881,
        rpcUrls: "https://rpc-mumbai.maticvigil.com",
        nodeUrl:
          "https://polygon-mumbai.g.alchemy.com/v2/1fEWpdSHuohPveNBGvlozE6qv9P1uAks",
        symbolName: "MATIC",
        currencyName: "Matic",
        blockExplorerUrls: "https://mumbai.polygonscan.com/",
        defaultPoolAddress: "0x9B00b1a3C4ea8BFbBE984360513f7bE7e971e431",
      };

      mockRequest("/api/v1/chains", {
        payload: [mockChain],
      });

      mockRequest("/api/v1/integrations/2", {
        payload: otherIntegration,
      });

      const userTasksStatistics = {
        firstCompletedAllTasksAt: null,
        streak: 0,
        contributor: false,
      };

      mockRequest("/api/v1/users/tasks_statistics", {
        method: "GET",
        payload: {
          userTasksStatistics,
        },
      });

      beforeEach(() => {
        renderComponent(<FirstPage />);
        waitForPromises();
      });

      it("renders the integration with correct title", () => {
        expectTextToBeInTheDocument("You have 1 special ticket");
      });
    });
  });
});

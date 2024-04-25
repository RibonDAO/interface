import contributionApi from ".";
import api from "..";

describe("contributionApi", () => {
  describe("#getContributions", () => {
    beforeEach(() => {
      api.get = jest.fn();
    });
    const userId = 1;
    it("expects to send a get request with the correct info: url, params and headers", () => {
      contributionApi.getContributions(userId);

      expect(api.get).toHaveBeenCalledWith("/api/v1/users/1/contributions");
    });
  });

  describe("#getLabelableContributions", () => {
    const userId = 1;
    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      contributionApi.getLabelableContributions(userId);

      expect(api.get).toHaveBeenCalledWith(
        "/api/v1/users/1/labelable_contributions",
      );
    });
  });

  describe("#getContributionStats", () => {
    const userId = 1;
    const contributionId = 1;
    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      contributionApi.getContributionStats(userId, contributionId);

      expect(api.get).toHaveBeenCalledWith("/api/v1/users/1/contributions/1");
    });
  });
});

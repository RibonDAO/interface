import integrationsApi from ".";
import api from "..";

describe("integrationsApi", () => {
  describe("#getIntegration", () => {
    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      integrationsApi.getIntegration(1);

      expect(api.get).toHaveBeenCalledWith("/api/v1/integrations/1");
    });
  });
});

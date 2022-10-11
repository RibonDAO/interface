import integrationsApi from ".";
import api from "..";

describe("integrationsApi", () => {
  describe("#getIntegration", () => {
    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, id and headers", () => {
      integrationsApi.getIntegration(1);

      expect(api.get).toHaveBeenCalledWith("/api/v1/integrations/1");
    });

    it("expects to send a get request with the correct info: url, uuid and headers", () => {
      const uuid = "64a3a5af-c249-4815-b89a-43986efb0de7";
      integrationsApi.getIntegration(uuid);

      expect(api.get).toHaveBeenCalledWith(`/api/v1/integrations/${uuid}`);
    });
  });
});

import * as CrashReport from "services/crashReport";
import mixpanel from "mixpanel-browser";
import { logMixpanelEvent } from ".";

jest.spyOn(CrashReport, "logError");
jest.spyOn(mixpanel, "track");

describe("logMixpanelEvent", () => {
  const eventName = "teste";

  beforeEach(() => {
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "production",
      writable: true,
    });
  });

  describe("with params", () => {
    const eventParams = { param: "teste" };
    it("sends an event to firebase", async () => {
      logMixpanelEvent(eventName, eventParams);

      expect(mixpanel.track).toHaveBeenCalledWith(eventName, eventParams);
    });
  });

  describe("without params", () => {
    it("sends an event to firebase", () => {
      logMixpanelEvent(eventName);
      expect(mixpanel.track).toHaveBeenCalledWith(eventName, {});
    });
  });

  describe("when an error happens", () => {
    beforeEach(() => {
      mixpanel.track.mockImplementation(() => {
        throw new Error();
      });
    });

    it("calls logError", () => {
      logMixpanelEvent(eventName);
      expect(CrashReport.logError).toHaveBeenCalled();
    });
  });
});

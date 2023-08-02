import * as CrashReport from "services/crashReport";
import mixpanel from "mixpanel-browser";
import { initializeMixpanel, logMixpanelEvent, setUserId } from ".";

jest.spyOn(CrashReport, "logError");
jest.spyOn(mixpanel, "track");
jest.spyOn(mixpanel, "init");
jest.spyOn(mixpanel, "identify");

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

describe("if key does not exists", () => {
  beforeEach(() => {
    Object.defineProperty(process.env, "REACT_APP_MIXPANEL_API_KEY", {
      value: null,
      writable: true,
    });
  });

  it("initializeMixpanel should not initialize", () => {
    initializeMixpanel();
    expect(mixpanel.init).toHaveBeenCalledTimes(0);
  });
});

describe("if key exists", () => {
  beforeEach(() => {
    Object.defineProperty(process.env, "REACT_APP_MIXPANEL_API_KEY", {
      value: "mixpanel_api_key",
      writable: true,
    });
  });

  it("initializeMixpanel should initialize", () => {
    initializeMixpanel();
    expect(mixpanel.init).toHaveBeenCalled();
  });
});

describe("setUserId", () => {
  it("calls mixpanel.identify", () => {
    setUserId("123");

    expect(mixpanel.identify).toHaveBeenCalledWith("123");
  });
});

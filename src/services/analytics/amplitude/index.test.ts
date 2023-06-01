import * as CrashReport from "services/crashReport";
import * as amplitude from "@amplitude/analytics-browser";
import { logAmplitudeEvent } from ".";

jest.spyOn(CrashReport, "logError");
jest.spyOn(amplitude, "track");
jest.spyOn(amplitude, "init");

describe("logAmplitudeEvent", () => {
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
      logAmplitudeEvent(eventName, eventParams);

      expect(amplitude.track).toHaveBeenCalledWith(eventName, eventParams);
    });
  });

  describe("without params", () => {
    it("sends an event to firebase", () => {
      logAmplitudeEvent(eventName);
      expect(amplitude.track).toHaveBeenCalledWith(eventName, {});
    });
  });
});

describe("if key does not exists", () => {
  beforeEach(() => {
    Object.defineProperty(process.env, "REACT_APP_AMPLITUDE_API_KEY", {
      value: null,
      writable: true,
    });
  });

  it("initializeMixpanel should not initialize", () => {
    expect(amplitude.init).toHaveBeenCalledTimes(0);
  });
});

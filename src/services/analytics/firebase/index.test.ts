import * as CrashReport from "services/crashReport";
import { logFirebaseEvent, setUserProperties, setUserId } from ".";

const mockAnalytics = {
  logEvent: jest.fn(),
  setUserProperties: jest.fn(),
  setUserId: jest.fn(),
};

jest.mock("firebase/app", () => ({
  analytics: () => mockAnalytics,
}));

jest.spyOn(CrashReport, "logError");

describe("logFirebaseEvent", () => {
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
      logFirebaseEvent(eventName, eventParams);

      expect(mockAnalytics.logEvent).toHaveBeenCalledWith(
        eventName,
        eventParams,
      );
    });
  });

  describe("without params", () => {
    it("sends an event to firebase", () => {
      logFirebaseEvent(eventName);
      expect(mockAnalytics.logEvent).toHaveBeenCalledWith(eventName, {});
    });
  });

  describe("when an error happens", () => {
    beforeEach(() => {
      mockAnalytics.logEvent.mockImplementation(() => {
        throw new Error();
      });
    });

    it("calls logError", () => {
      logFirebaseEvent(eventName);
      expect(CrashReport.logError).toHaveBeenCalled();
    });
  });
});

describe("setUserProperties", () => {
  const userProperties = { subscriber: true };
  it("sends user properties to firebase", () => {
    setUserProperties(userProperties);
    expect(mockAnalytics.setUserProperties).toHaveBeenCalledWith(
      userProperties,
    );
  });

  describe("when an error happens", () => {
    beforeEach(() => {
      mockAnalytics.setUserProperties.mockImplementation(() => {
        throw new Error();
      });
    });

    it("calls logError", () => {
      setUserProperties(userProperties);
      expect(CrashReport.logError).toHaveBeenCalled();
    });
  });
});

describe("#setUserId", () => {
  it("expects to call firebase.analytics().setUserId", () => {
    const userId = 1;
    setUserId(userId);
    expect(mockAnalytics.setUserId).toHaveBeenCalledWith("1");
  });
});

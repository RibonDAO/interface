import * as CrashReport from "services/crashReport";
import {
  logEvent,
  setUserProperties,
  setUserId,
  convertParamsToString,
} from ".";

jest.unmock("services/analytics");

const mockAnalytics = {
  logEvent: jest.fn(),
  setUserProperties: jest.fn(),
  setUserId: jest.fn(),
};

jest.mock("firebase/app", () => ({
  analytics: () => mockAnalytics,
}));

jest.spyOn(CrashReport, "logError");

describe("logEvent", () => {
  const eventName = "teste";

  beforeEach(() => {
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "production",
      writable: true,
    });
  });

  describe("with params", () => {
    const eventParams = { param: "teste" };
    it("sends an event to firebase", () => {
      logEvent(eventName, eventParams);
      expect(mockAnalytics.logEvent).toHaveBeenCalledWith(
        eventName,
        eventParams,
      );
    });
  });

  describe("without params", () => {
    it("sends an event to firebase", () => {
      logEvent(eventName);
      expect(mockAnalytics.logEvent).toHaveBeenCalledWith(eventName, {
        anonymousId: "",
      });
    });
  });

  describe("when an error happens", () => {
    beforeEach(() => {
      mockAnalytics.logEvent.mockImplementation(() => {
        throw new Error();
      });
    });

    it("calls logError", () => {
      logEvent(eventName);
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

describe("#convertParamsToString", () => {
  describe("when params are defined", () => {
    it("converts the params to string", () => {
      const params = {
        id: 5,
        brand: "Brand",
      };

      const convertedParams = convertParamsToString(params);

      expect(convertedParams.id).toEqual("5");
      expect(convertedParams.brand).toEqual("Brand");
    });
  });

  describe("when there is an undefined param", () => {
    it("converts the undefined param to an empty string", () => {
      const params = {
        id: 5,
        brand: undefined,
      };

      const convertedParams = convertParamsToString(params);

      expect(convertedParams.id).toEqual("5");
      expect(convertedParams.brand).toEqual("");
    });
  });
});

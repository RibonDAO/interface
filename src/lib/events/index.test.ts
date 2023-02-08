import { logEvent, newLogEvent, logPageView } from "lib/events";
import * as FirebaseEvents from "services/analytics/firebase";
import events from "./constants";

jest.unmock("lib/events");
jest.spyOn(FirebaseEvents, "logFirebaseEvent");

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
      expect(FirebaseEvents.logFirebaseEvent).toHaveBeenCalledWith(
        eventName,
        eventParams,
      );
    });
  });

  describe("without params", () => {
    it("sends an event to firebase", () => {
      logEvent(eventName);
      expect(FirebaseEvents.logFirebaseEvent).toHaveBeenCalledWith(
        eventName,
        {},
      );
    });
  });

  describe("newLogEvent", () => {
    const action = "view";
    it("sends an event to firebase", () => {
      newLogEvent(action, eventName);
      expect(FirebaseEvents.logFirebaseEvent).toHaveBeenCalledWith(
        `web_${eventName}_${action}`,
        {},
      );
    });
  });

  describe("logPageView", () => {
    const urlName = "/";
    const translation = events.pages[urlName];
    it("sends an event to firebase", () => {
      logPageView(urlName);
      expect(FirebaseEvents.logFirebaseEvent).toHaveBeenCalledWith(
        `web_${translation}_view`,
        {},
      );
    });
  });
});

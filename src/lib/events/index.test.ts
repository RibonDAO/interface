import { logEvent, newLogEvent, logPageView } from "lib/events";
import * as FirebaseEvents from "services/analytics/firebase";
import * as MixpanelEvents from "services/analytics/mixpanel";
import * as AmplitudeEvents from "services/analytics/amplitude";
import * as DebugEventsView from "config/debugEventsView";
import * as Constants from "utils/constants";
import events from "./constants";

const mockConstants = Constants as { DEBUG_EVENTS_ENABLED: boolean };

jest.unmock("lib/events");
jest.spyOn(FirebaseEvents, "logFirebaseEvent");
jest.spyOn(MixpanelEvents, "logMixpanelEvent");
jest.spyOn(AmplitudeEvents, "logAmplitudeEvent");
jest.spyOn(DebugEventsView, "logDebugEvent");

describe("Events", () => {
  const eventName = "teste";
  const paramsDefault = {
    anonymousId: "false",
    integrationName: "false",
    hasDonated: "false",
  };

  beforeEach(() => {
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "production",
      writable: true,
    });
  });

  describe("logEvents", () => {
    describe("with params", () => {
      const eventParams = { param: "teste" };
      it("sends an event to firebase", () => {
        logEvent(eventName, eventParams);
        expect(FirebaseEvents.logFirebaseEvent).toHaveBeenCalledWith(
          eventName,
          {
            ...paramsDefault,
            ...eventParams,
          },
        );
      });

      describe("when debug events is enabled", () => {
        beforeEach(() => {
          mockConstants.DEBUG_EVENTS_ENABLED = true;
        });

        it("adds the event to debug view", () => {
          logEvent(eventName, eventParams);
          expect(DebugEventsView.logDebugEvent).toHaveBeenCalledWith(
            eventName,
            eventParams,
          );
        });
      });

      describe("when debug events is disabled", () => {
        beforeEach(() => {
          mockConstants.DEBUG_EVENTS_ENABLED = false;
        });

        it("adds the event to debug view", () => {
          logEvent(eventName, eventParams);
          expect(DebugEventsView.logDebugEvent).not.toHaveBeenCalled();
        });
      });
    });

    describe("without params", () => {
      it("sends an event to firebase", () => {
        logEvent(eventName);
        expect(FirebaseEvents.logFirebaseEvent).toHaveBeenCalledWith(
          eventName,
          paramsDefault,
        );
      });
    });
  });

  describe("newLogEvent", () => {
    const action = "view";
    it("sends an event to firebase", () => {
      newLogEvent(action, eventName);
      expect(FirebaseEvents.logFirebaseEvent).toHaveBeenCalledWith(
        `web_${eventName}_${action}`,
        paramsDefault,
      );
    });
  });

  describe("logPageView", () => {
    const urlName = "/";
    const translation = events.pages[urlName];
    it("sends an event to firebase", () => {
      logPageView(urlName);
      expect(FirebaseEvents.logFirebaseEvent).toHaveBeenCalledWith(
        `${translation}_view`,
        paramsDefault,
      );
    });
  });

  describe("newLogEvent", () => {
    const action = "view";
    it("sends an event to Mixpanel", () => {
      newLogEvent(action, eventName);
      expect(MixpanelEvents.logMixpanelEvent).toHaveBeenCalledWith(
        `web_${eventName}_${action}`,
        paramsDefault,
      );
    });
  });

  describe("logPageView", () => {
    const urlName = "/";
    const translation = events.pages[urlName];
    it("sends an event to Mixpanel", () => {
      logPageView(urlName);
      expect(MixpanelEvents.logMixpanelEvent).toHaveBeenCalledWith(
        `${translation}_view`,
        paramsDefault,
      );
    });
  });
});

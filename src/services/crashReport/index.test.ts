import * as Sentry from "@sentry/react";
import { ErrorLevel, logError } from ".";

jest.spyOn(Sentry, "setTags");
jest.spyOn(Sentry, "captureException");
jest.spyOn(Sentry, "setContext");
jest.unmock("services/crashReport");

describe("#logError", () => {
  const INITIAL_ENV = process.env;
  const error = new Error("error");
  const customMessage = "custom message, boy";

  beforeEach(() => {
    process.env = {
      ...INITIAL_ENV,
      NODE_ENV: "production",
    };
  });

  afterAll(() => {
    process.env = INITIAL_ENV;
  });

  it("expects to call captureException", () => {
    logError(error, { customMessage });
    const contexts = {
      contextParams: {},
    };

    expect(Sentry.captureException).toHaveBeenCalledWith(error, {
      contexts,
      level: ErrorLevel.Error,
    });
  });

  it("expects not to call setContext", () => {
    logError(error, { customMessage });

    expect(Sentry.setContext).not.toHaveBeenCalled();
  });

  describe("when sending a customMessage", () => {
    it("expects to set a tag with that custom message", () => {
      logError(error, { customMessage });

      expect(Sentry.setTags).toHaveBeenCalledWith({
        errorMessage: error.message,
        customMessage,
      });
    });
  });

  describe("when sending a context", () => {
    it("expects to call captureException with the context", () => {
      const context = { message: "context" };
      logError(error, { customMessage, context });

      expect(Sentry.captureException).toHaveBeenCalledWith(error, {
        contexts: {
          contextParams: context,
        },
        level: ErrorLevel.Error,
      });
    });
  });

  describe("when sending a error level", () => {
    it("expects to call captureException with the error level", () => {
      const contexts = {
        contextParams: {},
      };
      logError(error, { level: ErrorLevel.Fatal });

      expect(Sentry.captureException).toHaveBeenCalledWith(error, {
        level: ErrorLevel.Fatal,
        contexts,
      });
    });
  });
});

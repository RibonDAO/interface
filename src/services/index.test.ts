import * as Sentry from "@sentry/react";
import { mockEnv } from "config/testUtils/test-helper";
import { initializeSentry } from ".";

describe("#initializeSentry", () => {
  const sentrySpy = jest.spyOn(Sentry, "init");

  describe("when the env is production", () => {
    mockEnv({
      NODE_ENV: "production",
    });

    it("calls Sentry init", () => {
      initializeSentry();

      expect(sentrySpy).toHaveBeenCalled();
    });
  });

  describe("when the env is not production", () => {
    it("does not call Sentry init", () => {
      initializeSentry();

      expect(sentrySpy).not.toHaveBeenCalled();
    });
  });
});

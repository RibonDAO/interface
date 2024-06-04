import { Languages } from "@ribon.io/shared/types";
import startSupportChat from "services/support";
import { USER_SUPPORT_LINK } from "utils/constants";
import contactSupport from ".";

jest.mock("services/support");

describe("contactSupport", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should open USER_SUPPORT_LINK in a new tab when language is PT", () => {
    const windowOpenSpy = jest.spyOn(window, "open").mockImplementation();

    contactSupport(Languages.PT);

    expect(windowOpenSpy).toHaveBeenCalledWith(USER_SUPPORT_LINK, "_blank");
    expect(startSupportChat).not.toHaveBeenCalled();
  });

  it("should call startSupportChat when language is not PT", () => {
    contactSupport(Languages.EN);

    expect(startSupportChat).toHaveBeenCalled();
    expect(window.open).not.toHaveBeenCalled();
  });
});

import { ZendeskAPI } from "react-zendesk";
import startZendeskSupportChat from ".";

jest.mock("react-zendesk", () => ({
  ZendeskAPI: jest.fn(),
}));

describe("startZendeskSupportChat", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call ZendeskAPI with 'messenger' and 'open'", () => {
    startZendeskSupportChat();

    expect(ZendeskAPI).toHaveBeenCalledWith("messenger", "open");
  });
});

import startZendeskSupportChat from "./zendesk";
import startSupportChat from ".";

jest.mock("./zendesk", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("startSupportChat", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call startZendeskSupportChat", () => {
    startSupportChat();

    expect(startZendeskSupportChat).toHaveBeenCalled();
  });
});

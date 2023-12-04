import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import GoogleSection from ".";

jest.mock("@react-oauth/google", () => ({
  useGoogleLogin: () => {},
}));

const onContinue = jest.fn();
describe("GoogleSection", () => {
  it("should render without error", () => {
    renderComponent(
      <GoogleSection onContinue={onContinue} from="direct_flow" />,
    );

    expectTextToBeInTheDocument("Continue with Google");
  });
});

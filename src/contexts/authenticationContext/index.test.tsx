import { renderComponent, waitForPromises } from "config/testUtils";
import { useAuthentication } from ".";

jest.mock("firebase/auth", () => ({
  signInWithPopup: () => Promise.resolve({ user: { email: "user@ribon.io" } }),
  getAuth: jest.fn(),
  GoogleAuthProvider: jest.fn(),
  signOut: () => Promise.resolve(),
}));

function AuthenticationTestPage() {
  useAuthentication();
  return <div>Authentication</div>;
}

describe("useAuthentication", () => {
  it("renders without error", async () => {
    renderComponent(<AuthenticationTestPage />);
    await waitForPromises();
  });
});

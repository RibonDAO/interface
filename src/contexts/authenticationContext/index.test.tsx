import { renderComponent, waitForPromises } from "config/testUtils";
import { renderHook } from "config/testUtils/renders";
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
  let current: ReturnType<typeof useAuthentication>;

  it("renders without error", async () => {
    renderComponent(<AuthenticationTestPage />);
    await waitForPromises();
  });
  describe("isAuthorized", () => {
    beforeEach(async () => {
      const { hook } = renderHook(() => useAuthentication());
      current = hook.result.current;
      await waitForPromises();
    });
    it("should return true when email domain is @ribon.io", async () => {
      const allowed = current.isAuthorized("user@ribon.io");
      await waitForPromises();
      expect(allowed).toBe(true);
    });
  });
});

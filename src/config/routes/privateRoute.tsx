import useNavigation from "hooks/useNavigation";
import { getCookiesItem } from "lib/cookies";
import { TOKEN_KEY } from "utils/constants";

function PrivateRoute({ children }: any) {
  const accessToken = getCookiesItem(TOKEN_KEY);
  const { navigateTo } = useNavigation();

  // todo: refactor with public route
  return accessToken ? children : navigateTo("/causes");
}

export default PrivateRoute;

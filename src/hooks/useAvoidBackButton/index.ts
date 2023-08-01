import useNavigation from "hooks/useNavigation";
import { useEffect } from "react";

export default function useAvoidBackButton() {
  const { history } = useNavigation();

  useEffect(() => {
    const handlePopstate = () => {
      history.replace("/causes");
    };

    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);
}

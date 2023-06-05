import { useEffect } from "react";

const preventBackNavigation = (): null => {
  useEffect(() => {
    window.addEventListener("popstate", () => {
      window.history.go(1);
    });
  }, []);

  return null;
};

export default preventBackNavigation;

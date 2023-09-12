import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export const HAS_SEEN_ABOUT_PAGE_TODAY_KEY = "HAS_SEEN_ABOUT_PAGE_TODAY_KEY";

function useAboutPageActivity() {
  const [hasSeenAboutPageToday, setHasSeenAboutPageToday] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hasSeenToday = localStorage.getItem(HAS_SEEN_ABOUT_PAGE_TODAY_KEY);

    if (hasSeenToday) {
      const today = new Date().toLocaleDateString();
      if (hasSeenToday === today) {
        setHasSeenAboutPageToday(true);
      } else {
        localStorage.removeItem(HAS_SEEN_ABOUT_PAGE_TODAY_KEY);
      }
    }
  }, [location]);

  const setHasSeenToday = () => {
    const today = new Date().toLocaleDateString();
    localStorage.setItem(HAS_SEEN_ABOUT_PAGE_TODAY_KEY, today);
    setHasSeenAboutPageToday(true);
  };

  return {
    hasSeenAboutPageToday,
    setHasSeenToday,
  };
}

export default useAboutPageActivity;

import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useTasksContext } from "contexts/tasksContext";
import { TASKS } from "utils/constants/Tasks";

export const HAS_SEEN_ABOUT_PAGE_TODAY_KEY = "HAS_SEEN_ABOUT_PAGE_TODAY_KEY";

function useAboutPageActivity() {
  const [hasSeenAboutPageToday, setHasSeenAboutPageToday] = useState(false);
  const location = useLocation();
  const { registerAction, tasksState } = useTasksContext();

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

  const setTaskDone = () => {
    const pageViewTask = TASKS.filter(
      (task) => task.title === "about_page_view",
    )[0];

    const done = tasksState?.find(
      (task) => task?.id === pageViewTask?.id,
    )?.done;

    if (!done) {
      registerAction("about_page_view");
    }
  };

  const setHasSeenToday = () => {
    const today = new Date().toLocaleDateString();
    localStorage.setItem(HAS_SEEN_ABOUT_PAGE_TODAY_KEY, today);
    setHasSeenAboutPageToday(true);
    setTaskDone();
  };

  return {
    hasSeenAboutPageToday,
    setHasSeenToday,
  };
}

export default useAboutPageActivity;

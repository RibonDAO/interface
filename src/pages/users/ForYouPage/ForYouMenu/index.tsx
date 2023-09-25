import { useTranslation } from "react-i18next";
import { useTasksContext } from "contexts/tasksContext";

import { useLocation } from "react-router";
import useNavigation from "hooks/useNavigation";
import TasksSection from "./TasksSection";
import NewsSection from "./NewsSection";
import * as S from "./styles";

type LocationState = {
  tab: string;
};

function ForYouMenu() {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage.forYouMenu",
  });

  const { navigateTo } = useNavigation();

  const { hasCompletedATask } = useTasksContext();

  const { state } = useLocation<LocationState>();

  const stateTab = () => (state ? state.tab : "tasks");

  const renderSection = () => {
    switch (stateTab()) {
      case "tasks":
        return <TasksSection />;
      case "news":
        return <NewsSection />;
      default:
        return <TasksSection />;
    }
  };

  return (
    <S.Container>
      <S.Menu>
        <S.MenuItem
          active={stateTab() === "tasks"}
          onClick={() =>
            navigateTo({ pathname: "/forYou", state: { tab: "tasks" } })
          }
        >
          <S.TextMenuItem>
            {t("tasks")}
            {hasCompletedATask && <S.RedBallContainer />}
          </S.TextMenuItem>
        </S.MenuItem>
        <S.MenuItem
          active={stateTab() === "news"}
          onClick={() =>
            navigateTo({ pathname: "/forYou", state: { tab: "news" } })
          }
        >
          {t("news")}
        </S.MenuItem>
      </S.Menu>
      {renderSection()}
    </S.Container>
  );
}
export default ForYouMenu;

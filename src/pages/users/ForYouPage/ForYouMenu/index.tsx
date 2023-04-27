import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTasksContext } from "contexts/tasksContext";
import TasksSection from "./TasksSection";
import NewsSection from "./NewsSection";
import * as S from "./styles";

function ForYouMenu() {
  const [currentTab, setCurrentTab] = useState("tasks");
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage.forYouMenu",
  });

  const { hasCompletedATask } = useTasksContext();

  const renderSection = () => {
    switch (currentTab) {
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
          active={currentTab === "tasks"}
          onClick={() => setCurrentTab("tasks")}
        >
          <S.TextMenuItem>
            {t("tasks")}
            {hasCompletedATask && <S.RedBallContainer />}
          </S.TextMenuItem>
        </S.MenuItem>
        <S.MenuItem
          active={currentTab === "news"}
          onClick={() => setCurrentTab("news")}
        >
          {t("news")}
        </S.MenuItem>
      </S.Menu>
      {renderSection()}
    </S.Container>
  );
}
export default ForYouMenu;
